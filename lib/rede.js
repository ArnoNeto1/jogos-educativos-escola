// Ajudante compartilhado de multiplayer em rede local.
// Usado pelos jogos que têm modo "Jogar em rede" (conecta no mesmo servidor
// que serviu a própria página, numa "sala" identificada por um código).
//
// Uso:
//   var rede = criarConexaoRede({
//     sala: "minha-sala",
//     aoConectar: function(info) { ... },       // {id, quantidadeNaSala}
//     aoEntrarOutroJogador: function(info) { ... },
//     aoSairJogador: function(info) { ... },
//     aoReceberMensagem: function(msg) { ... },  // qualquer outra mensagem
//     aoDesconectar: function() { ... }
//   });
//   rede.enviar({ tipo: "jogada", ... });

var INTERVALO_BATIMENTO_REDE = 20000; // 20s — mantém a conexão viva (evita que fique ociosa
                                       // tempo demais e algum roteador/rede a derrube sozinho)

function criarConexaoRede(opcoes) {
  var protocolo = location.protocol === "https:" ? "wss:" : "ws:";
  var socket = new WebSocket(protocolo + "//" + location.host + "/multiplayer");
  var meuId = null;
  var temporizadorBatimento = null;

  socket.addEventListener("open", function () {
    socket.send(JSON.stringify({ tipo: "entrar", sala: opcoes.sala }));
    temporizadorBatimento = setInterval(function () {
      if (socket.readyState === 1) socket.send(JSON.stringify({ tipo: "ping" }));
    }, INTERVALO_BATIMENTO_REDE);
  });

  socket.addEventListener("message", function (evento) {
    var msg;
    try { msg = JSON.parse(evento.data); } catch (e) { return; }

    if (msg.tipo === "bem-vindo") {
      meuId = msg.id;
      return;
    }
    if (msg.tipo === "pong") {
      return; // só resposta do batimento — nada a fazer
    }
    if (msg.tipo === "entrou") {
      if (opcoes.aoConectar) opcoes.aoConectar(msg);
      return;
    }
    if (msg.tipo === "jogador-entrou") {
      if (opcoes.aoEntrarOutroJogador) opcoes.aoEntrarOutroJogador(msg);
      return;
    }
    if (msg.tipo === "jogador-saiu") {
      if (opcoes.aoSairJogador) opcoes.aoSairJogador(msg);
      return;
    }
    if (opcoes.aoReceberMensagem) opcoes.aoReceberMensagem(msg);
  });

  socket.addEventListener("close", function () {
    if (temporizadorBatimento) clearInterval(temporizadorBatimento);
    if (opcoes.aoDesconectar) opcoes.aoDesconectar();
  });
  socket.addEventListener("error", function () {
    if (opcoes.aoErro) opcoes.aoErro();
  });

  return {
    enviar: function (msg) {
      if (socket.readyState === 1) socket.send(JSON.stringify(msg));
    },
    meuId: function () { return meuId; },
    fechar: function () { clearInterval(temporizadorBatimento); socket.close(); },
    socket: socket
  };
}

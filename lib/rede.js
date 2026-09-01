// Ajudante compartilhado de multiplayer PELA INTERNET (via Supabase Realtime).
// Antes isso rodava só na rede local, através de um servidor que precisava
// ficar ligado no laboratório (server.js). Agora usa o Supabase como "central
// de mensagens" na nuvem — funciona de qualquer lugar com internet, sem
// precisar ligar nada localmente. Requer que lib/supabase.min.js e
// lib/supabase-config.js já tenham sido carregados antes deste script.
//
// A API pública é a mesma de antes, pra não precisar mudar os jogos que já
// usam isso:
//   var rede = criarConexaoRede({
//     sala: "minha-sala",
//     aoConectar: function(info) { ... },       // {id, quantidadeNaSala}
//     aoEntrarOutroJogador: function(info) { ... },
//     aoSairJogador: function(info) { ... },
//     aoReceberMensagem: function(msg) { ... },  // qualquer outra mensagem
//     aoDesconectar: function() { ... },
//     aoErro: function() { ... }
//   });
//   rede.enviar({ tipo: "jogada", ... });

function gerarIdAleatorio() {
  return "j" + Math.random().toString(36).slice(2, 10);
}

function criarConexaoRede(opcoes) {
  var meuId = gerarIdAleatorio();
  var primeiraSincronizacao = true;
  var canal = supabaseCliente.channel("sala-" + opcoes.sala, {
    config: { presence: { key: meuId } }
  });

  canal.on("broadcast", { event: "msg" }, function (mensagemRecebida) {
    if (opcoes.aoReceberMensagem) opcoes.aoReceberMensagem(mensagemRecebida.payload);
  });

  // Só consideramos "conectado" quando a NOSSA própria presença aparece no estado —
  // a primeira sincronização costuma chegar antes do track() terminar (ainda sem nós).
  function verificarConexaoInicial() {
    if (!primeiraSincronizacao) return;
    var estado = canal.presenceState();
    if (!estado[meuId]) return; // ainda não é a nossa entrada
    primeiraSincronizacao = false;
    // Pequena espera de segurança: a presença de quem JÁ estava na sala às vezes
    // chega um instante depois da nossa própria confirmação de entrada. Sem essa
    // espera, o segundo jogador a entrar corre o risco de contar só a si mesmo
    // (quantidadeNaSala saindo errado, o que bagunçaria "quem começa jogando").
    setTimeout(function () {
      var estadoFinal = canal.presenceState();
      var quantidadeNaSala = Object.keys(estadoFinal).length;
      if (opcoes.aoConectar) opcoes.aoConectar({ id: meuId, quantidadeNaSala: quantidadeNaSala });
    }, 400);
  }

  canal.on("presence", { event: "sync" }, verificarConexaoInicial);

  canal.on("presence", { event: "join" }, function (info) {
    verificarConexaoInicial(); // cobre o caso da nossa própria entrada chegar como "join"
    if (primeiraSincronizacao) return; // ainda não confirmamos nem a nossa própria entrada
    info.newPresences.forEach(function (presenca) {
      if (presenca.id !== meuId && opcoes.aoEntrarOutroJogador) {
        opcoes.aoEntrarOutroJogador({ id: presenca.id });
      }
    });
  });

  canal.on("presence", { event: "leave" }, function (info) {
    info.leftPresences.forEach(function (presenca) {
      if (presenca.id !== meuId && opcoes.aoSairJogador) {
        opcoes.aoSairJogador({ id: presenca.id });
      }
    });
  });

  canal.subscribe(function (status) {
    if (status === "SUBSCRIBED") {
      canal.track({ id: meuId });
    } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
      if (opcoes.aoErro) opcoes.aoErro();
    } else if (status === "CLOSED") {
      if (opcoes.aoDesconectar) opcoes.aoDesconectar();
    }
  });

  return {
    enviar: function (msg) {
      canal.send({ type: "broadcast", event: "msg", payload: msg });
    },
    meuId: function () { return meuId; },
    fechar: function () { supabaseCliente.removeChannel(canal); },
    canal: canal
  };
}

// ============================================================================
// Servidor local do portal de jogos educativos.
//
// Faz DUAS coisas ao mesmo tempo, na mesma porta:
//   1) Serve os arquivos do site (como um "python -m http.server", mas em Node).
//   2) Retransmite mensagens de multiplayer entre os navegadores conectados
//      (não sabe nada sobre as regras dos jogos — só repassa mensagens de quem
//      está numa "sala" pra todo mundo mais na mesma sala).
//
// Como usar (uma vez por sessão de laboratório):
//   1. npm install
//   2. npm start        (ou: node server.js)
//   3. Anote o endereço "http://SEU-IP-AQUI:8080" que aparece no terminal e
//      passe pros alunos digitarem no navegador deles.
// ============================================================================

var http = require("http");
var fs = require("fs");
var path = require("path");
var os = require("os");
var crypto = require("crypto");
var WebSocketServer = require("ws").WebSocketServer;

var PORTA = Number(process.argv[2]) || 8080;
var RAIZ = __dirname;

var TIPOS_MIME = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

var servidorHttp = http.createServer(function (req, res) {
  var urlSemQuery = decodeURIComponent(req.url.split("?")[0]);
  if (urlSemQuery === "/") urlSemQuery = "/index.html";

  var caminhoArquivo = path.normalize(path.join(RAIZ, urlSemQuery));
  if (caminhoArquivo.indexOf(RAIZ) !== 0) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Acesso negado.");
    return;
  }

  fs.readFile(caminhoArquivo, function (erro, dados) {
    if (erro) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Arquivo não encontrado: " + urlSemQuery);
      return;
    }
    var extensao = path.extname(caminhoArquivo).toLowerCase();
    res.writeHead(200, { "Content-Type": TIPOS_MIME[extensao] || "application/octet-stream" });
    res.end(dados);
  });
});

// ---------------------------------------------------------------------------
// Multiplayer: retransmissor simples baseado em "salas".
// Um cliente entra numa sala com {tipo:"entrar", sala:"codigo-qualquer"};
// qualquer outra mensagem que ele mandar é repassada pra todo mundo mais
// naquela sala, com o campo "remetente" (id) adicionado automaticamente.
// ---------------------------------------------------------------------------

var wss = new WebSocketServer({ server: servidorHttp, path: "/multiplayer" });
var salas = new Map(); // nome da sala -> Set de sockets

function idAleatorio() {
  return crypto.randomBytes(6).toString("hex");
}

wss.on("connection", function (ws) {
  ws.idJogador = idAleatorio();
  ws.salaAtual = null;
  ws.send(JSON.stringify({ tipo: "bem-vindo", id: ws.idJogador }));

  ws.on("message", function (dadosBrutos) {
    var msg;
    try { msg = JSON.parse(dadosBrutos); } catch (e) { return; }

    if (msg.tipo === "ping") {
      // "batimento" pra manter a conexão viva (evita que roteador/rede derrube por
      // ociosidade) — responde só pra quem mandou, não repassa pra sala.
      try { ws.send(JSON.stringify({ tipo: "pong" })); } catch (e) { /* socket já fechou: sem problema */ }
      return;
    }

    if (msg.tipo === "entrar") {
      ws.salaAtual = String(msg.sala || "geral");
      if (!salas.has(ws.salaAtual)) salas.set(ws.salaAtual, new Set());
      salas.get(ws.salaAtual).add(ws);

      var membros = salas.get(ws.salaAtual);
      ws.send(JSON.stringify({ tipo: "entrou", id: ws.idJogador, sala: ws.salaAtual, quantidadeNaSala: membros.size }));

      membros.forEach(function (outro) {
        if (outro !== ws && outro.readyState === 1) {
          outro.send(JSON.stringify({ tipo: "jogador-entrou", id: ws.idJogador, quantidadeNaSala: membros.size }));
        }
      });
      return;
    }

    if (!ws.salaAtual || !salas.has(ws.salaAtual)) return;

    msg.remetente = ws.idJogador;
    var envelope = JSON.stringify(msg);
    salas.get(ws.salaAtual).forEach(function (outro) {
      if (outro !== ws && outro.readyState === 1) outro.send(envelope);
    });
  });

  ws.on("close", function () {
    if (ws.salaAtual && salas.has(ws.salaAtual)) {
      var membros = salas.get(ws.salaAtual);
      membros.delete(ws);
      membros.forEach(function (outro) {
        if (outro.readyState === 1) {
          outro.send(JSON.stringify({ tipo: "jogador-saiu", id: ws.idJogador, quantidadeNaSala: membros.size }));
        }
      });
      if (membros.size === 0) salas.delete(ws.salaAtual);
    }
  });
});

// ---------------------------------------------------------------------------

function enderecosDeRedeLocal() {
  var interfaces = os.networkInterfaces();
  var enderecos = [];
  Object.keys(interfaces).forEach(function (nome) {
    interfaces[nome].forEach(function (info) {
      if (info.family === "IPv4" && !info.internal) enderecos.push(info.address);
    });
  });
  return enderecos;
}

servidorHttp.listen(PORTA, function () {
  console.log("");
  console.log("✅ Servidor rodando! Peça pros alunos abrirem no navegador:");
  console.log("");
  var enderecos = enderecosDeRedeLocal();
  if (enderecos.length === 0) {
    console.log("   http://localhost:" + PORTA + "  (não achei o IP de rede local automaticamente)");
  } else {
    enderecos.forEach(function (ip) {
      console.log("   http://" + ip + ":" + PORTA);
    });
  }
  console.log("");
  console.log("   (deixe este terminal aberto enquanto os alunos estiverem jogando)");
  console.log("");
});

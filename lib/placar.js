// Ajudante compartilhado de placar entre alunos (via Supabase).
// Requer que lib/supabase.min.js e lib/supabase-config.js já tenham sido
// carregados antes deste script.
//
// Uso:
//   enviarRecordePlacar({ jogo: "corredor-escolar", nivel: "medio", pontuacao: 340 });
//   buscarPlacar({ jogo: "corredor-escolar", nivel: "medio" }).then(function (lista) { ... });
//   obterNomeAluno() // apelido automático, gerado uma vez e guardado no navegador
//   definirNomeAluno("Novo Apelido") // caso algum jogo queira deixar o aluno personalizar

var ADJETIVOS_APELIDO = ["Veloz", "Ninja", "Corajoso", "Esperto", "Turbo", "Fantástico", "Valente", "Astuto", "Radical", "Supremo", "Mágico", "Relâmpago"];
var ANIMAIS_APELIDO = ["Panda", "Águia", "Tigre", "Foguete", "Falcão", "Lobo", "Golfinho", "Dragão", "Guepardo", "Coruja", "Leão", "Raposa"];

function gerarApelidoAleatorio() {
  var adjetivo = ADJETIVOS_APELIDO[Math.floor(Math.random() * ADJETIVOS_APELIDO.length)];
  var animal = ANIMAIS_APELIDO[Math.floor(Math.random() * ANIMAIS_APELIDO.length)];
  var numero = Math.floor(Math.random() * 90) + 10; // 10 a 99
  return animal + " " + adjetivo + " " + numero;
}

// Apelido automático: não interrompe mais o jogo pedindo nome (isso fazia a pergunta
// aparecer de novo a cada partida sempre que o aluno cancelava a caixinha). Gera um
// apelido divertido na primeira vez e guarda no navegador — o placar da turma passa a
// mostrar esse apelido em vez do nome real, o que também é mais privado.
function obterNomeAluno() {
  var nome = null;
  try { nome = localStorage.getItem("placar_nomeAluno"); } catch (e) { /* sem localStorage, sem problema */ }
  if (!nome) {
    nome = gerarApelidoAleatorio();
    try { localStorage.setItem("placar_nomeAluno", nome); } catch (e) { /* sem localStorage: funciona mesmo assim, só não fixa o apelido entre partidas */ }
  }
  return nome;
}

// Deixa trocar o apelido manualmente, se algum jogo quiser oferecer essa opção
// (por enquanto nenhum jogo chama isso — é só pra ficar disponível).
function definirNomeAluno(novoNome) {
  var nome = String(novoNome || "").trim().slice(0, 24);
  if (!nome) return null;
  try { localStorage.setItem("placar_nomeAluno", nome); } catch (e) { /* sem localStorage, sem problema */ }
  return nome;
}

// tipoPontuacao: "pontos" (maior é melhor, padrão) ou "tempo" (menor é melhor)
function enviarRecordePlacar(dados) {
  var nomeAluno = dados.nomeAluno || obterNomeAluno();
  if (!nomeAluno) return Promise.resolve(null); // aluno não quis informar nome — não envia
  // Promise.resolve(...) converte o "construtor de consulta" do Supabase (que só é
  // "thenable", não uma Promise completa) numa Promise de verdade, com .catch funcionando.
  return Promise.resolve(supabaseCliente.from("recordes").insert({
    jogo: dados.jogo,
    nivel: dados.nivel || null,
    nome_aluno: nomeAluno,
    pontuacao: dados.pontuacao,
    tipo_pontuacao: dados.tipoPontuacao || "pontos"
  })).catch(function () {
    return null; // sem internet ou banco fora do ar — o jogo continua funcionando normalmente
  });
}

function buscarPlacar(opcoes) {
  var ordemAscendente = opcoes.tipoPontuacao === "tempo"; // tempo: menor é melhor
  var consulta = supabaseCliente
    .from("recordes")
    .select("nome_aluno, pontuacao, criado_em")
    .eq("jogo", opcoes.jogo);
  if (opcoes.nivel) consulta = consulta.eq("nivel", opcoes.nivel);
  consulta = consulta.order("pontuacao", { ascending: ordemAscendente }).limit(opcoes.limite || 10);
  return Promise.resolve(consulta).then(function (resultado) {
    return (resultado && resultado.data) || [];
  }).catch(function () {
    return []; // sem internet ou banco fora do ar — o jogo continua funcionando normalmente
  });
}

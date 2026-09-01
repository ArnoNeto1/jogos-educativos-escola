// Ajudante compartilhado de placar entre alunos (via Supabase).
// Requer que lib/supabase.min.js e lib/supabase-config.js já tenham sido
// carregados antes deste script.
//
// Uso:
//   enviarRecordePlacar({ jogo: "corredor-escolar", nivel: "medio", pontuacao: 340 });
//   buscarPlacar({ jogo: "corredor-escolar", nivel: "medio" }).then(function (lista) { ... });
//   obterNomeAluno() // pergunta o apelido uma vez só e guarda no navegador

function obterNomeAluno() {
  var nome = null;
  try { nome = localStorage.getItem("placar_nomeAluno"); } catch (e) { /* sem localStorage, sem problema */ }
  if (!nome) {
    nome = prompt("Qual seu nome (ou apelido) pra aparecer no placar da turma?", "");
    if (nome) {
      nome = nome.trim().slice(0, 24);
      try { localStorage.setItem("placar_nomeAluno", nome); } catch (e) { /* sem localStorage, sem problema */ }
    }
  }
  return nome || null;
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

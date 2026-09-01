(function () {
  var grade = document.getElementById("grade");
  var filtros = document.querySelectorAll(".filtro-btn");
  var materiaAtual = "Todos";

  function renderizar() {
    grade.innerHTML = "";
    var lista = window.GAMES.filter(function (jogo) {
      return materiaAtual === "Todos" || jogo.subject === materiaAtual;
    });

    if (lista.length === 0) {
      var vazio = document.createElement("p");
      vazio.className = "vazio";
      vazio.textContent = "Nenhum jogo encontrado nessa categoria ainda.";
      grade.appendChild(vazio);
      return;
    }

    lista.forEach(function (jogo) {
      var link = document.createElement("a");
      link.className = "card";
      link.href = jogo.file;

      link.innerHTML =
        '<span class="icone">' + jogo.icon + "</span>" +
        '<span class="materia">' + jogo.subject + "</span>" +
        "<h3>" + jogo.title + "</h3>" +
        '<span class="nivel">' + jogo.level + "</span>" +
        '<span class="jogar">Jogar</span>';

      grade.appendChild(link);
    });
  }

  filtros.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filtros.forEach(function (b) { b.classList.remove("ativo"); });
      btn.classList.add("ativo");
      materiaAtual = btn.dataset.materia;
      renderizar();
    });
  });

  renderizar();
})();

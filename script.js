// Verifica se o DOM carregou
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formAcademia");
  const listaAlunos = document.getElementById("listaAlunos");
  const restricoes = document.getElementById("restricoes");
  const descricaoRestricoesContainer = document.getElementById("descricaoRestricoesContainer");
  const descricaoRestricoes = document.getElementById("descricaoRestricoes");

  // Exibe campo extra se houver restrições
  if (restricoes) {
    restricoes.addEventListener("change", function () {
      if (this.value === "Sim") {
        descricaoRestricoesContainer.style.display = "block";
        descricaoRestricoes.required = true;
      } else {
        descricaoRestricoesContainer.style.display = "none";
        descricaoRestricoes.value = "";
        descricaoRestricoes.required = false;
      }
    });
  }

  // Carrega alunos salvos
  function carregarAlunos() {
    const alunos = JSON.parse(localStorage.getItem("alunosAcademia")) || [];
    listaAlunos.innerHTML = "";

    if (alunos.length === 0) {
      listaAlunos.innerHTML = "<li class='list-group-item'>Nenhum aluno cadastrado ainda.</li>";
      return;
    }

    alunos.forEach((aluno, index) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.innerHTML = `
        <strong>${aluno.nome}</strong> - ${aluno.idade} anos, ${aluno.peso}kg<br>
        Plano: ${aluno.plano} <br>
        Restrições: ${aluno.restricoes}${aluno.descricaoRestricoes ? ` (${aluno.descricaoRestricoes})` : ""}
        <button class="btn btn-sm btn-danger float-end" onclick="removerAluno(${index})">Remover</button>
      `;
      listaAlunos.appendChild(li);
    });
  }

  // Salva novo aluno
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const idade = document.getElementById("idade").value.trim();
      const peso = document.getElementById("peso").value.trim();
      const plano = document.querySelector("input[name='plano']:checked")?.value;
      const restricao = restricoes.value;
      const descRestricao = descricaoRestricoes.value.trim();

      if (restricao === "Sim" && descRestricao === "") {
        alert("Por favor, descreva as restrições.");
        return;
      }

      const novoAluno = {
        nome,
        idade,
        peso,
        plano,
        restricoes: restricao,
        descricaoRestricoes: restricao === "Sim" ? descRestricao : ""
      };

      const alunos = JSON.parse(localStorage.getItem("alunosAcademia")) || [];
      alunos.push(novoAluno);
      localStorage.setItem("alunosAcademia", JSON.stringify(alunos));

      form.reset();
      descricaoRestricoesContainer.style.display = "none";
      carregarAlunos();
    });
  }

  // Função global para remover aluno
  window.removerAluno = function (index) {
    const alunos = JSON.parse(localStorage.getItem("alunosAcademia")) || [];
    alunos.splice(index, 1);
    localStorage.setItem("alunosAcademia", JSON.stringify(alunos));
    carregarAlunos();
  };

  carregarAlunos();
});

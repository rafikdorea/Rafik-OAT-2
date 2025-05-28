const form = document.getElementById('formCadastro');
const tabela = document.getElementById('tabelaUsuarios');

function getUsuarios() {
  return JSON.parse(localStorage.getItem('alunosAcademia')) || [];
}

function salvarUsuarios(usuarios) {
  localStorage.setItem('alunosAcademia', JSON.stringify(usuarios));
}

function adicionarUsuario(dados) {
  const usuarios = getUsuarios();
  usuarios.push(dados);
  salvarUsuarios(usuarios);
  listarUsuarios();
}

function excluirUsuario(index) {
  const usuarios = getUsuarios();
  usuarios.splice(index, 1);
  salvarUsuarios(usuarios);
  listarUsuarios();
}

function listarUsuarios() {
  const usuarios = getUsuarios();
  tabela.innerHTML = '';
  usuarios.forEach((u, i) => {
    const row = `
      <tr>
        <td>${u.nome}</td>
        <td>${u.idade}</td>
        <td>${u.peso}kg</td>
        <td>${u.plano}</td>
        <td>${u.restricoes}</td>
        <td>${u.telefone}</td>
        <td>${u.email}</td>
        <td><button class="btn btn-danger btn-sm" onclick="excluirUsuario(${i})">Excluir</button></td>
      </tr>`;
    tabela.innerHTML += row;
  });
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const dados = {
    nome: document.getElementById('nome').value,
    idade: document.getElementById('idade').value,
    peso: document.getElementById('peso').value,
    plano: document.getElementById('plano').value,
    restricoes: document.getElementById('restricoes').value,
    telefone: document.getElementById('telefone').value,
    email: document.getElementById('email').value
  };
  adicionarUsuario(dados);
  form.reset();
});

listarUsuarios();

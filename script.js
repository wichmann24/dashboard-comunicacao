const API = "https://jsonplaceholder.typicode.com";

// Guarda referência ao <li> do usuário e da postagem atualmente selecionados,
// para que o destaque visual anterior seja removido ao selecionar um novo item.
let usuarioSelecionadoEl = null;
let postSelecionadoEl = null;

// Remove todos os itens de uma lista antes de carregar novos dados
function limparLista(lista) {
  lista.innerHTML = "";
}

// Exibe a mensagem "Carregando..." dentro da lista enquanto a API responde
function mostrarCarregando(lista) {
  limparLista(lista);
  const li = document.createElement("li");
  li.innerText = "Carregando...";
  li.classList.add("mensagem-status");
  lista.appendChild(li);
}

// Exibe uma mensagem amigável de erro dentro da lista
function mostrarErro(lista, mensagem) {
  limparLista(lista);
  const li = document.createElement("li");
  li.innerText = mensagem || "Não foi possível carregar os dados. Tente novamente.";
  li.classList.add("mensagem-status", "mensagem-erro");
  lista.appendChild(li);
}

// Cria um <li> reutilizável, opcionalmente clicável, para as listas
function criarItemLista(texto, onClick) {
  const li = document.createElement("li");
  li.innerText = texto;
  if (onClick) {
    li.dataset.clicavel = "true";
    li.onclick = onClick;
  }
  return li;
}

// Aplica o destaque visual ao item clicado e remove do item selecionado anteriormente
function selecionarItem(li, anteriorSelecionado) {
  if (anteriorSelecionado) {
    anteriorSelecionado.classList.remove("selecionado");
  }
  li.classList.add("selecionado");
  return li;
}

async function carregarUsuarios() {
  const lista = document.getElementById("users");
  mostrarCarregando(lista);

  try {
    const response = await fetch(API + "/users");
    if (!response.ok) throw new Error("Falha na resposta da API de usuários");
    const users = await response.json();

    limparLista(lista); // remove a mensagem "Carregando..." antes de exibir os dados

    users.forEach(user => {
      const li = criarItemLista(user.name, () => {
        usuarioSelecionadoEl = selecionarItem(li, usuarioSelecionadoEl);
        carregarPosts(user.id);
      });
      lista.appendChild(li);
    });
  } catch (erro) {
    console.error("Erro ao carregar usuários:", erro);
    mostrarErro(lista);
  }
}

async function carregarPosts(userId) {
  const lista = document.getElementById("posts");
  mostrarCarregando(lista);
  postSelecionadoEl = null; // nenhuma postagem selecionada ao trocar de usuário

  try {
    const response = await fetch(API + "/posts?userId=" + userId);
    if (!response.ok) throw new Error("Falha na resposta da API de postagens");
    const posts = await response.json();

    limparLista(lista);

    posts.forEach(post => {
      const li = criarItemLista(post.title, () => {
        postSelecionadoEl = selecionarItem(li, postSelecionadoEl);
        carregarComentarios(post.id);
      });
      lista.appendChild(li);
    });
  } catch (erro) {
    console.error("Erro ao carregar postagens:", erro);
    mostrarErro(lista);
  }
}

async function carregarComentarios(postId) {
  const lista = document.getElementById("comments");
  mostrarCarregando(lista);

  try {
    const response = await fetch(API + "/comments?postId=" + postId);
    if (!response.ok) throw new Error("Falha na resposta da API de comentários");
    const comments = await response.json();

    limparLista(lista);

    comments.forEach(comment => {
      const li = criarItemLista(comment.body);
      lista.appendChild(li);
    });
  } catch (erro) {
    console.error("Erro ao carregar comentários:", erro);
    mostrarErro(lista);
  }
}

carregarUsuarios();

const API = "https://jsonplaceholder.typicode.com";

async function carregarUsuarios(){

const response = await fetch(API + "/users");
const users = await response.json();

const lista = document.getElementById("users");

users.forEach(user => {

const li = document.createElement("li");

li.innerText = user.name;

li.onclick = () => carregarPosts(user.id);

lista.appendChild(li);

});

}

async function carregarPosts(userId){

const response = await fetch(API + "/posts?userId=" + userId);
const posts = await response.json();

const lista = document.getElementById("posts");
lista.innerHTML = "";

posts.forEach(post => {

const li = document.createElement("li");

li.innerText = post.title;

li.onclick = () => carregarComentarios(post.id);

lista.appendChild(li);

});

}

async function carregarComentarios(postId){

const response = await fetch(API + "/comments?postId=" + postId);
const comments = await response.json();

const lista = document.getElementById("comments");
lista.innerHTML = "";

comments.forEach(comment => {

const li = document.createElement("li");

li.innerText = comment.body;

lista.appendChild(li);

});

}

carregarUsuarios();

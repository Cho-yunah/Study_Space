# 98_Making_TodoList_with_Server

* fetch 함수를 활용하여 서버와의 통신을 구현한 Todo List를 만들어 보았습니다. 

```js
// state
let todos = [];
let id = "all";

////// DOMs ///////
const $todos = document.querySelector(".todos");
const $inputTodo = document.querySelector(".input-todo");
const $nav = document.querySelector(".nav");
const $completeAll = document.querySelector(".complete-all");
const $clearCompleted = document.querySelector(".btn");

const fetchTodos = () => {
  fetch("/todos")
    .then((res) => res.json())
    .then((_todos) => {
      console.log(_todos);
      todos = _todos;
    })
    .then(render)
    .catch(console.error);
};

const render = () => {
  html = "";
  count();
  let _todos;
  if (id === "all") {
    _todos = [...todos];
  } else if (id === "active") {
    _todos = todos.filter((todo) => !todo.completed);
  } else {
    _todos = todos.filter((todo) => todo.completed);
  }
  _todos.forEach(({ id, content, completed }) => {
    html += `<li id="${id}" class="todo-item">
    <input id="ck-${id}" class="checkbox" type="checkbox" ${
      completed ? "checked" : ""
    }>
    <label for="ck-${id}">${content}</label>
    <i class="remove-todo far fa-times-circle"></i>
  </li>`;
  });
  $todos.innerHTML = html;
  // console.log(todos, _todos);
};

const request = {
  get(url) {
    return fetch(url);
  },
  post(url, payload) {
    return fetch(url, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },
  patch(url, payload) {
    return fetch(url, {
      method: "PATCH",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },
  delete(url) {
    return fetch(url, { method: "DELETE" });
  },
};
const generateNextId = () => {
  return todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
};

const newTodo = (content) => {
  request
    .post(`/todos`, { id: generateNextId(), content, completed: false })
    .then((res) => res.json())
    .then((_todos) => (todos = _todos))
    .then(render)
    .catch(console.error);
};

const toggelCompleted = (id, checked) => {
  request
    .patch(`/todos/${id}`, { completed: checked })
    .then((res) => res.json())
    .then((_todos) => (todos = _todos))
    .then(render)
    .catch(console.error);
};

const removeTodo = (id) => {
  request
    .delete(`/todos/${id}`)
    .then((res) => res.json())
    .then((_todos) => (todos = _todos))
    .then(render)
    .catch(console.error);
};

const completeAll = (checked) => {
  request
    .patch(`/todos/completed`, { completed: checked })
    .then((res) => res.json())
    .then((_todos) => (todos = _todos))
    .then(render)
    .catch(console.error);
};

const removeCompleted = (e) => {
  request
    .delete(`/todos/completed`)
    .then((res) => res.json())
    .then((_todos) => (todos = _todos))
    .then(render)
    .catch(console.error);
};

const count = () => {
  document.querySelector(".completed-todos").innerHTML = todos.filter(
    (todo) => todo.completed
  ).length;
  document.querySelector(".active-todos").innerHTML = todos.filter(
    (todo) => !todo.completed
  ).length;
};

/////////// Event handeler//////////
window.onload = fetchTodos;

$inputTodo.onkeyup = (e) => {
  if (e.key !== "Enter") return;
  newTodo($inputTodo.value);
  console.log($inputTodo.value);
  $inputTodo.value = "";
};

$nav.onclick = (e) => {
  if (!e.target.matches(".nav>li")) return;
  [...$nav.children].forEach((li) => {
    // console.log(e.target.id);
    // console.log(li.id);
    li.classList.toggle("active", e.target.id === li.id);
  });
  id = e.target.id;
  render();
  // console.log(e.target.id === navState);
};

$todos.onchange = (e) => {
  if (!e.target.matches(".todos>li>.checkbox")) return;
  // todos.map(todo => todo.id === +e.target.parentNode.id ? {...todo, completed: !todo.completed} : todo )
  let id = e.target.parentNode.id;
  toggelCompleted(id, e.target.checked);
};

$todos.onclick = (e) => {
  if (!e.target.matches(".todos> li> .remove-todo")) return;
  let id = e.target.parentNode.id;
  // console.log(id);
  removeTodo(id);
};

$completeAll.onclick = (e) => {
  if (!e.target.matches(".complete-all > .checkbox")) return;
  completeAll(e.target.checked);
};

$clearCompleted.onclick = (e) => {
  if (!e.target.matches(".clear-completed > .btn")) return;
  console.log(completed);
  removeCompleted(completed);
};
```


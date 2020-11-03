# Todo List 구현

- ## javascript 코드

  ```js
  // State
  let todos = [];
  
  // DOMs
  const $inputTodo = document.querySelector(".input-todo");
  const $todos = document.querySelector(".todos");
  const $checkbox = document.querySelector(".checkbox");
  const $completeAll = document.querySelector(".complete-all");
  const $nav = document.querySelector(".nav");
  const $act = document.getElementById("active");
  const $completed = document.getElementById("completed");
  const $btn = document.querySelector(".btn");
  
  const fetchTodo = () => {
    todos = [
      { id: 3, content: "HTML", completed: false },
      { id: 2, content: "CSS", completed: true },
      { id: 1, content: "Javascript", completed: false },
    ];
    render();
  };
  
  // const render = () => {
  //   $todos.innerHTML = todos
  //     .map((todo) => {
  //       return `<li id=${todo.id} class="todo-item">
  //     <input id="ck-myId" class="checkbox" type="checkbox" ${
  //       todo.completed ? "checked" : ""
  //     }/>
  //     <label for="ck-myId">${todo.content}</label>
  //     <i class="remove-todo far fa-times-circle"></i>
  //     </li>`;
  //     })
  //     .join("");
  // };
  
  const render = (target) => {
    let html = "";
    count();
    todos
      .filter((todo) => {
        return target === $act
          ? !todo.completed
          : target === $completed
          ? todo.completed
          : todo;
      })
      .forEach(({ id, content, completed }) => {
        html += `<li id='${id}' class="todo-item">
      <input id="ck-${id}" class="checkbox" type="checkbox" ${
          completed ? "checked" : ""
        }/> <label for="ck-${id}"> ${content}</label><i class="remove-todo far fa-times-circle"></i>
    </li>`;
      });
    $todos.innerHTML = html;
  };
  
  const generateNextId = () => {
    todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
  };
  
  const addTodo = (content) => {
    todos = [{ id: generateNextId(), content, completed: false }, ...todos];
    render();
  };
  
  const removeTodo = (id) => {
    todos = todos.filter((todo) => todo.id !== +id);
    render();
  };
  
  const toggleTodoCompleted = (id) => {
    todos = todos.map((todo) =>
      todo.id === +id ? { ...todo, completed: !todo.completed } : todo
    );
    render();
  };
  
  const allCheck = (e) => {
    todos = todos.map((todo) => ({ ...todo, completed: e.target.checked }));
    render();
  };
  
  const count = () => {
    document.querySelector(".completed-todos").innerHTML = todos.filter(
      (todo) => todo.completed
    ).length;
    document.querySelector(".active-todos").innerHTML = todos.filter(
      (todo) => !todo.completed
    ).length;
  };
  
  // Event handler
  window.onload = fetchTodo();
  
  $inputTodo.onkeyup = (e) => {
    if (e.key !== "Enter" || $inputTodo.value === "") return;
    addTodo($inputTodo.value);
    $inputTodo.value = "";
  };
  
  $todos.onclick = (e) => {
    if (!e.target.matches(".todos>li>.remove-todo")) return;
    let id = e.target.parentNode.id;
    removeTodo(id);
  };
  
  $todos.onchange = (e) => {
    if (!e.target.matches(".todos>li>.checkbox")) return;
    let id = e.target.parentNode.id;
    toggleTodoCompleted(id);
  };
  
  $completeAll.onchange = (e) => {
    if (!e.target.matches(".complete-all>input")) return;
    allCheck(e);
  };
  
  $nav.onclick = (e) => {
    render(e.target);
  };
  
  $btn.onclick = () => {
    todos = todos.filter((todo) => !todo.completed);
    render();
  };
  
  $nav.onclick = (e) => {
    [...$nav.children].forEach(($navLi) =>
      $navLi.classList.toggle("active", e.target === $navLi)
    );
  };
  
  ```

  


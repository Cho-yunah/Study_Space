# 96_ArrayHOF_Exercise



## 1. html 생성

```js
const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function render() {
  let html = '';

  todos.forEach(todo => {
   html += `<li id="${todo.id}">
       <label><input type="checkbox"${todo.completed? 'checked':''}>${todo.content}</label>
    </li> `
  });

  return html;
}

console.log(render());
```



## 2. 특정 프로퍼티 값 추출

```js
const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function getValues(key) {
 return todos.map(todo => todo[key] );

}

console.log(getValues('id')); 
console.log(getValues('content')); 
console.log(getValues('completed')); 
```





## 3. 프로퍼티 정렬

```js
const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function sortBy(key) {
 return todos.sort((a,b) => a[key] > b[key]? 1 : (a[key] < b[key]? -1: 0));
}
console.log(sortBy('id'));
console.log(sortBy('content'));
console.log(sortBy('completed'));
```





## 4. 새로운 요소 추가

```js
let todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function addTodo(newTodo) {
  todos = [newTodo, ...todos];
}

addTodo({ id: 4, content: 'Test', completed: false });

console.log(todos);
```





## 5. 특정 요소의 프로퍼티 값 반전

```js
let todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function removeTodo(id) {
 todos = todos.filter(todos => todos.id !== id);
}

removeTodo(2);

console.log(todos);
```





## 6. 특정 요소의 프로퍼티 값 반전

```js
let todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function toggleCompletedById(id) {
  todos.map(todo => todo.id === id ? {...todo, completed:!todo.completed} : todo);
};

toggleCompletedById(2);

console.log(todos);
```





## 7. 모든 요소의 completed 프로퍼티 값을 true로 설정

```js
let todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function toggleCompletedAll() {
   todos = todos.map(todo => todo.completed === false ? {...todo, completed: !todo.completed} : todo);
};

toggleCompletedAll();

console.log(todos);
```





## 8. completed 프로퍼티의 값이 true인 요소의 갯수 구하기

```js
let todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function countCompletedTodos() { 
  return todos.filter(todo => todo.completed === true).length;
}
console.log(countCompletedTodos());
```





## 9. id 프로퍼티의 값 중에서 최대값 구하기

```js
let todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function getMaxId() {
  todos = todos.map(todo => todo.id);
  return (Math.max(...todos))
}

console.log(getMaxId()); 
```


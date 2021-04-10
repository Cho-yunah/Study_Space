# 10. Hook의 개요

Hook은 React 버전 16.8에 새로 추가된 개념으로, Hook을 이용하여 Class를 작성할 필요없이 상태값과 여러 React의 기능을 사용할 수 있다.

## 1. Intro

- React는 컴포넌트에 재사용 가능한 방법을 제공하지 않았고, 이를 해결하기 위해 props 또는 고차컴포넌트 등을 사용해왔다. 그러나 이런 패턴은 사용할 때 컴포넌트를 재구성해야 하며, 코드를 추적하기 어렵게 한다.

- 컴포넌트를 만들다보면 컴포넌트의 내부 로직이 복잡해지고, 작게 쪼개는것이 거의 불가능한 상황이 오는데, 이는 테스트를 하기도 어렵고 컴포넌트의 재사용성을 어렵게 만든다.

- 이를 해결하기 위해 Hook이 등장했고, React 컴포넌트들을 생명주기 메서드를 기반으로 쪼개는데 초점을 맞추기보다, Hook을 통해 로직에 기반을 둔 작은 함수로 컴포넌트를 나눌수 있게 되었다.

- Hook은 Class 없이 React 기능들의 사용방법을 알려준다.

  ### 1.1 Hook 이란

  - Hook 은 함수 컴포넌트에서 React state와 생명주기 기능(lifecycle)을 연동할 수 있게 하는 함수다. Hook은 class 안에서는 동작하지 않고, class가 없이 React를 사용할 수 있게 해준다.
  - React 는 `useState` 같은 내장된 Hook을 제공한다.

  ### 1.2 Hook 의 특징

  - 선택적 사용 : 기존의 코드를 다시 작성할 필요없이 일부의 컴포넌트들 안에서 Hook을 사용할 수 있다.

  - 100% 이전 버전과의 호환성 : Hook은 호환성을 깨뜨리는 변화가 없다.

  - 로직의 재사용성 : Hook은 컴포넌트로부터 상태관련 로직을 추상화하여 계층변화 없이 로직을 재사용할 수 있도록 도와준다.

## 2. Hook 사용하기

### 2.1 기본 Hook ⇒ State Hook

- 버튼을 클릭하면 값이 증가하는 카운터 예시로 설명을 하면,

  ```jsx
  import React, **{useState}** from 'react';

  function Example() {
  	**const [count, setCount] = useState(0);**
  	return (
  		<div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
  	);
  }
  ```

  - 위의 코드에서 `useState` 가 Hook이다. Hook 을 호출하여 함수 컴포넌트안에 state를 추가하는 것이데, 이 state는 컴포넌트가 다시 렌더링 되어도 그대로 유지된다. `useState` 는 현재의 state 값과 이 값을 업데이트하는 함수를 쌍으로 제공한다.

  - useState로 값을 업데이트 할수 있게 해주는 hook이다.

  - 이 state를 업데이트하는 함수를 이벤트 핸들러나 다른 곳에서 호출할 수 있다. class의 `this.setState` 와 거의 유사하지만, 이전 state와 새로운 state를 합치지 않는다는 차이가 있다.

  - useState는 인자로 초기 state 값을 하나 받는다. 위의 카운터는 0부터 시작하기 때문에 초기값으로 0을 넣어준다. Hook의 state는 꼭 객체일 필요는 없다.

  ### 2.2 여러 state변수 선언하기

- 하나의 컴포넌트 내에서 State Hook을 여러개 사용할 수도 있다.

```jsx
function ExampleWithManyStates() {
  // 상태 변수를 여러 개 선언했습니다!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState("banana");
  const [todos, setTodos] = useState([{ text: "Learn Hooks" }]);
  // ...
}
```

- 배열 디스트럭처링 문법은 state 변수들을 다른 변수 명으로 할당할 수 있게 해준다.

### 2.3 Effect Hook

- React 컴포넌트 안에서 데이터를 가져오거나 구독하고, DOM을 직접 조작하는 동작을 'side effects'라고 한다. 다른 컴포넌트에 영향을 줄 수 있고, 렌더링 과정에서 구현할 수 없기 때문이다.
- Effect Hook, 즉 `useEffect` 는 함수 컴포넌트 내에서 이런 side effects를 수행할 수 있게 해준다.
- React class의 `componerntDidMount` & `componentDidUpdate & componentWillUnmount` 와 같은 목적으로써 하나의 API로 통합된 것이다.

```jsx
**import React, { useState, useEffect } from 'react';**

function Example() {
  const [count, setCount] = useState(0);

  **// componentDidMount, componentDidUpdate와 비슷합니다
  useEffect(() => {
    // 브라우저 API를 이용해 문서의 타이틀을 업데이트합니다
    document.title = `You clicked ${count} times`;
  });**

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

- useEffect를 사용하면, React는 DOM을 바꾼 후에 effect 함수를 실행한다. Effects는 컴포넌트 안에 선언되어있기 때문에 props와 state에 접근할 수 있다.
- 기본적으로 React는 매번 렌더링 이후에effects를 실행한다. Effect를 해제할 필요가 있다면, 해제하는 함수를 반환해주면 된다.
- Hook을 사용하면 서로 관련있는 코드들을 한군데에 모아서 작성할 수 있다.

### 2.4 Hook 사용규칙

- Hook은 javascript 함수지만, 2가지 규칙을 준수해야 한다.

  1. 최상위에서만 Hook을 호출해야 한다. 반복문, 조건문, 중첩된 함수 내에서 hook을 실행하면 안된다.
  2. React 함수 컴포넌트 내에서만 Hook을 호출해야 한다. 일반 함수에서는 Hook을 호출해서는 안된다.

### 2.5 Custom Hook

- Custom Hook은 기능이라기보다는 컨벤션에 가깝다. 이름이 "use" 로 시작하고, 안에서 다른 Hook을 호출한다면 그 함수를 custom Hook이라고 부를수 있다.
- 이벤트 핸들링, 애니메이션, 타이밍 등 많은 경우에 custom Hook을 사용할 수 있다.

### 2.6 다른 내장 Hook

- useContext 는 컴포넌트를 중첩하지 않고도 React context를 구독할 수 있게 해준다.

  ```jsx
  function Example() {
    const locale = useContext(LocaleContext);
    const theme = useContext(ThemeContext);
    // ...
  }
  ```

- useReducer 는 복잡한 컴포넌트들의 state를 reducer로 관리할 수 있게 한다.

  ```jsx
  function Todos() {
    const [todos, dispatch] = useReducer(todosReducer);
    // ...
  ```

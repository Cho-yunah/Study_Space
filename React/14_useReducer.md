# 14_useReducer

- React에서 상태관리를 위해 `useState` hook을 사용하는데, 좀더 복잡한 상태의 관리가 필요하다면 `useReducer()` hook을 사용할 수 있다.
- `useReducer` 함수는 useState의 setState함수를 여러번 사용하지 않아도 된다는 점과, 리듀서로 로직을 분리했기에 컴포넌트 자체는 간단해지고, 다른곳에서도 reducer함수를 쉽게 재사용할수 있다는 점이 장점이다.

## 1. reducer 함수 만들기

- reducer 함수는 현재 상태(state)객체와 행동(action)객체를 인자로 받아서, 새로운 상태 객체를 반환하는 함수다.
- 컴포넌트에서 dispatch 함수에 action을 던지면, reducer함수가 이 action에 따라 상태를 변경해준다.

```jsx
function reducer (state, action) {

    // 새로운 상태를 만드는 로직 
    // ex) const nextState=....

    return nextState;
}
```

- Reducer 함수에서 새로운 상태를 만들 때에는 불변성을 지켜주어야 하기 때문에 spread 연산자를 주로 사용한다.

## 2. useReducer 사용하기

```jsx
const [state, dispatch] = useReducer(reducer, 초기상태)
```

- state 는 컴포넌트에서 사용할 수 있는 상태를 가르키고, dispatch는 액션을 발생시키는 함수다.
- dispatch 함수는 컴포넌트 내에서 상태 변경을 일으키기 위해서 사용되는 인자로 reducer 함수에 넘길 action 객체를 받는다.

## 3. Counter 함수 구현하기

```jsx
import React, { useReducer } from "react"

function Counter() {
  **const [state, dispatch]** = **useReducer(reducer, initialState)**
    const initialState = { count: 0 }

  return (
    <>
      <h2>{state.count}</h2>
      <button onClick={() => dispatch({ type: "INCREMENT", step: 1 })}>
        증가
      </button>
      <button onClick={() => dispatch({ type: "DECREMENT", step: 1 })}>
        감소
      </button>
    </>
  )
}
```

```jsx
**function reducer(state, action)** {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.step }
    case "DECREMENT":
      return { count: state.count - action.step }
    default:
      throw new Error("Unsupported action type:", action.type)
  }
}
```

- action 객체는 어떤 행동인지를 나타내는 type 속성과 해당 행동과 관련된 데이터를 담고 있다.

## 4. 정리

- 컴포넌트에서 관리하는 값이 적고 단순한 숫자나 문자열 등의 값이라면  `useState` 로 값을 관리하는 것이 편하다.
- 그러나 컴포넌트에서 관리하는 값이 여러개가 되어 상태의 구조가 복잡해진다면 `useReducer` 함수로 관리를 하는 것이 더 편할 수 있다. 특정 함수를 여러번 사용해야 하는 경우가 발생한다면 이 역시 useReducer을 사용하는 것이 좋다.

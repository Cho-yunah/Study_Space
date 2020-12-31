# 11. Effect Hook

- 기존 16.8 이전의 React에서는 함수 컴포넌트를 'state 가 없는 컴포넌트' 였다. 그러나 Hook 이 등장을 한 후로는 React state를 함수 안에서 사용할 수 있게 되었다.

- 이전에 컴포넌트에 state를 추가하고 싶을 때는 class 컴포넌트로 만들어야 했는데, 이제 함수 컴포넌트 안에서 Hook을 이용하여 state를 사용할수있다. Hook은 클래스 안에서 동작하지 않고, 함수 컴포넌트 안에서만 동작한다.

  

## 1. Effect Hook 사용하기

effect Hook을 사용하면 함수 컴포넌트에서 side effect를 수행할 수 있다.

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // componentDidMount, componentDidUpdate와 같은 방식으로
  useEffect(() => {
    // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
    document.title = `You clicked ${count} times`;
  });

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

- 데이터 가져오기, 구독 설정하기, DOM을 수정하기 등을 side effects 라 부른다. 리액트의 class 생명주기 메서드에서 componentDidMount와 componentDidUpdate, componentWillUnmount가 합쳐진 것으로 생각하면 된다.
- 리액트 컴포넌트에는 일반적으로 두 종류의 side effects가 있다. 정리(clean-up)가 필요한 것과 그렇지 않은 것으로 나눌수 있다.



## 1.1 정리(Clean-up)를 이용하지 않는 Effects

- 리액트가 DOM을 업데이트한 뒤 추가로 코드를 실행해야 하는 경우가 있다. 네트워크 리퀘스트, DOM 수동 조작, 로깅 등은 정리가 필요없는 경우다.

  1. Class 를 사용하는 예시

     리액트의 class 컴포넌트에서 render 메서드 그자체는 side effect를 발생시키지 않는다. effect를 수행하는 것은 리액트가 DOM을 업데이트하고 난 이후다.

     리액트 class에서 side effect를 `componentDidMount`  와 `componentDidUpdate`에 두는 것이 바로 이 때문이다.
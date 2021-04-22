# 16. Redux

- 리덕스는 리액트 상태관리 라이브러리다. 리덕스를 사용하면 각 컴포넌트들의 상태를 분리시켜서 관리할 수 있다.
- 리덕스에서도 ContextAPI 처럼 리듀서와 액션이라는 개념을 사용하게 된다.
- 복잡하고 규모가 큰 애플리케이션의 상태를 관리해야 할 때 Context API보다 리덕스와 리덕스 미들웨어를 사용하는 것이 더 효율적일 수 있다.

<br/>

## 2. Action

- 상태에 어떤 변화가 필요할 때 액션을 발생시키게 된다. 이는 하나의 객체로 표현되는데, type이라는 값이 필수로 있어야 한다. 이 type으로 어떤 액션을 발생시킬지 결정되기 때문이다.

  ```jsx
  { type : "TYPE_VALUE" }
  { type : "CHANGE_INPUT" }
  ```

<br/>

## 3. Action Creator (액션 생성 함수)

- 액션을 만들어주는 함수다. 파라미터로 데이터를 받아와서 액션객체를 만들어 준다. 리덕스를 사용하면서 액션생성함수가 필수는 아니지만 만들어두면 편하게 코드를 만들수 있다.

  ```jsx
  // 일반 함수
  export function addTodo(data) {
  	return {
  		type: "ADD_TODO",
  			data
  	}
  }
  
  // 화살표 함수
  export const changeInput = text => ({
  	type: "CHANGE_INPUT",
  	text
  });
  ```

  - 이렇게 액션 생성함수를 만들어 놓으면 나중에 컴포넌트에서 액션을 쉽게 발생시킬 수 있다. 컴포넌트가 불러서 사용할 수 있게 `export` 키워드를 붙여서 함수를 만든다.

  <br/>

## 4. Reducer

- 변화를 일으키는 함수로, state와 action을 파라미터로 받아와서 액션타입이 무엇인지에 따라 상태를 업데이트 한다.

  ```jsx
  function reducer(state, action) {
  	return changeState;
  }
  
  // 일반적으로 사용하는 방식
  function counter (state, action) {
  	switch (action.type) {
  		case 'INCREASE' : return state + 1;
  		case 'DECREASE' : return state - 1;
  		default : return state; 
  	}
  }
  ```

- 기존의 객체를 변화시키지 않고 불변성을 지켜주어야 한다.

- default에는 기존의 상태를 그대로 반환하게 한다. (Context API처럼 에러를 던지지 않는다.)

- 이 리듀서를 상태 관리를 위해 여러개 만들고 이를 다 합쳐 루트 리듀서를 만들어서 사용한다.

<br/>

## 5. Store

- 하나의 애플리케이션이 하나의 스토어를 만들게 되고, 그 앱의 상태와 리듀서를 포함하여 몇가지 내장 함수가 들어있다.
- 그 내장함수 중 하나가 dispatch 다. 액션을 발생시켜서 액션을 스토어에 전달하는 것으로 생각하면 된다.

<br/>

## 6. Dispatch

- 스토어의 내장 함수 중의 하나로, 액션을 발생시키는 것이다. 액션을 파라미터로 전달한다.

<br/>

## 7. Subscribe

- 스토어의 내장 함수 중 하나로, 함수 형태의 값을 파라미터로 받아온다.
- 액션이 발생되어 상태가 업데이트 되었을 때 특정함수를 호출시킬수 있다.

<br/>

## 8. 리덕스 규칙

1. 하나의 애플리케이션에 하나의 스토어를 만든다.

2. 상태는 불변성을 지켜야 한다. (읽기 전용이다.) - 불변성을 지켜야 컴포넌트의 렌더링이 잘된다.

3. 리듀서는 순수한 함수여야 한다. ( 동일한 input ⇒ 동일한 output)

   new Date(), Math.random(), axios.get() 과 같은 함수를 쓸수 없다.
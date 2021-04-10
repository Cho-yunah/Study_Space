# 03. React Component

## 1. 리액트가 하는 일

- 리액트는 핵심 모듈 2개로 일을 한다.

  1. 리액트 컴포넌트 ⇒ HTMLElement 연결하기 (페이지 전체라고 볼수 있다.)
  2. 리액트 컴포넌트 만들기

  ```jsx
  1. import ReactDOM from 'react-dom';
  2. import React from 'react';
  ```

- 사용 예시

  ```jsx
  //
  ReactDOM.render(
    <HelloMessage name="Taylor" />,
    document.getElementById("hello-example")
  );
  ```

  ```jsx
  // React 컴포넌트
  class HelloMessage extends React.Component {
    render() {
      return <div>Hello {this.props.name}</div>;
    }
  }

  // HTMLElement
  ReactDOM.render(
    <HelloMessage name="Taylor" />,
    document.getElementById("hello-example")
  );
  ```

  - 만들어진 리액트 컴포넌트를 실제 HTMLElement에 연결할 때 ReactDOM 라이브러리를 이용한다.

## 2. React Component 만들기

### 2.1 Hooks 이전

- 컴포넌트 내부에 상태가 있다면? ⇒ class
- 컴포넌트 내부에 상태가 없다면?
  1. 라이프사이클을 사용해야 한다면? ⇒ class
  2. 라이프사이클에 관계 없다면? ⇒ function

### 2.2 Hooks 이후

- class & function 상관없이 사용할 수 있다.
- 요즘에는 function을 일반적으로 사용한다.

### 2.3 class 컴포넌트와 functional 컴포넌트 만들기

1. class 컴포넌트

   ```jsx
   **class Component extends React.Component** {
         // 꼭 있어야 하는것 --> 오버라이드 = 렌더함수
         // 형식이 정해져 있음 --> return을 React 앨리먼트로 해야함
         **render()** {
           return(
             <div>
               <h1>제목</h1>
             </div>
           );
         }
       }
   ```

2. function 컴포넌트

   ```jsx
   function FunctionComponent() {
     return (
       <div>
         <h1>함수컴포넌트</h1>
       </div>
     );
   }
   ```

### 2.4 컴포넌트 렌더링

- 이전까지는 React 엘리먼트를 DOM 태그로 나타냈다.

  ```jsx
  const element = <div> </div>;
  ```

- React 엘리먼트는 기존의 DOM 태그뿐만 아니라 사용자 정의 컴포넌트로도 나타낼 수 있다.

  ```jsx
  const element = <Welcome name="Sara" />;
  ```

- React가 사용자 정의 엘리먼트를 발견하면 JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달한다. 이 객체를 "props"라고 한다.

- 간단한 코드의 렌더링과정은 다음과 같다.

  ```jsx
  function Welcom(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  const element = <Welcome name="Sara" />;
  ReactDOM.render(element, document.getElementById("root"));
  ```

  1. `<Welcome name="Sara" />` 엘리먼트로 `ReactDOM.render()`를 호출한다.
  2. React는 {name: 'Sara'}를 props로 하여 `Welcome` 컴포넌트를 호출한다.
  3. `Welcome` 컴포넌트는 결과적으로 `<h1>Hello, Sara</h1>` 엘리먼트를 반환한다.
  4. React DOM은 `<h1>Hello, Sara</h1>` 엘리먼트와 일치하도록 DOM을 효율적으로 업데이트한다.

- 컴포넌트의 이름은 항상 대문자로 시작한다.

### 2.5 컴포넌트 합성

- 컴포넌트는 자신의 출력에 다른 컴포넌트를 참조할 수 있다. 니는 모든 세부 단계에서 동일한 컴포넌트를 사용할 수 있음을 의미한다.
- 흔히 버튼, 폼, 다이얼로그, 화면 등이 컴포넌트로 표현된다.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

### 2.6 컴포넌트 추출

- 컴포넌트를 여러개의 작은 컴포넌트로 나누는 것을 말한다.
- 한 컴포넌트의 구성요소들이 모두 중첩 구조로 이루어져 있으면, 변경하기도 어렵고 각 구성요소를 개별적으로 재사용하기도 힘들다.
- 하나의 컴포넌트에서 컴포넌트를 작게 추출하는 것은 큰 앱에서 작업할 때 두각을 나타낸다. UI 일부가 여러번 사용되거나, UI 일부가 자체적으로 복잡한 경우에는 각각 별도의 컴포넌트로 만드는 것이 좋다.

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img
          className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

위의 컴포넌트는 author(객체), text(문자열) 및 date(날짜)를 props로 받은 후 소셜 미디어 웹 사이트의 코멘트를 나타낸다.

여기서 Avatar를 추출한다면 다음과 같다.

```jsx
function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}
```

## 3. Props 와 State

Props와 State는 렌더를 다시하게 만드는 요인이다. 둘 중 하나라도 변경이 발생하면 해당 랜더함수가 다시 실행되면서 컴포넌트를 다시 그린다.

### 2.1 props

- properties의 줄임말로써, 우리가 어떠한 값을 컴포넌트에게 전달해줘야 할 때, props를 사용한다. 즉, props는 컴포넌트 외부에서 컴포넌트에게 주는 데이터이다.
- 함수 컴포넌트나 클래스 컴포넌트 모두 자체 Props를 수정해서는 안된다.
- React에서는 자신의 props를 다룰 때 반드시 순수함수처럼 동작해야 한다. 즉, 불변성을 지켜야 한다.

### 2.2 state

- props는 변경할 수 없고 불변성을 지켜야하는데, 애플리케이션 UI는 동적이며 시간에 따라 변한다.

- State는 컴포넌트 내부에서 변경할 수 있는 데이터이다.

- 둘 중 하나라도 변경이 발생하면 해당 랜더함수가 다시 실행되면서 컴포넌트를 다시 그린다.

## 3. Render 함수

- `render()` 메서드는 클래스 컴포넌트에서 반드시 구현돼야 하는 유일한 메서드다.
- props와 State를 바탕으로 컴포넌트를 그리게 된다. 따라서 둘중하나라도 변경이 일어나면 컴포넌트가 다시 그려진다. 컴포넌트를 그리는 방법을 기술하는 함수가 랜더 함수다.
- render 함수는 순수해야 한다. 즉, 컴포넌트의 state를 변경하지 않고, 호출될때마다 동일한 결과를 반환해야 하여, 브라우저와 직접적으로 상호작용을 하지 않는다.

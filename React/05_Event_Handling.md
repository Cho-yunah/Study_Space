# 05. 이벤트 핸들링

## 1. introduction

- React 엘리먼트에서 이벤트를 처리하는 방식은 DOM엘리먼트에서 이벤트를 처리하는 방식과 거의 비슷하다.
- 문법적인 차이로는 1) React 이벤트는 카멜케이스(camelCase)를 사용한다는 것과  2) JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달한다는 점이다.
- React의 이벤트는 실제 DOM 요소들에만 사용이 가능하다. 리액트 컴포넌트에 사용하면, 그냥 props로 전달한다.

```jsx
<div>
   <button onClick={() => {
      console.log('clicked');
    }}>클릭</button>
</div>
```

- React 에서는 false를 반환해도 기본 동작을 방지할 수 없다. 반드시 preventDefault를 명시적으로 호출해야 한다.

## 2. 클래스로 이벤트 핸들러 만들기

- ES6를 사용하여 컴포넌트를 정의할 때, 일반적인 패턴은 이벤트 핸들러를 클래스의 메서드로 만드는 것이다.

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해줘야 한다.
    **this.handleClick = this.handleClick.bind(this);**
  }

  **handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }**

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

- JSX 콜백 안에서 this의 의미에 대해 주의해야 한다. JS의 클래스 메서드는 기본적으로 바인딩되어 있지 않다. 위의 코드에서 `this.handleClick`을 바인딩하지 않고 onClick에 전달하였다면, 함수가 실제 호출될 때 this는 undefined가 된다.

- this를 바인딩 하기 위해 bind 매서드를 사용하는데, 이 bind를 호출하는 것이 불편하다면, 이를 해결할 수 있는 두가지 방법이 있다.

  1. 클래스 필드를 사용하는것 ⇒ 이 문법은 실험적인 문법이다

  ```jsx
  class LogingButton extends React.Component {
    **// 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
    handleClick = () => {
      console.log('this is:', this);
    }**
    render() {
      return (
        <button onClick={this.handleClick}>
          Click me
        </button>
      );
    }
  }
  ```

  1. 콜백에 화살표함수를 사용하는 방법

  ```jsx
  class LogingButton extends React.Component {
    handleClick() {
      console.log('this is:', this);
    }
  
    render() {
      **// 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
      return (
        <button onClick={() => this.handleClick()}>
          Click me
        </button>
      );**
    }
  ```

  - 위 방법의 문제점은 LoginButton이 렌더링 될때마다 다른 콜백이 생성된다는 것이다. 이러한 문제를 피하기 위하여 생성자 안에서 바인딩하거나 클래스 필드 문법을 사용하는 것이 권장된다.
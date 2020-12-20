# 05_1_Conditional_Rendering

React 에서는 원하는 동작을 캡슐화하는 컴포넌트를 만들수 있다. 

이로써 컴포넌트 중 원하는 컴포넌트 몇개만을 렌더링할 수 있다.



## 1. 조건부 렌더링이란

- React에서 조건부 렌더링은 JavaScript에서의 조건처리와 같이 동작한다. if나 조건부 연산자 같은 JS 연산자를 엘리먼트를 만드는데 사용할 수 있다.
- 연산자의 결과에 따라 React 는 현재 상태에 맞게 UI를 업데이트를 할 것이다.



## 2. 엘리먼트 변수

- 엘리먼트를 저장하기 위해 변수를 사용할 수 있다. 출력의 다른 부분은 변하지 않고, 컴포넌트의 일부를 조건부로 렌더링 할 수 있다.
- 변수를 선언하고 if 를 사용해서 렌더링 할 수 있지만 더 짧은 구문을 사용하고 싶을때는 다른 방법이 있다.

```jsx
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    **if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;**
    }

    return (
      <div>
        **<Greeting isLoggedIn={isLoggedIn} />
        {button}**
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```



## 3. 삼항조건 연산자로IF-Else 표현하기

- 엘리먼트를 조건부로 렌더링하는 방법으로 삼항조건 연산자를 사용할 수 있다.  `condition ? true : false`

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      **{isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }**
    </div>
  );
}
```



## 4. 논리 && 연산자로 IF를 인라인으로 표현

- JSX 안에는 중괄호를 이용해서 표현식을 포함할 수 있다. 그 안에 JS의 논리 연산자 && 또는 ||를 사용하면 엘리먼트를 조건부로 넣을 수 있다.

```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      **{unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }**
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

- JS에서 `true && expression`은 항상 `expression` 으로 평가되고, `false && expression`은 항상 `false`로 평가된다.

- `&&` 뒤의 엘리먼트는 조건이 true 일때 출력이 된다. 조건이 false 라면 React는 무시한다.

  

## 5. 컴포넌트 숨기기

- 다른 컴포넌트에 의해 렌더링이 될때 컴포넌트 자체를 숨기고 싶을 때가 있다. 이때는 렌더링 결과를 출력하는 대신 **null**을 반환하면 해결할 수 있다.
- 컴포넌트의 render 메서드로부터 null을 반환하는 것은 생명주기 메서드 호출에 영향을 주지 않는다. 그 예로 componentDidUpdate는 계속해서 호출되게 된다.

```jsx
function WarningBanner(props) {
  **if (!props.warn) {
    return null;
  }**

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        **<WarningBanner warn={this.state.showWarning} />**
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```
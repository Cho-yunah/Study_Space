# 04. State와 생명주기



## 1. State

- State 는 props와 유사하지만, 비공개이며 컴포넌트에 의해 완전히 제어된다.
- props오 state는 일반 JS객체로, 두객체 모두 랜더링 결과물에 영향을 주는 정보를 갖고 있다. 그러나 한가지 중요한 방식에서 차이가 있다. props는 함수의 매개변수처럼 컴포넌트에 전달되는 반면, state는 함수 내에 선언된 변수처럼 컴포넌트 안에서 관리된다.
- React 컴포넌트가 특정 시점에 속성 중 하나를 변경해야하는 경우, 해당 속성은 state의 일부여야한다. 그렇지 않으면, props가 해당 컴포넌트의 일부여야 한다.
- 가장 중요한 점은, props는 변해서는 안되는 불변성의 특징이 있으나, state는 setState를 통해 변경이 가능하다.



## 2. 생명주기(Life Cycle)

- 생명주기는 리액트 컴포넌트는 탄생부터 죽음까지의 단계를 말한다. 이 컴포넌트의 생명주기는 여러지점에서 개발자가 작업을 할 수 있도록 메서드를 오버라이딩 할 수 있게 해준다.

- 이 생명주기는 Class Component에서만 해당한다. function 컴포넌트는 라이프사이클이 없고, 그처럼 동작하는것이 없다.

- 많은 컴포넌트가 있는 애플리케이션에서 컴포넌트가 삭제될때 해당 컴포넌트가 사용중이던 리소스를 확보하는 것이 중요하다.

- 이 생명주기의 단계는 아래와 같다. 단, version 16.3 이하일 때 이다.

  최근은 새로운 버전에서 이름이 바뀌었다.



- **생명주기 과정**

1. Initialization ⇒ 준비단계 = constructor
2. Mounting (탄생) ⇒ 그리기 직전 - 그리기(render) - 그린 직후
3. Updation (props / state 의 변경) ⇒ 각 과정일부가 다른
4. Unmounting (죽음) ⇒ 죽기 직전



### 2.1 Component 생성 및 마운트 (16.3 버전 이전)

*constructor ⇒  ComponentWillMount ⇒  **render(최초 랜더)** ⇒ ComponentDidMount*

- JSX에 최초 출현하면, 리액트가 다음과 같은 동작을 해준다.

  const app = new App(); (= constructor) => 어떤 타이밍이 되었을때 app.componentWillMount(); => 어떤 타이밍이 되었을때 app.render(); => 어떤 타이밍이 되었을때 app.componentDidMount();

- 다시말해서, 클래스를 선언을 해놓으면 이 선언을 실행하는 것은 리액트다.

- 따라서 this를 밑에 코드에서 사용할 수 있는 이유는 react가 new를 사용하여 인스턴스를 내부적으로 만들었기 때문이다.

```jsx
class App extends React.Component {
  _interval;

  constructor(props) {
    console.log('App constructor');
    super(props);
    this.state = {
      age: 37,
    };
  }

  componentWillMount() {
    console.log('App componentWillMount');
  }

  componentDidMount() {
    console.log('App componentDidMount');
    this._interval = window.setInterval(() => {
      this.setState({
        age: this.state.age + 1,
      });
		// 1. 타이머
		// 2. API를 호출
		// 3. 렌더된 결과물에 작업하기 (최초에만 하는일)
    }, 1000);
  }

  componentWillUnmount() {
    console.log('App componentWillUnmount');
    clearInterval(this._interval);
  }

  render() {
    console.log('App render');
    return (
      <div>
        <h2>
          Hello {this.props.name} - {this.state.age}
        </h2>
      </div>
    );
  }
}
```

### 2.2 Component props, state 변경 (v16.3 이전)

- *props / state 변경 (=update)*

  1. ***componentWillReceiveProps : props 변경이 일어남\***

     : props가 새로 지정되어 변경이 일어나면 바로 호출된다.

     state의 변경에 반응하지 않는다.  state를 변경해야 한다면 `setState`를 이용해 변경한다.

  2. ***shouldComponentUpdate** **(= 업데이트 하겠니?)***

     : 꼭 리턴을 해줘야한다.

     1. true면 업데이트 한다 → render 함수 호출 (defalut 값)
     2. false면 업데이트 안한다 → 밑에 줄 코드로 가지 않는다.

     =⇒ 필요한 업데이트만 할수 있게 한다. ⇒ 성능 최적화

  3. ***componentWillUpdate : 업데이트 하기 직전\***

     : 컴포넌트가 랜더링이 다시되기 직전에 불린다

     setState 같은 것을 쓰면 안된다.

  4. ***render : 업데이트로 인해 다시 그리기\***

  5. ***componentDidUpdate : 업데이트 한 후\***

     : 컴포넌트가 재 랜더링을 마치면 불린다.

### 2.3 Component 언마운트 (v16.3 이전)

- React 컴포넌트가 삭제되기 직전에  ***componentWillUnmount()***가 호출되고, 생명주기가 끝난다.



## 3. 에러처리

```jsx
import {ErrorBoundary} from 'react-error-boundary'
 
function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}
 
const ui = (
  <ErrorBoundary
    **FallbackComponent={ErrorFallback} // 에러가 났을경우 넣어줄 컴포넌트를 넣어준다.**
    onReset={() => {
      // reset the state of your app so the error doesn't happen again
    }}
  >
    <ComponentThatMayError />
  </ErrorBoundary>
)
```
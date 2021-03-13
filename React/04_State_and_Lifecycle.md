# 04. State and LifeCycle



## 1. State

- State 는 props와 유사하지만, 비공개이며 컴포넌트에 의해 완전히 제어된다.
- props와 state는 일반 JS객체로, 두객체 모두 랜더링 결과물에 영향을 주는 정보를 갖고 있다. 그러나 한가지 중요한 방식에서 차이가 있다. props는 함수의 매개변수처럼 컴포넌트에 전달되는 반면, state는 함수 내에 선언된 변수처럼 컴포넌트 안에서 관리된다.
- 가장 중요한 차이점은,
  1. props는 부모 구성요소에서 설정한 정보를 포함하며 변경할 수 없는 불변성의 특징이 있다.
  2. state는 구성요소가 자체적으로 초기화, 변경 및 사용할수 있는 정보를 포함하고,setState를 통해 변경이 가능하다.
- state는 객체안에 넣는 것이 리액트의 문법이고 이 state 로는 view에 관계된것만 넣으면 된다.



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





## 3. v16.3 이전의 Component Life Cycle

### 3.1 Component 생성 및 마운트 (16.3 버전 이전)

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



### 3.2 Component props, state 변경 (v16.3 이전)

- *props / state 변경 (=update)*

  1. ***componentWillReceiveProps : props 변경이 일어남\***

     : props가 새로 지정되어 변경이 일어나면 바로 호출된다.   (nextProps ⇒ state를 조작하는 공간)

     state의 변경에 반응하지 않는다.  state를 변경해야 한다면 `setState`를 이용해 변경한다.

  2. ***shouldComponentUpdate** **(= 업데이트 하겠니?)***

     : 꼭 리턴을 해줘야한다.

     1. true면 업데이트 한다 → render 함수 호출 (=defalut 값)
     2. false면 업데이트 안한다 → 밑에 줄 코드로 가지 않는다.

     =⇒ 필요한 업데이트만 할수 있게 한다. ⇒ 성능 최적화

     - if 문등을 사용하여 this.props와 nextProps를 비교하고, 이 props 객체가 변했을때 새로운 객체를 만들어 랜더링을 다시한다. =⇒ immutable 하게 관리하는 방식

  3. ***componentWillUpdate : 업데이트 하기 직전\***

     : 컴포넌트가 랜더링이 다시되기 직전에 불린다

     setState 같은 것을 쓰면 안된다.

  4. ***render : 업데이트로 인해 다시 그리기\***

  5. ***componentDidUpdate : 업데이트 한 후\***

     : 컴포넌트가 재 랜더링을 마치면 불린다.



### 3.3 Component 언마운트 (v16.3 이전)

- React 컴포넌트가 삭제되기 직전에  ***componentWillUnmount()***가 호출되고, 생명주기가 끝난다.





## 4. v16.3 ~ Component Life Cycle

### 4.1 생명주기 단계의 이름 변경

- 기존의 생명주기 단계의 이름들이 의미가 명확하게 바뀌었다.

  componentWillMount ⇒ getDerivedStateFromProps

  componentWillReceiveProps ⇒ getDerivedStateFromProps

  componentWillUpdate ⇒ getSnapshotBeforeUpdate



### 4.2 Component생성 및 마운트 (v16.3)

constructor ⇒ **static getDerivedStateFromProps (클래스 매서드)** ⇒ render(최초랜더) ⇒ componentDidMount

- getDerivedStateFromProps 의 return이 state가 된다. (조건부로 만들수 있다.)

```jsx
import React from 'react';

class App extends React.Component {
  state = {
    age: 0,
  };

  **static getDerivedStateFromProps**(nextProps, prevState) {
    console.log(nextProps, prevState);
    **if** (prevState.age !== nextProps.age) {
      return { age: nextProps.age };
    }
    return null;
  }

  render() {
    console.log('App render');
    return <div>{this.state.age}</div>;
  }
}

export default App;
```



## 4.3 Component props, state 변경 (v16.3)

- component가 업데이트 되면

  1. props 변경일 경우:  static getDerivedStateFromProps 부터 시작

     state 변경일 경우:  shouldComponentUpdate 부터 시작

  2. render

  3. getSnapshotBeforeUpdate

     - DOM으로부터 값을 꺼내는 것이고, snapshot을 return한다.
     - 업데이트 된 DOM의 전과 후를 기억할수 있도록 한다.

  4. componentDidUpdate





## 3. 에러처리

- 자바스크립트에서는 변수나 함수에서 오류가 나면 오류가 난 부분이 동작을 하지 않고 console에 에러가 출력되지만, 리액트의 경우에는 하나의 큰 애플리케이션으로 만들어져 있기 때문에 한 컴포넌트에서 에러가 나면 애플리케이션 전체가 다운되어 동작하지 않는다.
- 이러한 문제들로 에러를 캐치하는 기능이 추가되어서 **리액트 컴포넌트에서 에러가 났을때, 그 컴포넌트를 사용하는 부모가 그 에러를 알아차릴수 있다.**
- 컴포넌트의 부모가 Error 를 캐치할 수 있기 때문에, **에러를 캐치하는 컴포넌트는 최상단에 위치한다.**

```jsx
import React from 'react';

function Button() {
	throw new Error('에러!!');
	return <button> 에러 </button>;
}

class App extends React.Component {
  state = {
    error: false,
  };
  componentDidCatch() { // 이 메서드를 사용하여 에러를 캐치
    this.setState({ error: true });
  }
  render() {
    if (this.state.hasError) {
      return <div>에러났다!!</div>;
    }
    return (
      <div>
        <Button />
      </div>
    );
  }
}

export default App;
```

- componentDidCatch 메서드를 사용하여 에러를 캐치할 수 있지만 이러한 작업을 매번 하는것이 귀찮다.

- 그래서 등장한 것이 Error Boundaries다. 이 라이브러리로 에러 반복되는 에러처리를 간단하게 할수 있다. 이 라이브러리를 사용하기 위해 먼저 설치를 한다.

  `npm instll --save react-error-boundary`

- 설치를 완료하면 이 Error Boundary를 사용하려는 파일에 넣어준다.

  ```jsx
  import React from 'react';
  
  // 상위에 에러바운더리를 import 한다.
  import { ErrorBoundary } from "react-error-boundary";
  
  function Button() {
  	throw new Error('에러!!');
  	return <button> 에러 </button>;
  }
  
  // 에러가 났을 경우 보여줄 에러페이지
  function ErrorPage() {
    return <div>에러가 났다!</div>
  }
  
  // render 함수 안에 <ErrorBoundary>를 넣는다.
  class App extends React.Component {
    render() {
      return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
  	      <div>
  		      <Button />
  		    </div>
        </ErrorBoundary>
      )
    }
  }
  ```
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



### 1.1 정리(Clean-up)를 이용하지 않는 Effects

- 리액트가 DOM을 업데이트한 뒤 추가로 코드를 실행해야 하는 경우가 있다. 네트워크 리퀘스트, DOM 수동 조작, 로깅 등은 정리가 필요없는 경우다.

  1. **Class 를 사용하는 예시**

     리액트의 class 컴포넌트에서 render 메서드 그자체는 side effect를 발생시키지 않는다. effect를 수행하는 것은 리액트가 DOM을 업데이트하고 난 이후다.

     리액트 class에서 side effect를 `componentDidMount`  와 `componentDidUpdate`에 두는 것이 바로 이 때문이다.

     ```jsx
     class Example extends React.Component {
       constructor(props) {
         super(props);
         this.state = {
           count: 0
         };
       }
     
       **componentDidMount() {
         document.title = `You clicked ${this.state.count} times`;}
       componentDidUpdate() {
         document.title = `You clicked ${this.state.count} times`;}**
     
       render() {
         return (
           <div>
             <p>You clicked {this.state.count} times</p>
             <button onClick={() => this.setState({ count: this.state.count + 1 })}>
               Click me
             </button>
           </div>
         );
       }
     }
     ```

     위의 class 안의 두개의 생명주기 메서드에 같은 코드가 중복된다. 이는 컴포넌트가 마운트된 단계, 업데이트된 단계 모두 같은 side effect를 수행해야 하기 때문이다.

     

  2. **Hook 을 이용하는 예시**

     ```
     import React, { useState, useEffect } from 'react';
     
     function Example() {
       const [count, setCount] = useState(0);
     
       useEffect(() => {  // effect 함수
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

     - useEffect 를 이용하여 우리는 리액트에게 컴포넌트가 렌더링 이후에 어떤 일을 수행해야 하는지를 말합니다. 리액트는 우리가 effect로 넘긴 함수를 기억했다가 DOM 업데이트를 수행한 이후에 불러낸다.
     - 의의 코드처럼 문서 타이틀을 지정하는 것 외에도 effect를 통해 데이터를 가져오거나 다른 명령형 API를 불러낼수도 있다.
     - `useEffect` 를 컴포넌트를 내부에 둠으로써 effect를 통해 state 변수에 접근할 수 있게 된다.
     - useEffect는 렌더링 이후에 매번 수행됨으로써 class 생명주기의 `componentDidMount`  와 `componentDidUpdate` 를 대신할수 있게 된다.



### 1.2  정리(clean-up)을 이용하는 Effects

- 정리가 필요한 effect가 있는데, 외부 데이터에 구독을 설정해야 하는 경우이다. 예를 들면 setTimeout과 같은 것들로, 정리를 하지 않았을 경우 메모리 누수가 발생기 때문에 정리를 하는것이 매우 중요하다.

  1. **Class 를 사용하는 예시**

     리액트 class에서는 `componentDidMount`에 구독을 설정하고, `componentWillUnmount` 에서 정리를 한다.

     ```jsx
     class FriendStatus extends React.Component {
       constructor(props) {
         super(props);
         this.state = { isOnline: null };
         this.handleStatusChange = this.handleStatusChange.bind(this);
       }
     
       **componentDidMount() { // 구독 설정
         ChatAPI.subscribeToFriendStatus(
           this.props.friend.id,
           this.handleStatusChange
         );
       }
       componentWillUnmount() { // 구독 해지
         ChatAPI.unsubscribeFromFriendStatus(
           this.props.friend.id,
           this.handleStatusChange
         );
       }**
       handleStatusChange(status) {
         this.setState({
           isOnline: status.isOnline
         });
       }
     
       render() {
         if (this.state.isOnline === null) {
           return 'Loading...';
         }
         return this.state.isOnline ? 'Online' : 'Offline';
       }
     }
     ```

     정리가 필요한 경우에도 `componentDidMount` 와 `componentWillUnmount`

     의 코드 내용이 중복되어 대칭을 이루고 있다.

  2**. Hook을 이용하는 예시**

  - 정리의 실행을 위해 별개의 effect 가 필요하다고 생각할 수도 있지만, 구독의 추가와 제거 코드는 결합도가 높아서 useEffect는 이를 함께 다룰수 있다.  effect 가 함수를 반환하면 리액트는 그 함수를 정리가 필요한 때에 실행시킨다.

    ```jsx
    import React, { useState, useEffect } from 'react';
    
    function FriendStatus(props) {
      const [isOnline, setIsOnline] = useState(null);
    
      **useEffect(() => {
        function handleStatusChange(status) {
          setIsOnline(status.isOnline);
        }
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        // effect 이후에 어떻게 정리(clean-up)할 것인지 표시합니다.
        return function cleanup() {
          ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
      });**
    
      if (isOnline === null) {
        return 'Loading...';
      }
      return isOnline ? 'Online' : 'Offline';
    }
    ```

  - effect에서는 함수를 반환하는데, 이는 effect를 위한 추가적인 정리 메커니즘이다. 모든 effect는 정리를 위한 함수를 반환할수 있다. 이로써 구독의 추가와 제거가 모두 하나의 effect를 구성할 수 있는것이다.

  - 리액트는 컴포넌트가 마운트 해제되는 대에 정리를 실행한다. effect는 렌더링이 실행되는 때마다 실행된다. 다음 차례의 effect를 실행하기 전에 이전의 렌더링에서 파생된 effect도 함께 정리한다.

  

## 2. effect를 이용하는 팁

- State Hook 을 여러번 사용할 수 있는 것처럼 effect 또한 여러번 사용할 수 있다. Effect를 이용하여 서로 관련이 없는 로직들을 갈라놓을 수 있다.

  ```jsx
  function FriendStatusWithCounter(props) {
    const [count, setCount] = useState(0);
    **useEffect(() => {**
      document.title = `You clicked ${count} times`;
    });
  
    const [isOnline, setIsOnline] = useState(null);
    **useEffect(() => {**
      function handleStatusChange(status) {
        setIsOnline(status.isOnline);
      }
  
      ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
      return () => {
        ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
      };
    });
    // ...
  }
  ```

- Hook을 이용하면 생명주기 메서드에 따라서가 아니라 **코드가 무엇을 하는지에 따라 나눌수 있다.** 리액트는 모든 effect를 지정된 순서에 맞춰 적용한다.
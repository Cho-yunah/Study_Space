# Context API

- 특정 함수를 원하는 컴포넌트에게 전달해야 하는 상황이 발생했을 때 컴포넌트를 3~4개 이상 거쳐서 전달을 해야한다면 매우 번거로워진다.

- 이러한 상황에 리액트의 context API 와 dispatch를 함께 사용하면 복잡한 구조를 해결할 수 있다.

- Context API는 프로젝트 안에서 전역적으로 사용할 수 있는 값을 관리할 수 있다. 이는 꼭 상태가 아니고 함수나 DOM 이 될수도 있다.

  <br/>

## 1. Context API 사용하기

### 1.1 createContext 만들기

- `React.createContext()` 라는 함수로 Context를 만든다. 파라미터에 context의 기본값을 설정할 수 있다.

```jsx
const UserDispatch = React.createContext(null);
```



### 1.2 Provider 설정하기

- Context를 만들면, 그 안에 Provider라는 컴포넌트가 들어있는데 이 컴포넌트를 통해 Context의 값을 정할 수 있다. 사용할 때 value라는 값을 설정하면 된다.

```jsx
<UserDisptch.Provider value ={dispatch}>...</Userdispatch>
```

- 위와 같이 설정해주면 Provider에 의해 감싸진 컴포넌트 중 어디든지 Context의 값을 바로 조회해서 사용할 수 있다. Provider 하위의 모든 Consumer 는 Provider의 value가 변경될 때마다 재렌더링된다.

- 보통 Provider 함수를 구현하고 그 안에 하위에서 사용할 state와 setState를 정의하고, 그 state를 관리할 store을 만들기 위해 createContext를 받아와서 Provider를 반환한다.

  ```jsx
  export function **TodoProvider ({children})** {
    **const [state, dispatch]** = useReducer(todoReducer, initialTodos);
    const nextId = useRef(4);
  
    return (
      **<StateContext.Provider value={state}>
         <DispatchContext.Provider value={dispatch}>
            <NextIdContext.Provider value ={nextId}>
              {children} 
  						// Provider 의 value를 사용할 
  						컴포넌트들을 호출하려면 {children}이 있어야 한다.**
            </NextIdContext.Provider>
         </DispatchContext.Provider>
      </StateContext.Provider>
    );
  }
  ```



### 1.3 하위 컴포넌트에서 Provider 사용하기

- Provider의 값을 사용하기 위해 Provider을 import해오고, 사용하고자 하는 자식들 컴포넌트들 가장 바깥에서 <Provider>로 감싸준다.

```jsx
// App.js
function App() {
  return (
    <TodoProvider>
      <div>....
    </TodoProvider>
  );
}
```

- 하위 컴포넌트에서는 Provider 안의 값을 사용하기 위해 원하는 함수를 `useContext(Context)` 로 불러온다.

```jsx
export function useTodoState() {
    const context = useContext(StateContext)
    if(!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}
```

- 위와 같은 방법으로 Context API를 사용하여 props를 비교적 쉽게 전달할 수 있다.


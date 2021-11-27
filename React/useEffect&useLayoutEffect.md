# useEffect & useLayoutEffect 비교

react로 프로젝트를 진행하면서 hook 를 많이 사용하게 되는데, 그 중 가장 흔하게 사용되는 hook 중 하나는 useEffect 일것이다.

useEffect가 동작하는 방법이나 시점에 대한 기본적인 것을 알고있다는 가정하에 useEffect와 비슷하면서도 다른, useLayoutEffect에 대해서 알아보자

당신은 useEffect과 useLayoutEffect 사이의 차이를 정확히 알고 설명할 수 있는가? 구체적인 예시를 들어서 이 두가지 hook의 차이를 정리하려 한다.
<br/>
<br/>

## useEffect와 useLayoutEffect의 실제적인 차이

useLayoutEffect Hook에 대한 자세한 내용은 첫 번째 단락에서 확인할 수 있다.

> 형태는 useEffect와 동일하지만, useLayoutEffect는 모든 DOM 요소가 완성되었을 때 동기적으로 실행된다. (_“The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations.”)_

이 문장에서 주어지는 첫번째 항목은 이해하기 쉽다. useEffect와 useLayoutEffect 형태는 다음처럼 똑같다.

```jsx
useEffect(() => {
  // do something
}, [array, dependency]);

useLayoutEffect(() => {
  // do something
}, [array, dependency]);
```

실제로 사실 당신이 코드 내에서 사용한 useEffect를 useLayoutEffect로 바꿀지라도 거의 대부분 잘 작동할 것이다.

두개의 hook이 같은 형태를 가지고 있기 때문에, 동작도 동일하게 할것임을 쉽게 추측할 수 있다. 하지만 두번째 항목은 조금 명확하지 않게 느껴질수 있다.
<br/>
<br/>

## 발생하는 시점의 차이

이 차이는 코드로 예제를 보면서 비교해보자

```jsx
function Counter() {
    const [count, setCount] = useState(0)
    useEffect(() => {
      // perform side effect
      sendCountToServer(count)
    }, [count])
    <div>
        <h1> {`The current count is ${count}`} </h1>
        <button onClick={() => setCount(count => count + 1)}>
            Update Count
        </button>
</div> }
// render Counter
<Counter />
```

위 코드를 실행하면, Counter 컴포넌트가 mount 될때, `The current count is 0` 문장이 유저의 화면에 출력된다.

이 후 버튼을 누를 때마다 counter 의 상태가 업데이트 되고, DOM의 변화는 화면에 출력될 것이라고 생각할 것이다.

하지만 실제적으로 일어날 일은 다음과 같다.

1. 유저가 액션을 발생시킨다. ex) clicks the button
2. 리액트는 내부적으로 count 상태를 업데이트 시킨다.
3. 리액트가 DOM을 변형시킨다.
4. `h1` 의 내용이 새로운 상태의 값으로 바뀐다.
5. 브라우저는 DOM의 변화를 브라우저 화면에 paint 한다.

   위의 3번까지는 visual의 변화를 볼수 없다. DOM의 변화로 인한 브라우저가 paint를 다시 할 때까지 실제로 브라우저는 그대로이다.

   즉 리액트는 DOM의 구체적인 변동사항을 브라우저 엔진에게 전달하고, 이를 통해 화면의 어떤 부분을 다시 그려야 하는지 알아낸다.

6. 브라우저가 DOM의 변화를 모두 그려낸 후에야 `useEffect` hook 이 실행된다. 오직 DOM의 변화가 있은 후에야 useEffect가 실행된다는 것을 기억해두어야 한다.

   정리하자면, effect 함수는 브라우저의 paint 과정을 방해(차단)하지 않기 위해 비동기적으로 실행된다. 그리고 이 과정은 매우 빠르게 실행된다.

   <br/>

> useEffect는 브라우저가 그려진 후까지 실행이 지연되지만, 새로운 렌더링 전에 실행이 보장된다. React will always flush a previous render’s effects before starting a new update.

<br/>

## 그렇다면 useEffect 가 useLayoutEffect 와 다른 점이 무엇일까?

useEffect와는 다르게, useLayoutEffect가 전달하는 함수는 모든 DOM의 변화 후에 동기적으로 실행된다.

간단히 말하자면, useLayoutEffect는 실제로 DOM의 변화로 인해 브라우저가 다시 그려졌는지 고려하지 않는다. 이 hook은 DOM의 변화가 계산된 직후에 바로 실행된다.

이것이 이상적으로 보이지는 않지만, 특정 사례에서는 권장된다. 예를 들어 사용자가 볼수 있어야 하는 DOM변화는 다음 paint가 되기전에 동기적으로 발생해야 한다. 사용자가 시각적인 오류를 인지하기 못하게 하기 위함이다.

useLayoutEffect 내에서 예정된 업데이트는 브라우저를 그리기 전에 동기적으로 실행다는 것을 기억해야 한다.

<br/>

## 정리

useEffect 와 useLayoutEffect의 동작은 무거운 계산을 처리하는 방법에 따라 다르다. 앞서 언급한 바와 같이 useEffect는 DOM 변화가 paint 될때까지 effect 함수 실행을 지연하므로 둘 중에 적절한 것을 선택하면 된다. 그러나 현대의 모던 브라우저들은 매우 빠르기 때문에 이 차이가 과거보다 크지 않을 수 있다. 그러나 무거운 계산일수록 useLayoutEffect에서는 화면의 렌더링이 지연되므로 되도록이면 useEffect를 사용하도록 한다.

useLayoutEffect를 사용하기 좋은 예는 특정 이벤트가 발생했을 때 깜박임이 있을 때 정도가 될수 있다. 컴포넌트가 mount 되면서 참조하고 있는 상태때문에 애니메이션을 수행하면 애니메이션이 시작되기 전에 브라우저가 깜박거릴수 있다. 이때 useLayoutEffect를 사용하면 useEffect보다 버터처럼 깨끗하고 빠르게 보이는 애니메이션을 볼수 있다. 애니메이션 효과에 useEffect와 useLayoutEffect를 사용한다면 어떻게 보여지는지 두개의 hook을 모두 테스트 해보는 것이 좋다.

원문 [https://blog.logrocket.com/useeffect-vs-uselayouteffect/](https://blog.logrocket.com/useeffect-vs-uselayouteffect/)

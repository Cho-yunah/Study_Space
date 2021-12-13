# React 코드에서 발생할 수 있는 오류 찾기

- 이 글은 Edgar Abgaryan의 글을 번역한 글입니다.
  <br/>
  원문 읽기: https://betterprogramming.pub/my-favorite-coding-interview-task-for-frontened-developers-f3e984fa49e2

<br/>

다음의 2가지 조건을 만족시키는 컴포넌트를 만들어보자

1. Y축 스크롤의 실제 값을 표시하기
2. 컴포넌트가 mounting 된 후, 비동기적으로 숫자를 전달받아 표시하기

```jsx
import React, { useState, useEffect } from "react";

// 다음은 서버에 비동기로 숫자를 받아오는 요청으로 가정한다.
const fetchRandomNumber = () => Promise.resolve(Math.random());

const NumberAndScroll = () => {
  const [number, setNumber] = useState();
  const [scroll, setScroll] = useState();

  useEffect(async () => {
    setNumber(await fetchRandomNumber());

    window.addEventListener("scroll", () => setScroll(window.scrollY));

    return () =>
      window.removeEventListener("scroll", () => setScroll(window.scrollY));
  });

  return (
    <div>
      <div> Number: {number} </div>
      <div> Scroll: {scroll} </div>
    </div>
  );
};
```

위의 코드에서 발생할 수 있는 이슈를 찾아 설명하고 수정해보자.

충분한 고민을 해봤다면, 이제 코드를 하나씩 수정해보자

<br/>

## 첫번째 사항

첫번째로 수정해야 할 사항은 모두가 알아 맞춰을것이라 생각한다. useEffect에 두번째 인자가 없다는 점이다.
두번째 인자로 빈배열을 넣어야 한다. 이는 우리가 서버에서 숫자를 받는 것은 mounting 된 시점의 딱 한번뿐이기 때문이다. 또한 scroll 이벤트를 반복적으로 계속 구독한다는 점은 말이 안된다.

```jsx
import React, { useState, useEffect } from 'react';

const fetchRandomNumber = () => (Promise.resolve(Math.random());

const NumberAndScroll = () => {
  const [number, setNumber] = useState();
  const [scroll, setScroll] = useState();

  useEffect(async () => {
    () => setNumber(await fetchRandomNumber());

    window.addEventListener('scroll', () => setScroll(window.scrollY));

    return () => window.removeEventListener('scroll', () => setScroll(window.scrollY));
  },[scroll]);

  return (
    <div>
      <div> Number: { number } </div>
      <div> Scroll: { scroll } </div>
    </div>
  )
}
```

우리가 흔하게 하는 실수는 의존성 배열에 `[scroll]` 과 같은 값을 넣는 것이다. 만약 당신이 그런 실수를 했다면 코드로 돌아가서 현재 스크롤 값을 계속 업데이트 할 필요가 없음을 확실히 해라.

<br/>

## 두번째 사항

두번째 사항으로는 우리가 알아챌수 있는 것은 콜백함수 안에 비동기 키워드가 있다는 점이다. 하지만 이 점이 왜 잘못된 점일까?
리액트 공식 문서에 따르면, 콜백함수는 아무것도 리턴하지 않거나, clean up 함수를 리턴한다. 이 말은 즉, undefined 와 함수라는 2가지 유효한 리턴값이 있다는 말이다. 하지만, `async` 비동기 함수는 언제나 promise 를 리턴한다. 즉, 위의 코드에서는 콜백이 정해진 2개의 값을 반환하지 않고, 해당 함수의 promise를 반환한다는 점이 문제인 것이다.
따라서 위의 코드에서 비동기 키워드를 useEffect의 콜백함수에서 지우고, 콜백함수를 다시 작동시켜줘야 한다. 이 작동은 `promise`를 사용하는 것이 가장 쉬운 방법이다.

```jsx
...
// remove async
  useEffect(() => {
    // use promise
    fetchRandomNumber().then(setNumber);

    window.addEventListener('scroll', () => setScroll(window.scrollY));

    return () => window.removeEventListener('scroll', () => setScroll(window.scrollY));
  }, []);
...
```

비동기 함수 호출의 결과로 나온 promise를 `.then`으로 처리하여, 후속작업을 처리한다. 만약 `fetchRandomNumber().then(num => setNumber(num))`으로 코드를 작성하였다면 이는 `fetchRandomNumber().then(setNumber)`과 같고, 이렇게 코드를 쓰는것이 더 간단하고 최적의 코드라는 것도 금방 알게될 것이다.

<br/>

## 세번째 사항

`useEffect` 안에는 `() => setScroll(window.scrollY)` 이 구문이 있는데, 매번 이를 쓸때마다 새로운 함수가 만들어진다. 종종 이 문제를 이상한 방식으로 해결을 하려고 하는데,

```jsx
...
const handleScroll = () => setScroll(window.scrollY);

useEffect(() => {
  fetchRandomNumber().then(setNumber);
  window.addEventListener('scroll', handleScroll);

  return () => window.removeEventListner('scroll', handleScroll);
},[])
...
```

위처럼 이벤트 리스너가 호출하는 함수를 `useEffect` 밖에 두는 방식이다. 이 방법의 경우 작동은 하나, `handleScroll` 컴포넌트의 각 렌더가 오직 `useEffect`의 콜백에만 사용된다는 것이 문제점이다.
따라서 `handleScroll`은 처음 렌더링 시점에만 호출된다. 이로 인한 추가적인 작업을 위해 코드를 작성하게 되고, 코드가 흩어지게 된다.

더 좋은 방법은 다음과 같다.

```jsx
...

useEffect(() => {
  fetchRandomNumber().then(setNumber);

  const handleScroll = () => setScroll(window.scrollY);
  window.addEventListener('scroll', handleScroll);

  return () => window.removeEventListner('scroll', handleScroll);
},[])
...
```

---

위의 3가지 이슈사항 보다 비교적 덜 중요한 사항들도 있다.

```jsx
const [number, setNumber] = useState();
const [scroll, setScroll] = useState();
```

useState의 초기값을 설정하는 것인데, 이 초깃값으로 `0`을 생각할 수 있다. 그러나 이 초깃값을 0으로 넣을 수 없으며, undefined 상태로 두는 것이 더 좋다.
스크롤 변수값의 경우, 우리의 컴포넌트가 이미 아래로 스크롤 되기 전에 나타날수 있으므로 초기값을 0으로 두는 것을 옳지 않다. (?)

```jsx
import React, { useState, useEffect } from "react";

const fetchRandomNumber = () => Promise.resolve(Math.random());

const NumberAndScroll = () => {
  const [number, setNumber] = useState();
  // set initial value
  const [scroll, setScroll] = useState(window.scrollY);

  useEffect(() => {
    fetchRandomNumber().then(setNumber);

    const handleScroll = () => setScroll(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div> Number: {number} </div>
      <div> Scroll: {scroll} </div>
    </div>
  );
};
```

여기까지 수정하면 꽤 괜찮은 코드를 구현한 것이다.
하지만 좀더 추가로 수정을 이어나가 보자. 방금 전까지의 코드는 스크롤이 발생할 때마다 매번 많은 이벤트가 발생한다. 이벤트 발생 횟수를 줄이기 위해 throttle 라이브러리를 적용시켜 보자

```jsx
import React, { useState, useEffect } from "react";
import throttle from "lodash/throttle";

const fetchRandomNumber = () => Promise.resolve(Math.random());

const NumberAndScroll = () => {
  const [number, setNumber] = useState();
  const [scroll, setScroll] = useState(window.scrollY);

  useEffect(() => {
    fetchRandomNumber().then(setNumber);

    const throttleWait = 37;
    const handleScroll = throttle(
      () => setScroll(window.scrollY),
      throttleWait
    );

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div> Number: {number} </div>
      <div> Scroll: {scroll} </div>
    </div>
  );
};
```

throttle을 `handleScroll` 함수에 적용을 했다. 위의 코드에서 나올수 있는 질문은 throttleWait 시간이 왜 37ms 인것일까 이다. 특정 FPS 원하기 때문에 특정한 값으로 설정할 수 있다. 60 FPS 를 원하기 때문에 1000/60 이라는 값으로 설정하는 것이 이것이다.
그러나 FPS 측면에서 더욱 좋고 발전된 솔루션은 스로틀 대신 requestAnimationFrame을 사용하는 것이다.

```jsx
import React, { useState, useEffect, useRef } from "react";

const fetchRandomNumber = () => Promise.resolve(Math.random());

const NumberAndScroll = () => {
  const [number, setNumber] = useState();
  const [scroll, setScroll] = useState(window.scrollY);
  const requestRef = useRef();

  useEffect(() => {
    fetchRandomNumber().then(setNumber);

    const animate = () => setScroll(window.scrollY);

    const handleScroll = () => {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div>
      <div> Number: {number} </div>
      <div> Scroll: {scroll} </div>
    </div>
  );
};
```

추가적으로 useEffect의 단일 의존성 원칙을 적용시키는 것도 좋다. useEffect를 분리하는 것이다.

```jsx
...
// async number fetching logig
  useEffect(() => {
    fetchRandomNumber().then(setNumber);
  }, [])

  // scroll logic
  useEffect(() => {
    const animate = () => setScroll(window.scrollY);

    const handleScroll = () => {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(requestRef.current);
    }
  }, []);
...
```

이렇게 `useEffect`코드를 분리하면 코드을 읽고 이해하기 쉽고, 나중에 변경하기에도 쉽다.
여기서 더 나아가자면, custom hook을 만들수도 있다.

```jsx
import React, { useState, useEffect, useRef } from "react";

const fetchRandomNumber = () => Promise.resolve(Math.random());

const useScrollY = () => {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const requestRef = useRef();

  useEffect(() => {
    const animate = () => setScrollY(window.scrollY);

    const handleScroll = () => {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return scrollY;
};

const useNumberFromServer = () => {
  const [number, setNumber] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRandomNumber()
      .then(setNumber)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return {
    number,
    error,
    isLoading,
  };
};

const NumberAndScroll = () => {
  const scrollY = useScrollY();
  const { number } = useNumberFromServer();

  return (
    <div>
      <div> Number: {number} </div>
      <div> Scroll: {scrollY} </div>
    </div>
  );
};
```

여기까지 custom hook 을 만들면 발생하는 경고가 있다.
`Warning: Can't perform a React state update on an unmounted component.`
이 경고를 없애기 위해서는 컴포넌트가 setState 를 호출하기 이전에 unmount 되어 있지않은지 확실히 확인해야 한다.

```jsx
const useIsUnmountedRef = () => {
  const isUnmountedRef = useRef(false);

  useEffect(
    () => () => {
      isUnmountedRef.current = true;
    },
    []
  );

  return isUnmountedRef;
};

const useNumberFromServer = () => {
  const isUnmountedRef = useIsUnmountedRef();
  const [number, setNumber] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRandomNumber()
      .then((n) => !isUnmountedRef.current && setNumber(n))
      .catch((e) => !isUnmountedRef.current && setError(e))
      .finally(() => !isUnmountedRef.current && setIsLoading(false));
  }, []);

  return {
    number,
    error,
    isLoading,
  };
};
```

# 12. Custom Hook

Custom Hook을 만들면 컴포넌트 로직을 함수로 뽑아내어 재사용할 수 있다.



## 1. Custom Hook (사용자 정의 Hook) 추출하기

- 두개의 자바스크립트 함수에서 같은 로직을 공유하고자 할때는 또 다른 함수로 분리한다. 컴포넌트와 Hook 또한 함수이기 때문에 이와 같은 방법을 사용할 수 있다.
- Custom Hook은 이름이 use 로 시작하는 자바스크립트 함수다.  Custom Hook은 다른 Hook을 호출할 수 있다.

```jsx
 import { useState, useEffect } from 'react
**function useFriendStatus(friendID) {**
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

- React 컴포넌트와 다르게 Custom Hook은 특정한 시그니처가 필요없다. 무엇을 인수로 받아야 하며 무엇을 반환해야 하는지를 사용자가 결정할 수 있다.
- Custom Hook은 상태관련 로직(구독을 설정하고 현재 변숫값을 기억하는것)을 재사용하는 메커니즘이지만, 사용자 Hook을 사용할 때마다 그 안의 state와 effect는 완전히 독립적이다. 그래서 같은 Hook을 사용하여도 두개의 컴포넌트는 state를 공유하지 않는다.
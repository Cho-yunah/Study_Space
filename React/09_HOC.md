# 09. HOC 

- 고차 함수 컴포넌트- 전통적인 스타일의 컴포넌트이다.
- 컴포넌트의 **로직**을 재사용 - 컴포넌트의 로직이 반복될때 사용할 수 있는 것
- 리액트의 API를 사용하지 않는다. 전혀 상관이 없다.
- 리액트의 compositional한 매커니즘을 발전시키는 패턴이다.

```jsx
HOC = function(컴포넌트) { return 새로운 컴포넌트; }
```

- 컴포넌트를 인자로 받아 새로운 컴포넌트를 리턴하는 함수
- withRouter() ⇒ 보통 with가 붙은 함수가 HOC 인 경우가 많다.
- 만드는 법

1. *Use HOCs For **[Cross-Cutting Concerns](https://ko.wikipedia.org/wiki/횡단_관심사)(횡단 관심사)**- 프로그램 로직이 진행되는 동안 비슷한 로직을 묶어서 실행하는 것*
2. *Don’t Mutate the Original Component. Use Composition. (받은 컴포넌트를 분해하거나 변경하지 않고 그대로 넣은 새로운 컴포넌트로 만들어서 반환해야 한다.)*
3. *Pass Unrelated Props Through to the Wrapped Component -*
4. *Maximizing Composability- 상속하지 않고 조합을 활용한다.*
5. *Wrap the Display Name for Easy Debugging - HOC를 다른 사람이 사용할 때 용이하게 하기위해  Displayname을 넣어서 표현해주어라*

- 주의할 점

1. *Don’t Use HOCs Inside the render Method -*
2. *Static Methods Must Be Copied Over*
3. *Refs Aren’t Passed Through (feat. React.forwardRef)*

- axios를 사용하는 이유

-가장 대중적인 http client 라이브러리, 내부적으로 XMLHTTPRequest를 사용하고, 서버와 클라이언트 모두 똑같은 API로 호출가능하고, 프라미스로 되어 있어서 사용이 편하다.
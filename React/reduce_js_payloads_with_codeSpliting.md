# Reduce JavaScript payloads with code splitting

- 코드 스플리팅을 통한 자바스크립트의 페이로드 줄이기

아무도 기다림을 좋아하지 않는다. 50% 이상의 user들이 로딩시간이 3초 이상 걸리는 웹사이트는 사용하지 않는다. 크기가 큰 자바스크립트 페이로드는 사이트의 속도에 심각한 영향을 끼친다. 당신의 어플리케이션의 첫 페이지가 로드될때, 모든 자바스크립트 코드를 user에게 전달하기 보다는 여러조각으로 나누고, 맨 처음 필요한 항목만 보내야 한다.

사용자가 응용프로그램을 로드할 때 초기 경로에 필요한 코드만 보내려면 JavaScript 번들의 분할이 필요하다. JS 번들을 분할하면 분석 및 컴파일해야 하는 스크립트 양이 최소화되어 페이지 로드 시간이 빨라진다.

대표적인 모듈번들러인 webpack, Parcel 등은 번들을 dynamic import 를 사용하여 번들을 나눌수 있도록한다. 예를 들어 아래의 코드를 보면, `someFunction` 함수는 form이 제출될때 실행된다.

```jsx
import moduleA from "library";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  someFunction();
});

const someFunction = () => {
  // use moduleA
};
```

`somefunction` 은 moduleA를 import 해와서 사용한다. 만약 이 모듈을 다른 곳에서 사용하지 않는 경우, dynamic import 를 사용하여 form 을 제출할 때만 가져오도록 수정할 수 있다.

```jsx
form.addEventLIstener("submit", (e) => {
  e.preventDefault();
  import("library.moduleA")
    .then((module) => module.default)
    .then(someFunction())
    .catch((err) => {
      alert(err);
    });
});
const someFunction = () => {
  // moduleA
};
```

모듈을 구성하는 코드는 초기 번들에 포함되지 않고 느리게 로드되거나(lazy loaded) 폼 제출 후에 필요할 때만 사용자에게 제공된다. 중요한 부분을 미리 로드하여 우선순위를 정하고 더 빨리 가져옴으로써 페이지 성능을 더욱 향상시킨다.

이렇게 Event 함수 내부에서 import 하여 모듈을 동적으로 가져오는 기능은 제안 단계에 있기 때문에 경고가 나올수 있다. webpack은 이미 이에 대한 지원을 포함했지만 ESLint 설정에서는 이 구문을 포함하도록 업데이트 되지 않았기 때문이다. 그러나 경고가 나오더라도 작동은 한다.

<br/>

## 최적화 및 코드 스플리팅

예시 코드로 코드 스플리팅을 한번 알아보자
3개의 숫자를 정렬하는 간단한 애플리케이션의 성능을 향상시키기 위해 코드를 어떻게 스플리팅 할 수 있을까? 최적화를 시작하기 전에 웹사이트의 성능을 먼저 확인하는 것이 중요하다.
Dev tool의 네트워크 탭에서 캐시를 확인해보면 최적화 전의 size를 체크할 수 있다.

### 최적화

3개의 숫자를 정렬하기 위한 방법으로는 몇가지 방식이 있다.

1. 사용자 custom 정렬방법 작성
2. 내장된 Array.prototype.sort() 방법 사용하기
3. lodash 의 전체 라이브러리 대신 `sortBy` 메서드만 가져온다.
4. 버튼을 클릭할 때만 트리거되는 정렬 코드 다운로드

1,2 번도 좋지만 3,4 번의 방법을 사용한 코드를 작성해보자
우선 `lodash` 라이브러리를 가져올때 특정 활용하려는 메서드만 import 한다.

```jsx
import sortBy from "lodash.sortby";
```

import 한 라이브러리를 코드에 적용한다.

```jsx
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const values = [
    input1.valueAsNumber,
    input2.valueAsNumber,
    input3.valueAsNumber,
  ];
  const sortedValues = sortBy(values);

  results.innerHTML = `
    <h2>
      ${sortedValues}
    </h2>
  `;
});
```

이렇게 코드를 처리한 후에 애플리케이션을 재실행하고 DevTools의 네트워크 탭을 보면 캐시의 사이즈가 확연히 줄어든 것을 볼수 있을 것이다.

<br/>

### 코드 스플리팅

webpack은 오늘날 사용되는 인기있는 모듈번들러 중 하나다. 애플리케이션을 구성하는 모든 js 모듈을 브라우저에서 읽을 수 있는 정적파일로 묶는 역할을 한다.

이 번들러는 2개의 개별적인 덩어리로 나눌 수 있다. 초기 경로를 구성하는 코드를 담당하는 부분, 정렬 코드가 포함된 부분이다. 여기서 두번재 말한 정렬코드가 포함된 보조 청크 코드는 사용자가 버튼을 누를 때만 로드할 수 있다.

최상위 영역에서 가져왔던 lodash.sortby 라이브러리를, 버튼을 눌렀을 때 발생하는 이벤트 리스너 내에서 가져온다.

```jsx
form.addEventListener("submit", (e) => {
  e.prevenetDefault();
  import("lodash.sortby")
    .then((module) => module.default)
    .then(sortInput())
    .catch((err) => {
      alert(err);
    });
});
```

`import()`는 promise를 리턴하고 에러없이 풀렸을 때 선택된 모듈은 분리되어 있었던 위의 2번째 청크를 생성한다. 반환된 promise는 `.then` 구문과 체이닝 되면서 `sortInput`메서드를 가져와서 3개의 숫자를 정렬한다. `.catch()` 는 promise가 에러로 인해 reject 되었을 경우를 핸들링 하기 위함이다.

이벤트 핸들러를 작성한 후 `sortInput` 메서드를 작성해야 한다. 이는 lodash.sortBy 메서드를 반환하는 함수여야 한다.

```jsx
const sortInput = () => {
  return (sortBy) => {
    const values = [
      input1.valueAsNumber,
      input2.valueAsNumber,
      input3.valueAsNumber,
    ];
    const sortedValues = sortBy(values);

    results.innerHTML = `
      <h2>
        ${sortedValues}
      </h2>
    `;
  };
};
```

이렇게 최적화와 코드를 분할을 통한 lazy loading은 애플리케이션의 초기 번들 크기를 줄이는데 매우 유용한 기술이다. 이는 직접적으로 훨씬 더 빠르게 페이지를 로드할 수 있다.

그러나 주의할 몇가지 사항이 있는데,

- lazy loading UI : 특정 코드 모듈을 lazy loading을 할 때 네트워크 연결이 약한 사용자에게 어떤 경험이 될 것인지 고려하는 것이 중요하다. 사용자가 인터렉션을 할 때 매우 큰 덩어리의 코드를 분할하고 로드하면 애플리케이션이 작동을 멈춘것처럼 보일 수 있으므로 일종의 로더를 표시하는 것이 좋다.

- 코드보다 지연 로딩 : 이미지는 애플리케이션의 중요한 부분을 구성할 수 있다. 스크롤 없이 볼수 잇는 부분이나 기기 표시 영역 외부에 있는 항목을 lazy loading하면 웹사이트 속도가 빨라질 수 있다.

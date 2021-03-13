# 17_Strict Mode



## 1. strict mode 란?

```jsx
function yoo () {
	x=10;  }
yoo();

console.log(x); // ?
```

1. yoo 함수 내에서 선언하지 않느 x 변수에 값 10을 할당 ⇒ x변수를 찾아야 x에 값을 할당할 수 있으므로 스코프 체인을 통해 x변수 선언을 검색
2. 먼저 yoo 함수의 스코프에서 x변수 선언을 검색했으나 실패, yoo 함수 컨텍스트의 상위 스코프에서 x 변수의 선언을 검색하지만 존재하지 않으므로 ReferenceError가 발생될것을 예상
3. 그러나 **자바스크립트 엔진은 암묵적으로 전역 객체에 x프로퍼티를 동적 생성**한다. 이때 전역 객체의 x 프로퍼티는 마치 전역 변수처럼 사용할 수 있다. **이러한 현상을 암묵적 전역(implicit global)이라 한다**.

------

- 이처럼 개발자의 의도와는 상관없이 발생한 암묵적 전역은 오류를 발생시키는 원이이 될수 있다. 따라서 반드시 var, let, const 키워드를 사용하여 변수를 선언한 후에 사용해야 한다.
- 오타나 문법 지식의 미비로 인한 실수를 줄이고 안정적인 코드를 생산하기 위해 ES5부터 strict mode(엄격모드)가 추가되었다. strict mode는 자바스크립트 언어의 문법ㅇㄹ 좀더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.
- ES6에서 도입된 클래스와 모듈은 기본적으로 strict mode가 적용된다.
- ESLint 같은 도구를 사용해도 유사한 효과를 얻을 수 있다. 린트 도구는 정적 분석 기능을 통해 소스코드를 실행하기 전에 소스코드를 스캔하여 문법적 오류와 더불어 잠재적 오류까지 찾아내고 그 이유를 리포팅 해준다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d372bdd7-7e7d-42c2-a69f-4261df8d975d/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d372bdd7-7e7d-42c2-a69f-4261df8d975d/Untitled.png)

- 린트 도구는 strict mode가 제한하는 오류는 물론 코딩 컨벤션을 설정 파일 형태로 정의하고 강제할 수 있기 때문에 더욱 강력한 효과가 있다.

## 2. strict mode의 적용

- strict mode를 적용하려면 전역의 선두 또는 함수 몸체의 선두에 'use strict'; 를 추가한다. 전역의 선두에 추가하면 스크립트 전체에 strict mode가 적용된다.

```jsx
'use strict';

function yoo() {
	x = 10; // ReferenceError: x is not defined
}
yoo();
```

- 코드의 선두에 'use strict'; 를 위치시키지 않으면 strict mode 가 제대로 동작하지 않는다.

## 3. 전역에 strict mode를 적용하는 것은 피하자

- 전역에 적용한 strict mode는 스크립트 단위로 적용된다. 다른 스크립트에는 영향을 주지않고 해당 스크립트에 한정되어 적용된다.
- 하지만 strict mode 스크립트와 non-strict mode 스크립트를 혼용하는 것은 오류를 발생시킬 수 있다. 특히 외부 서드파티 라이브러리를 사용하는 경우 전역에 strict mode를 적용하는 것은 바람직하지 않다.
- 이러한 경우, 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode를 적용한다.

```jsx
(function() {
	'use strict';
	.......
}());
```

## 4. 함수 단위로 strict mode를 적용하는 것도 피하자

- 앞에서와 같이 함수단위로 strict mode를 적용할 수 있지만, 일부 함수에만 strict mode를 적용하는 것은 바람직하지 않다. strict mode가 적용된 함수가 참조할 함수 외부의 컨텍스트에 strict mode를 적용하지 않는다면 이또한 문제가 발생할 수 있다.

```jsx
(function () {
  // non-strict mode
  var lеt = 10; // 에러가 발생하지 않는다.

  function foo() {
    'use strict';

    let = 20; // SyntaxError: Unexpected strict mode reserved word
  }
  foo();
}());
```

- 따라서 strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

## 5. strict mode 가 발생시키는 에러

strict mode를 적용했을 때 에러가 발생하는 대표적 사례이다.

### 5.1 암묵적 전역

선언하지 않은 변수를 참조하면 ReferenceError가 발생한다.

```jsx
(function () {
	'use strict';

	x = 1;
	console.log(x); // ReferenceError: x is not defined
}());
```

### 5.2 변수, 함수, 매개변수의 삭제

delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError가 발생한다.

```jsx
(function () {
  'use strict';

  var x = 1;
  delete x;
  // SyntaxError: Delete of an unqualified identifier in strict mode.

  function foo(a) {
    delete a;
    // SyntaxError: Delete of an unqualified identifier in strict mode.
  }
  delete foo;
  // SyntaxError: Delete of an unqualified identifier in strict mode.
}());
```

### 5.3 매개변수 이름의 중복

중복된 매개변수 이름을 사용하면 SyntaxError가 발생한다.

```jsx
(function () {
	'use strict';

//SyntaxError: Duplicate parameter name not allowed in this context
	function yoo (x, x) {
		return x + x;  }
	console.log(yoo(1,2)); 
}());
```

### 5.4 with 문의 사용

with 문을 사용하면 SyntaxError가 발생한다. with 문은 전달된 객체를 스코프 체인에 추가한다. with 문은 동일한 객체의 프로퍼티를 반복해서 사용할 때 객체 이름을 생략할 수 있어서 코드가 간단해지는 효과가 있지만 성능과 가독성이 나빠지는 문제가 있다. 따라서 with문은 사용하지 않는 것이 좋다.

```jsx
(function () {
  'use strict';

  // SyntaxError: Strict mode code may not include a with statement
  with({ x: 1 }) {
    console.log(x);
  }
}());
```

## 6. strict mode 적용에 의한 변화

### 6.1 일반 함수의 this

- strict mode 에서 함수를 일반 함수로서 호출하면 this에 undefined가 바인딩 된다. 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문이다. 이때 에러는 발생하지 않는다.

  ```jsx
  (function () {
  	'use strict';
  	
  	function yoo () {
  		console.log(this); // undefined
  	} 
  	yoo();
  }());
  ```

### 6.2 arguments 객체

- strict mode 에서는 매개변수에 전달된 인수를 재할당하여 변경하여도 arguments 객체에 반영되지 않는다.

  ```jsx
  (function (a) {
  	'use strict';
  	// 매개변수에 전달된 인수를 재할당하여 변경
  	a = 2;
  
  	// 변경된 인수가 arguments 객체에 반영되지 않는다. 
  	console.log(arguments); // {0: 1, length: 1}
  }(1));
  ```
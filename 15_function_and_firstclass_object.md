# 15_function_and_firstclass_object



## 1. 일급 객체

다음과 같은 조건을 만족하는 객체를 일급 객체(first-class object)라 한다.

1. 무명의 리터럴로 생성할 수 있다. = 반드시 할당되어야 한다. 런타임에 생성된다.

2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.

   ```jsx
   // 런타임(할당단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당됨. / 함수는 변수에 저장할 수 있다.
   const increase = function (num) {
   	return ++num; 
   };
   const decrease = function (num) {
   	return --num;
   };
   // 함수는 객체에 저장할 수 있다.
   const pedicates = {increase, decrease}
   ```

3. 함수의 매개변수에게 전달할 수 있다.

4. 함수의 반환값으로 사용할 수 있다.

   ```jsx
   function makeCounter (predicate) {
   	let num = 0;
   	return function () {
   		num = predicate(num);
   		return num;
   	};
   }
   
   const increaser = makeCounter(predicates.increase);
   console.log(increaser()); // 1
   console.log(increaser()); // 2
   
   const decreaser = makeCounter(predicates.decrease);
   console.log(decreaser()); // -1
   console.log(decreaser()); // -2
   ```

   - 함수가 일급 객체라는 것은 함수를 객체와 동일하게 사용할 수 있다는 의미다. 객체는 값이므로 함수는 값과 동일하게 취급할 수 있다. 따라서 함수는 값을 사용할 수 있는 곳(변수 할당문, 객체의 프로퍼티 값, 배열의 요소, 함수 호출의 인수, 함수 반환문)이라면 어디서든지 리터럴로 정의할 수 있으며, 런타임에 함수 객체로 평가 된다.
   - **일급 객체로서 함수가 가지는 가장 큰 특징은 일반 객체와 같이 함수의 매개변수에 전달할 수 있으며, 함수의 반환값으로 사용할 수도 있다는 것**이다. 이는 자바스크립트의 장점 중의 하나다.
   - 함수는 객체이지만 일반 객체와는 차이가 있다. 일반 객체가 아닌 함수객체는 호출할 수 있다. 또한 함수 객체는 일반 객체에 없는 함수 고유의 프로퍼티를 소유한다.



## 2. 함수 객체의 프로퍼티

- 함수는 객체이다. 따라서 함수도 프로퍼티를 가질 수 있다.  브라우저 콘솔에서 console.dir 메서드를 사용하여 함수 객체의 내부를 들여다보면 다음과 같다.

  ```jsx
  function square(number) {
  	return number * number;
  }
  console.dir(square);
  ```

  ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/df1e5e76-af20-4680-b6ec-70a647403546/__.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/df1e5e76-af20-4680-b6ec-70a647403546/__.png)

  ```jsx
  console.log(Object.getOwnPropertyDescriptor(square, '__proto__')); // undefined
  ```

  - 위에서 **proto** 는 square 함수의 프로퍼티가 아니다. __proto__는 Object.prototype 객체의 접근자 프로퍼티다.  따라서 square 함수는 Object.prototype 객체로부터 __proto__접근자 프로퍼티를 상속받는다.

  ```jsx
  console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
  // {get: ƒ, set: ƒ, enumerable: false, configurable: true}
  ```

  - 이처럼 위의 arguments, caller, length, name, prototype 프로퍼티는 모두 함수 객체의 데이터 프로퍼티다. 이는 함수 객체 고유의 프로퍼티다. 하지만 __proto__는 접근 자 프로퍼티이며, 함수 객체 고유의 프로퍼티가 아니라 Object.prototype 객체의 프로퍼티를 상속받은 것이다.
  - 즉,  Object.prototype 객체의 **proto** 접근자 프로퍼티는 모든 객체가 사용할 수 있다.

### 2.1 arguments 프로퍼티

- 함수 객체의 arguments 프로퍼티 값은 arguments 객체다. arguments 객체는 함수 호출시 전달된 인수(arguments)들의 정보를 담고 있는 순회 가능한(iterable) 유사 배열 객체이며, 함수 내부에서 지역 변수처럼 사용된다. 즉, 함수 외부에서는 참조할 수 없다.

  - arguments 프로퍼티는 현재 일부 브라우저에서 지원하고 있지만 ES3부터 표준에서 폐지되었다. 따라서 Function.arguments와 같은 사용법은 권장되지 않으며 함수 내부에서 지역변수처럼 사용할 수 있는 arguments 객체를 참조하도록 한다.

- 자바스크립트는 함수의 매개변수와 인수의 개수가 일치하는지 확인하지 않는다.

  ```jsx
  function multiply(x, y) {
  	console.log (arguments);
  	return x*y; }
  
  console.log(multiply());        // NaN
  console.log(multiply(1));       // NaN
  console.log(multiply(1, 2));    // 2
  console.log(multiply(1, 2, 3)); // 2
  ```

- 함수를 정의할 때 선언한 매개변수는 함수 몸체 내부에서 변수와 동일하게 취급된다.  즉, 함수가 호출되면 함수 몸체 내에서 암묵적으로 매개변수가 선언되고 undefined로 초기화된 이후 인수가 할당된다.

- 선언된 매개변수의 개수보다 인수를 적게 전달하면 매개변수는 undefined 상태를 유지하고, 매개변수의 개수보다 인수를 더 많이 전달한 경우 초과된 인수는 무시되고 순서대로 매개변수에 전달된다.

- 이때 초과된 인수는 그냥 버려지는 것이 아니라, 암묵적으로 arguments 객체의 프로퍼티로 보관된다. arguments 객체는 인수를 프로퍼팅 값으로 소유하며 프로퍼티 키는 인수의 순서를 나타낸다.

- 선언된 매개변수의 개수와 인수의 개수를 확인하지 않는 자바스크립트의 특성 때문에 함수가 호출되면 인수 개수를 확인하고 이에 따라 함수의 동작을 달리 정의할 필요가 있을 수 있다.

- **arguments 객체는 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다. arguments 객체는 length 프로퍼티가 있는 유사배열 객체이므로 for 문으로 순회할 수 있다.**

  ```jsx
  function sum () {
  	let res = 0;
  	for (let i = 0; i <arguments.length; i++) {
  		res += arguments[i];
  	}
  	return res;
  }
  
  console.log(sum());       // 0
  console.log(sum(1,2));    // 3
  console.log(sum(1,2,3));  // 6
  ```

- 유사 배열 객체는 배열이 아니므로 배열 메서드를 사용할 경우 에러가 발생한다.

- ES6 Rest 파라미터의 도입으로 모던 자바스크립트에서는 Rest 파라미터를 도입했다. arguments 객체의 중요성이 이전 같지는 않지만 언제나 ES6만 사용하지 않을수 있기 때문에 다른 방법도 알아두어야 한다.

### 2.2 caller 프로퍼티

- caller 프로퍼티는 ECMAScript 사양에 포함되지 않은 비표준 프로퍼티다. 이후 표준화될 예정도 없는 프로퍼티이므로 사용하지는 말고 알아만두는 것이 좋다.

- caller 프로퍼티는 함수 자신을 호출한 함수를 가리킨다.

  ```jsx
  function foo(func) {
  	return func();
  }
  function bar() {
  	return 'caller: ' + bar.caller;
  }
  // 브라우저에서 실행한 결과
  console.log(foo(bar)); / caller : function foo(func) {...}
  console.log(bar());    // caller : null
  ```

- bar 함수를 foo 함수 내에서 호출했다. 이때 bar 함수의 caller 프로퍼티는 bar 함수를 호출한 foo 함수를 가리킨다. 함수호출 bar()의 경우, bar 함수를 호출한 함수는 없다.  따라서 caller 프로퍼티는 null을 가리킨다.

- 위의 결과는 브라우저에서 실행한 결과로 Node.js 환경에서는 다른 결과가 나온다.

### 2.3 length 프로퍼티

- 함수 객체의 length 프로퍼티는 함수를 정의할 때 선언한 매개변수의 개수를 가리킨다.

  ```jsx
  function foo() {} 
  console.log(foo.length); // 0
  
  function bar (x) {
  	return x; }
  console.log(bar.length); // 1
  
  function baz(x, y) {
  	return x*y; }
  console.log (baz.length); // 2
  ```

- arguments 객체의 length 프로퍼티와 함수 객체의 length 프로퍼티의 값은 다를 수 있으므로 주의해야 한다. arguments 객체의 length 프로퍼티는 인자(argument)의 개수를 가리키고, 함수 객체의 length 프로퍼티는 매개변수의 개수를 가리킨다.

### 2.4 name프로퍼티

- 함수 객체의 name  프로퍼티는 함수 이름을 나타낸다. name은 ES6에서 정식 표준이 되었다.

- name 프로퍼티는 ES5와 ES6에서 동작을 달리하므로 주의해야 한다. 익명함수 표현식의 경우 ES5에서 name 프로퍼티는 빈 문자열을 값으로 갖는다. 하지만 ES6에서는 함수 객체를 가리키는 식별자를 값으로 갖는다.

  ```jsx
  // 기명 함수 표현식
  var namedFunc = function foo() {};
  console.log(namedFunc.name); // foo
  
  // 익명 함수 표현식
  var anonymousFunc = function() {};
  // ES5: name 프로퍼티는 빈 문자열을 값으로 갖는다.
  // ES6: name 프로퍼티는 함수 객체를 가리키는 변수 이름을 값으로 갖는다.
  console.log(anonymousFunc.name); // anonymousFunc
  
  // 함수 선언문(Function declaration)
  function bar() {}
  console.log(bar.name); // bar
  ```

- 함수 이름과 함수 객체를 가리키는 식별자는 의미가 다르다. 함수를 호출할 때는 함수 이름이 아닌 함수 객체를 가리키는 식별자로 호출한다.

### 2.5 **proto** 접근자 프로퍼티

- 모든 객체는  [[Prototype]]이라는 내부 슬롯을 갖는다. 이 내부 슬롯은 객체 지향 프로그래밍의 상속을 구현하는 프로토타입 객체를 가리킨다.

- __proto__프로퍼티는 [[prototype]] 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티다. 내부 슬롯에는 직접 접근할 수 없고 간접적인 접근 방법을 제공하는 경우에 한하여 접근할 수 있다. [[Prototype]] 내부 슬롯에도 직접 접근할 수 없으며 __proto__접근자 프로퍼티를 통해 간접적으로 프로토타입 객체에 접근할 수 있다.

  ```jsx
  const obj = { a: 1 };
  
  // 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype이다.
  console.log(obj.__proto__ === Object.prototype); // true
  
  // 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받는다.
  // hasOwnProperty 메서드는 Object.prototype의 메서드다.
  console.log(obj.hasOwnProperty('a'));         // true
  console.log(obj.hasOwnProperty('__proto__')); // false
  ```

  - hasOwnProperty 메서드는 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 true를 반환하고 상속받은 프로토타입의 프로퍼티 키인 경우 false를 반환한다.

### 2.6 prototype 프로퍼티

- prototype 프로퍼티는 생성자 함수로 호출할 수 있는 함수 객체, 즉 constructor만이 소유하는 프로퍼티다. 일반객체와 생성자 함수로 호출할 수 없는 non-constructor에는 prototype 프로퍼티가 없다.

  ```jsx
  // 함수 객체는 prototype 프로퍼티를 소유한다.
  (function () {}).hasOwnProperty('prototype'); // -> true
  
  // 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
  ({}).hasOwnProperty('prototype'); // -> false
  ```

- prototype 프로퍼티는 함수가 객체를 생성하는 생성자 함수로 호출될 때 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.
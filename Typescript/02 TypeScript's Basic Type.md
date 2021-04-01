# 02. Basic Type

[TOC]

- type: 값과 값으로 할 수 있는 일의 집합
- 타입스크립트에는 자바스크립트의 원시 타입인 Boolean, number, string 을 포함하여 그외의 타입들도 존재한다.



## 1. 타입스크립트의 기본 타입

- 타입스크립트는 자바스크립트의 7개(원시타입(number, string, boolean, undefined, null, symbol), 객체타입)  기본타입을 모두 지원한다.
- 위의 7개 타입외에도 타입스크립트가 지원하는 타입이 있다.



### 1.1 Number (숫자)

- number 타입은 모든 숫자(정수, 소수, 양수, 음수, Infinity, NaN 등)이 있다.

  16진수, 10진수 리터럴에 더불어 2진수, 8진수 리터럴도 지원한다.

- bigint는 새로 추가된 타입으로 이를 이용하면 에러 걱정 없이 큰 정수를 처리할 수 있다. 그러나 일부 Js 엔진은 bigint를 지원하지 않는다.



### 1.2 String (문자열)

- 모든 문자열의 집합으로, 따옴표(")나 작은따옴표(')를 문자열 데이터를 감싸는데 사용한다.
- 템플릿 문자열(`) 을 사용하면 표현식을 포함시킬 수도 있고. 여러줄에 걸쳐 문자열을 작성할 수 있다.



### 1.3 boolean (불리언)

- true와 false 의 두개의 값을 갖는다. 비교연산과 반전 연산만을 할 수 있다.
- var 또는 let으로 타입을 선언하면 타입스크립트가 자동으로 변수의 타입을 리터럴로 추론한다. 그러나 const를 사용하면 타입스크립트는 그 변숭의 값이 절대 변하지 않으리라는 사실을 알게 되어 해당 변수가 가질 수 있는 가장 좁은 타입으로 추론한다.  (이는 number, string, boolean 등의 기본타입에도 마찬가지로 동작한다.)



### 1.4 Object (객체)

- 타입스크립트의 객체타입은 객체의 형태를 정의한다. TS에서 객체를 서술하는데 타입을 이용하는 방식은 여러가지다.

1. 값을 Object로 선언하기 ⇒ 서술하는 값에 관한 정보를 주지 않고 값 자체가   객체라고 말해줄 뿐이다. ( any보다 조금 더 좁은 타입)

   ```jsx
   let a: object= { b: 'x' }  // 명시적으로 정의
   a.b  // Error => 프로퍼티에 접근할 수 없음.
   ```

2. 객체 리터럴 문법

   - TS가 형태를 읽고 객체로 추론 or  중괄호{} 안에서 명시적인 타입 정의

   ```jsx
   let a = { 
   	b: 'x'
   }   // {b: string}
   a.b // string
   ```

- 객체 리터럴과 클래스 인스턴스는 모두 객체 리터럴 형태를 만족하므로 TS는 두가지 모두로 추론할 수 있다.

- 객체의 경우, 기본타입(boolean, number, string, symbol)과 달리 객체를 const로 선언해도 타입스크립트는 더 좁은 타입으로 추론하지 않는다.

  ```jsx
  var aaa = false;  // boolean
  let bbb = true;   // boolean
  const ccc = true; // true
  ```

- 기본적으로 타입스크립트는 객체 프로퍼티에 있어서 엄격하다.

  예를 들어 객체 test에 number 타입의 a라는 프로퍼티가 있어야 한다고 정의하면, 타입스크립트는 오직 a만 기대한다. a가 없거나 다른 프로퍼티가 있으면 에러를 발생시킨다.

  ```jsx
  let test:{a: number}
  test = {}     // Error: a 프로퍼티가 없음
  test = { b:1 } // Error: {b: number}을 타입에 할당할 수 없음
  ```

- 그럼 어떤 프로퍼티는 선택형이고 에정에 없던 프로퍼티가 추가될 수 있다는걸 표현할 수 있을까?

  ```jsx
  let a: {
  	b: number
  	c?: string
  	[key: number]: boolean
  }
  ```

  위의 코드처럼 c 프로퍼티는 존재하지 않을 수도, 추가될수도 있다는 것을 `?` 을 사용하여 나타낼 수 있다. 또한 객체 a는 boolean타입의 값을 갖는 number타입의 프로퍼티를 여러개 포함할 수 있다.

- 객체 타입을 정의할 때 필요하다면 readonly 한정자를 이용해 특정 필드를 읽기 전용으로 정의할 수 있다. readonly를 사용하면 객체 프로퍼티에 const를 적용한듯한 효과를 낸다.



### 1.5 Any

- 타입스크립트에서는 컴파일 타임에 타입이 있어야 한다.

- 그러나 애플리케이션을 만들면서 알지못하는 타입을 표현해야 할 수도 있다. 이 때 `any` 타입을 사용할 수 있다.

- 또한, 타입의 일부만 알고 전체는 알지 못할 때 any 타입이 유용하다.

  ```jsx
  let dontknowtype: any = 5;
  dontknowtype = 'maybe string type';
  dontknowtype = false;
  
  let list: any[] = [1, true, 'free'];
  list[1] = 1;
  ```

- 즉 any 타입은 모든 타입의 상위 타입이다. 그러나 any 를 사용하면 타입 검사기의 효과가 적어지기 때문에 꼭 필요한 상황에만 사용해야 한다.



### 1.6 Unknown

- 타입을 미리 알 수 없는 어떤 값이 있을 때는 any 대신 unknown을 사용하는 것이 더 좋다. unknown도 any처럼 모든 값을 대표하는 상위타입이지만, unknown의 타입을 검사하여 타입이 정해질때까지 unknown의 값을 사용할 수 없게 강제한다.

  ```jsx
  let a: unknown = 30 // unknown
  let b = a === 123  // boolean
  let c = a + 10     // Error : 객체 타입이 unknown 이다.
  ```



### 1.7 Null and Undefined

- 자바스크립트는 null, undefined 두가지 값으로 부재를 표현하는데, 타입스크립트 또한 그러하다.
- null 과 undefined 는 다른 모든 타입의 하위 타입이다.
- 이 두가지는 혼용되지만 사실 의미는 조금 다르다. undefined는 아직 정의하지 않았음을 의미하는 반면, null은 값이 없다는 의미다.



### 1.8 Void and Never

- 이들은 존재하지 않음의 특징을 세밀하게 분류하는 특수한 용도의 타입이다.

- void는 명시적으로 아무것도 반환하지 않는 함수의 반환타입(ex: console.log) 를 말하며, any의 반대타입이라고 말할 수 있다.

- never은 절대 반환하지 않는(예외를 던지거나 영원히 실행되는) 함수 타입을 가리킨다. 함수 표현식이나 화살표 함수 표현식에서 항상 오류를 발생시키거나 절대 반환하지 않는 반환타입으로 쓰인다.

- never은 모든 타입의 서브타입으로 모든 타입에 never을 할당할 수 있으며, 어디서든 안전하게 사용할 수 있다.

  ```jsx
  // void 타입의 예제
  function warnUser(): void {
      console.log("This is my warning message");
  }
  
  // never 타입의 예제 
  function error(message: string): never {
      throw new Error(message);
  }
  ```
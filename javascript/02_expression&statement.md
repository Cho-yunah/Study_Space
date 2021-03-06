# 표현식과 문



## 1. 값

- **값(value)은 식이 평가 되어 생성된 결과**를 말한다. 평가는 식을 해석해서 값을 생성하거나 참조하는 것을 의미한다.
- 변수= 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 (또는 그 공간을 식별하기 위해 붙인 이름)이다.
- 따라서 **변수에 할당되어 저장되는 것은 값**이다.
- 기본적으로 값에 저장될 수 있는 것

```jsx
var 변수A = 데이터;
var 변수B = 변수 A;
var 변수C = 변수 A + 데이터 + 변수 B;
```





## 2. 변수에 저장할 수 있는 값 - 데이터 타입

1. 숫자형 (Number) : 정수와 실수 값을 구분하지 않음.  ex) var age= 30; var weigt=50.25;
2. 문자형 (String) : 작은/큰 따옴표 쌍으로 문자열을 둘러싸서 표현  ex) var name="yuna";
3. 논리형 (Boolean) : 참(true)/거짓(false)의 값으로 표현  ex) var isLogin=false;
4. null : 값이 아직 없다는 의미.   ex) var class= null;
5. undefined : 변수는 선언되었으나 값이 할당된 적이 없는 상태를 의미  ex) var username;  //기본값 undefined
6. 함수 (function) : 객체 프로퍼티에 할당될 수 있는 실행 가능한 코드를 가짐
7. 객체 (object) : 이름이 붙은 값들의 모임





## 3. 변수값이 읽혀지는 경우

###    3.1 우측에 변수를 두는 경우

→ 우측에 변수를 두면 변수 자체가 넘어가는 것이 아니라 변수 안에 들어 있는 데이터가 복사되어 좌측 변수에 저장됨.

→ 변수 안에 들어 있는 데이터 중 숫자, 문자, 논리 데이터만이 복사된다.

```jsx
 **변수 A = 변수 B(우측에 위치)**

ex) var name = "yuna";
    var temp = name;
--> name 변수에 들어있는 값이 복사돼 temp 변수에 대입됨.
```

###     3.2 연산자와 함께 사용하는 경우

```jsx
  **변수 A = 변수 B 연산자 변수 C;**

ex) var num1= 10;
    var num2 = 20;
    var result = num1+num2;
    alert(result);
 --> var result = 10 + 20 으로 변경되어 계산된다.
```

###    3.3 함수 호출시 변수를 매개변수(파라미터) 값으로 사용하는 경우

→ 함수 호출과 함께 변수를 사용하는 경우에도 값이 복사되어 매개변수로 넘어간다.

```jsx
  **함수(변수A);**

ex) function test(userName) {alert ("userName = "+userName);}
    var name = "yuna";
    test(name);
 --> test(name); 을 호출하면 test("yuna")로 변경된다.
```





## 4. 리터럴

- 리터럴(Literal) : 프로그램 코드 상에 **데이터 값을 표현하는 방식**으로, **사람이 이해할 수 있는 문자 또는 약속된 기호를 사용**해 값을 생성하는 표기방식을 말한다.
- 즉, 리터럴은 값을 생성하기 위해 미리 약속한 표기법이다.
- 위 항목 2번에서 언급한 데이터 타입이 리터럴을 사용하는 예이다.



## 5. 표현식 (expression)

- **표현식은 자바스크립트 엔진에 의해 값으로 평가되는 구문(statement)**이다. **표현식이 평가되면 새로운 값을 생성하거나 기존 값을 참조**한다.
- 가장 간단한 형태의 표현식은 '기본 표현식'으로, 다른 표현식을 포함하지 않은 독립적 표현식이다. 자바스크립트에서 기본 표현식은 상수나 리터럴 값, 연산자, 변수 참조를 말한다.
- 즉, 값으로 평가되는 문(statement)은 모두 표현식이다.



## 6. 문

- **문(statement)은 프로그램을 구성하는 기본 단위이자 최소 실행 단위**이다. 문의 집합으로 이루어진 것이 프로그램이며, 문을작성하고 순성에 맞게 나열하는 것이 프로그래밍이다.
- **문은 여러 토큰으로 구성**된다. 토큰(token)이란 문법적인 의미를 가지며, 문법적으로 더 이상 나눌수 없는 코드의 기본 요소를 의미한다.

![](C:\Users\Windows\Pictures\Saved Pictures\토큰.png)

- 문을 명령문이라고도 부른다. 즉, 문은 컴퓨터에 내리는 명령이다.
- 문은 선언문, 할당문, 조건문, 반복문 등으로 구분할 수 있다. 이 각각의 문은 이름처럼 동작한다.

```jsx
1. var x;             // 변수 선언문 --> 변수를 선언함
2. x = 5;             // 표현식 문(할당문) --> 값이 할당됨
3. function foo () {} // 함수 선언문 --> 함수를 선언함
4. if(x > 1) { console.log(x);} // 조건문--> 지정한 조건에 따라 코드블록 결정되어 실행
5. for (var i =0; i <2; i++) {console.log(i);} // 반복문--> 특정 코드블록이 반복 실행
```



## 7. 세미콜론과 세미콜론 자동 삽입 기능

- **세미콜론(;)은 문의 종료를 나타낸다**. 문을 끝낼 때는 세미콜론을 붙여야 한다.  즉, 자바스크립트 엔진은 세미콜론으로 문이 종료한 위치를 파악하고 순차적으로 하나씩 문을 실행한다.
- 단, 0개 이상의 **문을 중괄호로 묶은 코드 블록 ({...}) 뒤에는 세미콜론을 붙이지 않는다.** 예를 들어 if문, for문, 함수 등의 코드 블록 뒤에는 세미 콜론을 붙이지 않는다. 이러한 **코드 블록은 언제나 문의 종료를 의미하는 자체 종결성을 갖기** 때문이다.

```jsx
var bar = function () {}
(function() {})();
```

- **문의 끝에 붙이는 세미콜론은 생략 가능**하다. 이는 자바스크립트 엔진의 세미콜론 자동 삽입 기능이 암묵적으로 수행되기 때문이다.



## 8. 표현식인 문과 표현식이 아닌 문

- **표현식인 문→ 값으로 평가됨 / 표현식이 아닌 문 → 값으로 평가될 수 없음**
- 표현식인 문과 표현식이 아닌 **문을 구별하는 가장 간단하고 명료한 방법은 변수에 할당**해 보는 것이다. 표현식인 문은 값으로 평가 되므로 변수에 할당할 수 있다.

```jsx
var x  // 변수 선언문은 표현식이 아닌 문이다.
x = 100; // 할당문은 그 자체가 표현식이지만 완전한 문이기도 하다. 
```

- 표현식인 문은 값처럼 사용할 수 있지만, 표현식이 아닌 문은 값처럼 사용할 수 없다.

```jsx
ex1) var foo = x = 100;
      console.log(foo); //100
ex2) var foo = var x;  // SyntaxError: Unexpected token var
```

- 완료값 (completion value) - 크롬 개발자 도구에서 표현식이 아닌 문을 실행하면 언제나 undefined 를 출력한다. 완료 값은 표현식의 평가 결과가 아니기 때문에, 다른 값과 같이 변수에 할당할 수도 없고 참조할 수도 없다.
# 16_Prototype



*자바스크립트 명령형(imperative), 함수형(functional), 프로토타입 기반(prototype-based) 객체 지향 프로그래밍(OOP; Object Oriented Programming)을 지원하는 멀티 패러다임 프로그래밍 언어다.*

- 자바스크립트는 클래스 기반 객체지향 프로그래밍 언어보다 효율적이며 더 강력한 객체지향 프로그래밍 능력을 지니고 있는 프로토 타입 기반의 객체 지향 프로그래밍 언어다. 자바스크립트를 이루고 있는 거의 '모든것'이 객체다.



## 1. 객체 지향 프로그래밍 (Object Oriented Programming, OOP)

- **객체지향 프로그래밍은** 프로그램을 명령어 또는 함수의 목록으로 보는 전통적인 명령형 프로그래밍의 절차지향적 관점에서 벗어나 **여러개의  독립적 단위, 즉 객체의 집합으로 프로그램을 표현하려는 패러다임을 말한다.**
- 객체지향 프로그래밍은 실세계의 실체(사물이나 개념)를 인식하는 철학적 사고를 프로그래밍에 접목하려는 시도에서 시작한다. 실체는 특징이나 성질을 나타내는 속성(attribute/property)을 가지고 있고, 이를 통해 실체를 인식하거나 구별할 수 있다.
- 예를 들면 사람에게는 다양한 속성이 있으나 우리가 구현하려는 프로그램에서는 사람의 '이름'과 '주소'라는 속성에만 관심이 있다고 가정한다. 이처럼 **다양한 속성 중에서 프로그램에 필요한 속성만 간추려 내어 표현하는 것을 추상화(abstraction)라 한다.**
- 이때 프로그래머(subject, 주체)는 이름과 주소 속성으로 표현된 객체(object)인 person을 다른 객체와 구별하여 인식할 수 있다. **이처럼 속성을 통해 여러개의 값을 하나의 단위로 구성한 복합적인 자료구조를 객체**라 한다.

------

- 예를 들어 원이라는 개념을 객체로 만들어 본다. 원의 속성 반지름을 가지고 원의 지름을 구할 수 있다. 이때 반지름은 원의 **상태를 나타내는 데이터**이며 원의 지름을 구하는 것은 **동작**이다.

```jsx
const circle = {
	radius: 5, 
	getDiameter() {
		return 2 * this.radius;
	}
};
console.log(circle); // {radius: 5, getDiameter: f}
console.log(circle.getDiameter()); // 10
```

- 이처럼 **객체지향 프로그래밍은 객체의 상태(state)를 나타내는 데이터와 상태 데이터를 조작할 수 있는 동작(behavior)을 하나의 논리적인 단위로 묶어 생각**한다. 따라서 객체는 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조라고 할 수 있다. **이때 객체의 상태 데이터를 프로퍼티(property), 동작을 메서드(method)라 부른다.**
- 각 객체는 고유의 기능을 수행하면서 다른 객체와 관계성을 가질수 있다. 다른 객체와 메시지를 주고 받거나 데이터를 처리할 수도 있고, 다른 객체의 상태 데이터나 동작을 상속받아 사용하기도 한다.

## 2. 상속과 프로토타입

- **상속(inheritance)은 객체지향 프로그래밍의 핵심 개념으로, 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있다.**
- 자바스크립트는 프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거한다. 중복을 제거하는 방법은 기존의 코드를 적극적으로 재사용하는 것이다.

```jsx
// 생성자 함수
function Circle (radius) {
	this.radius = radius;
	this.getArea = function() {
		return Math.PI * this.radius ** 2;
  };
}
// 반지름이 1 (2)인 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는 getArea 메서드를 각각 생성하고 소유한다. 따라서 getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다. 
console.log(circle1.getArea === circle2.getArea); // false
console.log(circle1.getArea());
console.log(circle2.getArea());
```

- **생성자 함수는 동일한 프로퍼티 구조를 갖는 객체를 여러개 생성할 때 유용하다. 하지만 위 예제의 생성자 함수는 문제가 있는데,,**
- Circle 생성자 함수가 생성하는 모든 객체(인스턴스)는 radius 프로퍼티와 getArea 메서드를 갖는다. getArea 메서드는 모든 인스턴스가 동일한 내용의 메서드를 사용하지만, Circle 생성자 함수는 인슽턴스를 생성할 때마다 getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
- 이처럼 **동일한 생성자 함수에 의해 생성된 모든 인스턴스가 동일한 메서드를 중복생성하고  소유하는 것은 메모리를 불필요하게 낭비**한다. 또한 인스턴스를 생성할 때마다 메서드를 생성하므로 퍼포먼스에 좋지않다. 예를 들어 10개의 인스턴스를 생성하면 내용이 동일한 메서드도 10개 생성된다.
- **이때 상속을 통해 불필요한 중복을 제거할수 있는데, 자바스크립트는 프로토타입(prototype)을 기반으로 상속을 구현**한다.

```jsx
// 생성자 함수
function Circle(radius) {
	this.radius = radius; } 

// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를 공유해 사용할 수 있도록 프로토 타입에 추가한다. 
// 프로토타입은 Circle 생성자함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function () {
	return Math.PI * this.radius ** 2; };

// 반지름이 1 (2)인 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log (circle1.getArea === circle2.getArea); // true

console.log (circle1.getArea());
```

- Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는 프로토타입 Circle.prototype으로부터 getArea 메서드를 상속받는다.
- getArea 메서드는 단하나만 생성되어 프로토타입인 Circle.prototype의 메서드로 할당되어 있다. 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea메서드를 상속받아 공유하여 사용한다.
- **상속은 코드의 재사용이란 관점에서 매우 유용하다. 생성자 함수가 생성할 모든 인스턴스가 공통적으로 사용할 프로퍼티나 메서드를 프로토타입에 미리 구현해 두면 생성자 함수의 모든 인스턴스는 별도의 구현 없이 상위(부모) 객체인 프로토타입의 자산을 공유하여 사용할 수 있다.**



## 3. 프로토타입 객체

- **프로토타입 객체**(=프로토타입)란 객체지향 프로그래밍의 근간을 이루는 **객체간 상속을 구현하기 위해 사용된다.** 프로토타입은 상위 객체의 역할을 하면서 다른 객체에 공유 프로퍼티와 메서드를 제공한다. 프로토 타입을 상속받은 하위(자식) 객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 자유롭게 사용할 수 있다.
- **모든 객체는 [[Prototype]]이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조**다. [[Prototype]]에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다.  **즉, 객체가 생성될 때 객체 생성 방식에 따라 프로토타입이 결정되고 [[Protytype]]에 저장**된다.
- **모든 객체는 하나의 프로토타입을 갖고, 이 모든 프로토타입은 생성자 함수와 연결되어 있다. 즉, 객체와 프로토타입과 생성자 함수는 서로 연결되어 있다**.
- [[Prototype]] 내부 슬롯에는 직접 접근할 수 없지만, 위처럼 **proto** 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 자신의 [[Prototype]] 내부 슬롯이 가리키는 프로토타입에 간접적으로 접근할 수 있다.
- 그리고 **프로토타입은 자신의 construction 프로퍼티를 통해 생성자 함수에 접근할 수 있고, 생성자 함수는 자신의 prototype 프로퍼티를 통해 프로토타입에 접근**할 수 있다.

### 3.1 __proto__접근자 프로퍼티

- **모든 객체는 \**proto\** 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 [[Prototype]] 내부 슬롯에 간접적으로 접근**할 수 있다.

  1. `__proto__`는 접근자 프로퍼티다.

  - **자바스크립트는 원칙적으로 내부 슬롯과 내부 메서드에 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않는다**. **단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하는데, 그 수단이 바로 `__proto__`접근자 프로퍼티다.**
  - 접근자 프로퍼티는 자체적으로는 값([[Value]] 프로퍼티 어트리뷰트)를 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수인 [[Get]], [[Set]] 프로퍼티 어트리뷰트로 구성된 프로퍼티다.

  - Object.prototype의 접근자 프로퍼티인 `__proto__`는 getter/setter 함수를 통해 [[Prototype]] 내부 슬롯의 값, 즉 프로토타입을 취득하거나 할당한다. ( 프로토타입에 접근하면 getter 함수가 호출, 프로토타입을 할당하면 setter 함수가 호출)

  ```jsx
  const obj = {};
  const parent = {x:1};
  
  // getter 함수인 get __proto__가 호출되어 obj 객체 프로토타입 취득
  obj.__proto__; 
  // setter 함수인 set __proto__가 호출되어 obj 객체 프로토타입 교체
  obj.__proto__d= parent;
  console.log(obj.x); // 1
  ```

  1. ***\*proto\** 접근자 프로퍼티는 상속을 통해 사용된다**.

  - ***\*proto\** 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype의 프로퍼티다**. 모든 객체는 상속을 통해 Object.prototype.__proto__접근자 프로퍼티를 사용할수 있다.
  - 모든 객체는 프로토 타입의 계층구조인 프로토타입 체인에 묶여있다. 자바스크립트 엔진은 해당 객체에 접근하려는 프로퍼티가 없으면 `__proto__`접근자 프로퍼티가 가리키는 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적을 검색한다.
  - **프로토타입 체인의 종점, 즉 프로토타입 체인의 최상위 객체는 Object.prototype이면, 이 객체의 프로퍼티와 메서드는 모든 객체에게 상속된다.**

  ```jsx
  const person = {name: 'Cho'};
  
  // person 객체는 __proto__ 프로퍼티를 소유하지 않는다. 
  console.log(person.hasOwnProperty('__proto__')); // false
  
  // 모든 객체는 Object.prototype의 접근자 프로퍼티를 __proto__를 상속받아 사용할 수 있다.
  console.log({}.__proto_ === Object.prototype); // true
  ```

  - Object.prototype :  모든 객체는 프로토타입의 계층 구조인 프로토타입 체인에 묶여있다. 자바스크립트 엔진은 객체의 프로퍼티에 접근할때 해당 객체에 접근하려는 프로퍼티가 없다면 `**proto**` 접근자 프로퍼티가 가리키는 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다.

  1. `__proto__`접근자 프로퍼티를 통해 프로토타입에 접근하는 이유

  - **프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유는 상호참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위함**이다.

  ```jsx
  const parent = {};
  const child = {};
  
  // child의 프로토타입을 parent로 설정
  child.__proto__ = parent;
  
  // parent의 프로토타입을 child로 설정
  parent.__proto__ = child; // TypeError: Cyclic __proto__ value
  ```

  - 위 예제처럼 parent객체를 child 객체의 프로토타입으로 설정한후, child 객체를 parent 객체의 프로토타입으로 설정했다. 이런 코드가 에러없이 정상적으로 처리되면 서로가 자신의 프로토타입이 되는 비정상적인 프로토타입 체인이 만들어지기 때문에 에러를 발생시킨다.
  - **프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다**. 즉. 프로퍼티 검색 방향이 한쪽 방향으로만 흘러가야 한다. 하지만 위와 같은 순환 참조하는 프로토타입 체인이 만들어지면 프로토타입 체인 종점이 존재하지 않기 때문에 프로퍼티를 검색할 때 무한 루프에 빠진다.
  - 따라서 프로토타입을 무조건적으로 교체할 수 없도록 `__proto__`접근자 프로퍼티를 통해 프로토타입에 접근하고 교체하도록 구현되어 있다.

  1. `__proto__`접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다.

  - `__proto__`접근자 프로퍼티는 ES6에서 표준으로 채택되었다.  하지만 코드 내에서 이를 직접 사용하는 것은 권장하지 않는다. 모든 객체가 이를 사용할 수 있는것은 아니기 때문이다.

  - `__proto__`접근자 프로퍼티 대신 프로토타입의 참조를 취득하고 싶은 경우에는  Object.getPrototypeOf 메서드를 사용하고, 프로토 타입을 교체하고 싶은 경우에는 Object.setPrototypeOf 메서드를 사용할 것을 권장한다.

  - Object.getPrototypeOf 를 권장하는 이유는

    1. 가독성

    2. 최신까지 비표준이었음

    3. 체인의 최상위에 위치할 경우 `__proto__`를 상속받아 사용할 수 없음

    4. **proto** 앞에 위치하는 식별자가 객체가 아닐경우 문제가 생긴다

       -> 즉 Object.prototype 의 프로퍼티를 상속받아 사용할 수 없음

  ```jsx
  // obj는 프로토타입 체인의 종점이다. 따라서 Object.__proto__를 상속받을 수 없다.
  const obj = Object.creat (null);
  
  // obj는 Object.__proto__를 상속받을수 없다. 
  console.log(obj.__proto__); // undefined
  
  // 따라서 Object.getPrototypeOf 메서드를 사용하는 편이 좋다.
  console.log(Object.getPrototypeOf(obj)); //null
  ```

### 3.2 함수 객체의 prototype 프로퍼티

- **함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.**

```jsx
// 함수 객체는 prototype 프로퍼티를 소유한다.
(function () {}).hasOwnProperty('prototype'); // true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({ }).hasOwnProperty('prototype'); // false
```

- 생성자 함수로서 호출할수 없는 함수, **즉 non-constructor 인 화살표 함수와 ES6메서드 축약표현으로 정의한 메서드는 prototype 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않는다.**

- **모든 객체가 가지고 있는 (=Object.prototype으로부터 상속받은) __proto__접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리킨다.**

- 하지만 이들 프로퍼티를 사용하는 주체가 다르다.

  ```jsx
  // 생성자 함수
  function Person(name) {
  	this.name = name; }
  
  const me = new Person ('Cho');
  
  // 결국 Person.prototype 과 me.__proto__는 결국 동일한 프로토타입을 가리킨다.
  console.log(Person.prototype === me.__proto__); // true
  ```



### 3.3 프로토타입의 constructor 프로퍼티와 생성자 함수

- **모든 프로토타입은 constructor 프로퍼티를 갖는다. 이 constructor 프로퍼티는 prototype 프로퍼티로 자신을 자신을 참조하고 있는 생성자 함수를 가리킨다.**

```jsx
// 생성자 함수
function Person(name) {
	this.name = name; }

const me = new Person ('Cho');

// me 객체의 생성자 함수는 Person이다. 
console.log(me.construnctor === Person); // true
```

위 예제에서 **Person 생성자 함수는 me 객체를 생성했다. 이때 me 객체는 프로토타입의 constructor 프로퍼티를 통해 생성자 함수와 연결된다.**

me 객체에는 constructor 프로퍼티가 없지만 me 객체의 프로토타입인 Person.prototype에는 construnctor 프로퍼티가 있다. 따라서 me 객체는 Person.prototype의 constructor 프로퍼티를 상속받아 사용할 수 있다.



## 4. 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토 타입

- 생성자 함수에 의해 생성된 인스턴스는 프로토타입의 constructor 프로퍼티에 의해 생성자 함수와 연결된다. 이때 constructor 프로퍼티가 가리키는 생성자 함수는 인스턴스를 생성한 생성자 함수이다.

  ```jsx
  // obj 객체를 생성한 생성자 함수는 Object다.
  const obj = new Object ();
  console.log(obj.constructor === Object);  // true
  
  // add 함수 객체를 생성한 생성자 함수는 Function 이다.
  const add = new Function ('a', 'b', 'return a+b');
  console.log(add.constructor === Function);  // true
  
  // 생성자 함수
  Function Person(name) {
  	this.name = name;  }
  
  // me 객체를 생성한 생성자 함수는 Person이다.
  const me = new Perso('Cho');
  console.log(me.constructor === Person); //  true
  ```

- 리터럴 표기법에 의한 객체 생성 방식과 같이 명시적으로 new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하지 않는 객체 생성 방식도 있다.

  ```jsx
  // 객체 리터럴 
  const obj = {};
  
  // 함수 리터럴 
  const add = function (a, b) {return a + b; };
  
  // 배열 리터럴 
  const arr = [1,2,3];
  
  // 정규표현식 리터럴
  const regexp = /is/ig;
  ```

- 리터럴 표기법에 의해 생성된 객체도 물론 프로토타입이 존재한다. 하지만 리터럴 표기법에 의해 생성된 객체의 경우 프로토 타입의 constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수는 없다.

  ```jsx
  // obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴로 생성했다.
  const obj = {};
  
  // 하지만 obj 객체의 생성자 함수는 Object 생성자 함수다.
  console.log(obj.constructor === Object); // true
  ```

- 리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하다. 프로토타입은 생성자 함수와 더불어 생성되며 prototyp, constructor 프로퍼티에 의해 연결되어 있기 때문이다. 즉, 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재한다.

  

## 5. 프로토타입의 생성 시점

- **프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.** 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재하기 때문이다.

- 생성자 함수는 사용자가 직접 정의한 사용자 정의 생성자 함수와 자바스크립트가 기본 제공하는 빌트인 생성자 함수로 구분할 수 있다.

  

  ### 5.1 사용자 정의 생성자 함수와 프로토타입 생성 시점

  - [[Construct]]를 갖는 함수 객체, 즉 화살표 함수나 ES6의 메서드 축약표현으로 정의하지 않고 일반 함수(함수 선언문, 함수 표현식)으로 정의한 함수객체는 new 연산자와 함께 생성자 함수로서 호출할 수 있다.
  - **생성자 함수로서 호출할 수 있는 함수, 즉 constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.**

  ```jsx
  console.log(Person.prototype); // {constructor: f}
  
  function Person(name) {
  	this.name = name; }
  ```

  - 생성자 함수로서 호출할 수 없는 함수, 즉 non-constructor는 프로토타입이 생성되지 않는다.

  ```jsx
  const Person = name => {
  	this.name = name; };
  
  console.log(Person.prototype); //undefined
  ```

  - 함수 선언문으로 정의된 Person 생성자 함수는 어떤 코드보다 먼저 평가되어 함수 객체가 된다. 이때 프로토타입이 더불어 생성되면서, Person 생성자 함수의 prototype 프로퍼티에 바인딩된다.

  - **생성된 프로토타입은 오직 constructor 프로퍼티만을 갖는 객체**다. 프로토타입도 객체고 **모든 객체는 프로토 타입을 가지므로 프로토타입도 자신의 프로토타입을 갖는다. 생성된 프로토타입의 프로토타입은 Object.prototype이다.**

    

  ### 5.2 빌트인 생성자 함수와 프로토타입 생성 시점

  - 빌트인 생성자 함수도 일반 함수와 마찬가지로 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성된다. **모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성되고, 이때 생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩된다.**
  - 전역 객체(global object) :  전역 객체는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 생성되는 특수한 객체이다. **전역 객체는 브라우저에서는 window, Node.js 환경에서는 global 객체를 의미한다.**  전역 객체는 표준 빌트인 객체들과 함께 환경에 따른 호스트 객체(web API), 그리고 var 키워드로 선언한 전역 변수와 전역 함수를 프로퍼티로 갖는다.

  ```jsx
  window.Object === Object // true
  // 전역 객체 window는 브라우저에 종속적이므로 이 코드는 브라우저 환경에서 실행해야 한다. 빌트인 객체인 Object는 전역 객체 window의 프로퍼티다. 
  ```

  - 이처럼 객체가 생성되기 이전에 생성자 함수와 프로토타입은 이미 객체화되어 존재한다. **이후 생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 [[Prototype]]내부 슬롯에 할당된다.**
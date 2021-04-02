# 18. this

[TOC]

## 1. this 키워드 탄생 배경

- 객체는 상태(state)를 나타내는 프로퍼티와 동작을 나타내는 메서드를 하나의 논리적인 단위로 묶은 복합적인 자료구조다.

- 메서드는 객체 프로퍼티에 할당된 함수를 말한다. 이렇게 동작을 나타내는 메서드는 자신이 속한 객체의 상태, 즉 프로퍼티를 참조하고 변경할 수 있어야 한다.

- 메서드가 자신이 속한 객체의 프로퍼티를 참조하려면 먼저 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야한다.

- 이때 메서드 내부에서 `this` 키워드를 사용하면 객체에 접근할 수 있다.

  ```jsx
  let userInfo = {
    name: 'yuna',
    greeting() {
      console.log(`Hello, ${this.name}!!`);
    },
  };
  userInfo.greeting();
  ```

  - 물론 this를 사용하지 않고 객체에 접근할 방법은 있다. 그러나 사용 패턴이 복잡해질수록 this라는 키워드 없이는 코드의 가독성이 더 떨어질수도 있다.

  

### 1.1 this를 사용하지 않는다면

- `this` 를 사용하지 않으면, 익명함수나 생성자 함수의 경우에는 자기 자신을 참조하는 것이 곤란해질수도 있다. 그에 대한 예시는 아래와 같다.

```jsx
// 일반 함수 선언문
function test () {
	test.count = 5; //'test'는 자기자신을 가리킨다.(함수명이 Reference)
}

// 비동기 **익명함수**
setTimeout (function() {
	......?        **// 익명 함수는 자기자신을 가리킬 방법이 없다.**
},1000)

// **생성자 함수** 
function Circle(radius) 
		???.radius = radius;
};
Circle.prototype.getdiameter = function () {
		return 2 * ????.radius;   
**// 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알수없다**
};
const circle = new circle(5);
```

- 생성자 함수 내부에서는 프로퍼티나 메서드를 추가하려면 자신이 생성할 인스턴스를 참조할 수 있어야 한다. 하지만 생성자 함수에 의한 객체 생성 방식은 먼저 생성자 함수를 정읳나 이후 new 연산자와 함께 생성자 함수를 호출하는 단계가 추가로 필요하다.



## 2. this 란

- 정리하자면 **this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기참조 변수**다. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.
- this는자바스크립트 엔진에 의해 암묵적으로 생성되며, JS의 `this`는 모든 함수에서 사용할 수 있고 코드 어디서든 참조할 수 있다.
- `this` 값은 작성 시점이 아닌 런타임에 결정되는데, 이 말은 컨텍스트에 따라 this가 가리키는 대상이 달라진다는 것이다. 함수 선언 위치와 상관없이 `this` 바인딩은 어떻게 함수를 호출했느냐에 따라 달라진다.



## 3. this 바인딩

- 동일한 함수라도 다른 객체에서 호출했다면 this가 참조하는 값이 달라진다. **즉 this 바인딩은 함수 호출 방식에 의해 동적으로 결정**된다.

- 함수의 호출방식은 4가지로 나눠서 볼수 있다.

  ⇒ 일반함수 호출, 메서드 호출, 생성자 함수 호출,

  apply/call/bind 메서드에 의한 간접 호출

### 3.1 일반 함수 호출

- **일반 함수로 호출하면 함수 내부의 this에는 전역 객체가 바인딩**된다.

  ```jsx
  function generalFunc() { console.log(this); }
  generalFunc(); // **Object [global]**
  
  var value = 11;
  const obj = {
    value: 100,   // 전역 객체의 프로퍼티가 된다.
    yoo() {
      console.log(this);  // { value: 100, yoo: [Function: yoo] }
      console.log(this.value); // 100
    },
  };
  obj.yoo();
  ```

- 하지만 this는 객체의 프로퍼티나 메서드를 참조하기 위한 자기참조 변수이므로 **객체를 생성하지 않는 일반 함수 에서 this는 의미가 없다.**

- 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 함수 내부의 this에는 동일하게 전역 객체가 바인딩된다. (콜백함수도 동일)

  ```jsx
  const obj = {
  	value: 10,
  	yoo() { 
  		console.log(this)
  		function bar() {
  			console.log(this) // **window**
  		}
  	bar(); // => **일반 함수로 호출함-> this에 전역 객체 바인딩**
  	} 
  };
  obj.yoo();
  ```

- **즉 어떠한 함수라도 일반 함수로 호출되면 this에 전역 객체가 바인딩 된다.**

- 그러나 메서드 내의 중첩함수롸 메서드에게 전달한 콜백함수가 일반함수로 호출될 때 this가 전역 객체를 바인딩 하는 것은 문제가 있다. 중첩함수와 콜백함수는 외부함수를 돕는 헬퍼 함수의 역할을 하는데, 메서드와 헬퍼함수의 this 바인딩이 일치하지 않는다는 것은 헬퍼함수로 동작하기가 어렵게 만든다.

  - 이를 해결하기 위해 자바스크립트는 this를 명시적으로 바인딩할 수 있는 apply, call, bind 메서드를 제공한다.
  - 또는 화살표 함수를 사용해서 this 바인딩을 일치시킬 수도 있다.

  

### 3.2 메서드 호출

- 메서드 내부의  this에는 메서드를호출한 객체, 즉 메서드 이름앞의 마침표(.) 앞에 기술한 객체가 바인딩 된다.

- 주의할 점은 메서드 내부의 this는 메서드를 소유한 객체가 아닌 메서드를 호출한 객체에 바인딩 된다는 것이다.

  ```jsx
  const person = {
  	name: 'Cho',
  	getName() {
  			return this.name;
  	}
  }
  console.log(person.getName()); // Cho
  ```

  - 메서드는 결론적으로 프로퍼티에 바인딩 된 함수다. 즉 위의 person 객체의 name, getName 프로퍼티가 존재하는데, getName 프로퍼티가 가리키는 함수 객체는 독립적으로 존재하는 별도의 객체다. person 객체에 포함된것이 아닌것이다.

    따라서 getName 프로퍼티가 가리키는 함수 객체는 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될수도 있고, 일반 변수에 할당하여 일반함수로 호출될 수도 있다.

    ```jsx
    const person = {
      name: 'Lee',
      getName() {
        return this.name;
      },
    };
    
    const anotherPerson = {
      name: 'Cho',
    };
    
    anotherPerson.getName = person.getName;
    console.log(anotherPerson.getName());  // Cho
    const getName = person.getName;
    console.log(getName());     // undefined 
    															(일반함수로 호출되어 전역객체가 바인딩)
    ```



### 3.3 생성자 함수 호출

- 생성자 함수 내부 this에는 생성자 함수가 미래에 생성한 인스턴스가 바인딩 된다.

- 생성자 함수는 이름 그대로 객체 인스턴스를 생성하는 함수다. 일반함수처럼 정의를 하고 new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다. (new 연산자가 없으면 일반 함수로 동작한다.)

  ```jsx
  function Circle(radius) {
  	this.radius = radius;
  	this.getDiameter = function () {
  		return 2 * this.radius;
  	};
  }
  const circle1= new Circle(5);  // 생성자 함수로 호출
  console.log(circle1.getDiameter()); // 10
  
  const circle2 = Circle(10) // new 연산자가 없으므로 일반함수 호출
  console.log(circle2);   // undefined
  ```



### 3.4 Function.prototype.apply/call/bind 메서드에 의한 간접 호출

- apply, call, bind 메서드는  Function.prototype의 메서드다.  이 메서드들은 함수라면 모두 상속받아 사용할 수 있다.

- apply 와 call 메서드는 this로 사용할 객체와 인수리스트를 인수로 전달받아 함수를 호출한다.

  ```jsx
  function getThis() {
  		return this;
  }
  const thisArg = { a:1 };
  console.log(getThis()); // window
  console.log(getThis.apply(thisArg)); // {a: 1}
  console.log(getThis.call(thisArg)); // {a: 1}
  ```

  - apply와 call 메서드의 본질적 기능은 함수를 호출하는 것이다. apply와 call 메서드는 함수 호출하면서 첫번째 인수로 전달한 객체를 함수의 this에 바인딩한다.

  - 이 둘 메서드의 차이는 아래와 같다.  형식만 다를 뿐 this로 사용할 객체를 전달하면서 함수를 호출하는 것은 동일하다.

    apply : 호출할 함수의 인수를 배열로 묶어서 전달

    ```jsx
    getThis.apply(thisArg, [1,2,3]));
    ```

    call : 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달

    ```jsx
    getThis.call(thisArg, 1,2,3));
    ```

  - 이 둘 메서드의 대표적 용도는 arguments 객체와 같은 유사 배열 객체에 배열 메서드를 사용하는 경우다.

    ```jsx
    function convertArgsToArray() {
      console.log(arguments);
    
      // arguments 객체를 배열로 변환
      // Array.prototype.slice를 인수없이 호출하면 배열의 복사본을 생성한다.
      const arr = Array.prototype.slice.call(arguments);
      // const arr = Array.prototype.slice.apply(arguments);
      console.log(arr);
    
      return arr;
    }
    
    convertArgsToArray(1, 2, 3); // [1, 2, 3]
    ```

  - bind 메서드는 함수를 호출하지 않고 this로 사용할 객체만 전달한다.

    ```jsx
    function getThisBinding() {
      return this;
    }
    
    // this로 사용할 객체
    const thisArg = { a: 1 };
    
    console.log(getThisBinding.bind(thisArg)); // getThisBinding
    
    // bind 메서드는 함수를 호출하지는 않으므로 명시적으로 호출해야 한다.
    console.log(getThisBinding.bind(thisArg)()); // {a: 1}
    ```

    bind 메서드로 메서드 내부의 중첩함수 또는 콜백함수의 this가 불일치하는 문제를 해결할 수 있다.



### 3.5 화살표 함수에서의 this 바인딩

- 화살표 함수의 this 키워드는 상위 스코프를 가리키게 된다

  ```jsx
  const shape= {
  	radius: 10,
  	diameter() {
  		return this.radius *2;
  	},
  	perimeter:() =>2*Math.PI * this.radius
  };
  
  console.log(shape.diameter()); // 20
  console.log(shape.perimeter()); //NaN
  ```

  위의 perimeter은 화살표 함수로, 위의 예제에서 perimeter의 this는 전역 객체를 가리키는데, 전역객체에 readius라는 값은 없으므로 undefined가 나오고, undefined를 계산을 하게되므로 NaN이 출력된다.

  

### 3.6 이벤트 핸들러 내부의 this 바인딩

- 하지만 이벤트 핸들러를 호출할 때 인수로 this를 전달하게 되면 this는 이벤트를 바인딩한 DOM 요소를 가리킨다.

  ```jsx
  <body>
  	<button onclick="handleclick()">Click me</button>
  	<script>
  	function handleClick() {
  		console.log(this); 
  	}
  	</script>
  </body>
  ```

- 이벤트 핸들러 어트리뷰트의 값으로 지정한 문자열은 암묵적으로 생성되는 이벤트 핸들러의 문이다. 따라서 handleClick 함수는 이벤트 핸들러에 의해 일반 함수로 호출된다.

- 일반 함수로서 호출되는 함수 내부의 this는 전역 객체를 가리킨다.
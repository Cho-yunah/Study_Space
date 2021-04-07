# 05. 함수
- 함수는 JS에서도 모든 애플리케이션의 기본 구성 요소이며 핵심인만큼, 타입스크립트에서 가장 중요한 개념이다.

## 1. 함수 선언 및 호출
``` 
// 일반 함수 선언식
function add(a: number, b: number): number {
    return a + b
}
// 함수 표현식
let myAdd = function(x: number, y: number): number { return x + y };
```
- 보통 함수 매개변수(a, b)의 타입은 명시적으로 정의한다. 특별한 상황을 제외하고서는 매개변수 타입을 추론하지 않기 때문이다.
- 함수의 반환 타입은 자동으로 추론하기도 하지만 명시적으로 매개변수 뒤에 표기할 수 있다.
- 자바스크립트의 모든 함수 선언 방법을 지원한다.(기명함수, 익명 함수, 함수표현식, 화살표 함수 등)
- 매개변수 타입과 반환 타입 사이에 화살표를 사용하여 반환 타입을 명확히 표시할 수 있다.
    ```

    let myAdd = function(x: number, y: number): number { return x + y };
    
    let youAdd: (x: number, y: number) => number = 
    function (x:number, y: number) : number { return x+y};

    console.log(myAdd(1,3) === youAdd(1,3)) // true 
- 위의 myAdd와 youAdd는 같은 결과를 도출해낸다. 결론적으로 TS 컴파일러는 타입이 방정식의 한쪽에만 있더라도 타입을 알아낼수 있다. 이러한 동작을 가리켜 타입추론(Inferring the type)을 한다고 한다.
<br>
## 2. 매개변수 (Optional / Defalut / Result)
- 함수가 호출될 때 컴파일러는 각 매개변수에 대해 사용자가 값을 제공했는지 확인한다. 함수에 주어진 인자의 수는 함수가 기대하는 매개변수의 수와 일치해야 하고, 타입 또한 기대하는 타입과 일치해야 한다.

### 2.1 선택적 매개변수 
- 그러나 함수를 구현하면서 매개변수가 들어오는 경우와 들어오지 않는 경우를 함께 표기하고 싶을 때도 있다. 그럴때는 선택적 매개변수를 사용할 수 있다.
- `?`를 이용해 선택적 매개변수를 지정할 수 있다. 함수의 매개변수를 먼저 지정하고 선택적 매개변수를 뒤에 추가한다. (순서가 뒤바뀌면 에러가 발생한다.)

    ```
    // 선택적 매개변수
    function greeting(message: string, name?: string) {
        console.log(message, name)
    }
    greeting('Hi', 'yuna')  // Hi, yuna
    greeting('Hello')       // Hello   -> name 이 인자로 들어오지 않아도 OK!
    greeting('Hi', 3)       // Error!! -> type 오류
    ```

### 2.2 기본 매개변수
- 또한 매개변수가 들어오지 않았을 경우에 기본값으로 넣어줄 값을 지정할 수 있는데, 매개변수의 타입을 지정하지 않고 `=원하는 값` 을 정해주면 된다.
- 기본 매개변수를 사용하면 그 기본값으로 매개변수의 타입을 추론할 수 있기 때문에 코드가 간결해지고 가독성이 좋아진다. 실무에서 자주 사용된다.
    ```
    // 기본값을 지정
    function choose(message: string, id= 3) {
        console.log(message+id)
    }
    choose('helloWorld', 5)      // helloWorld5
    choose('helloWorld')         // helloWorld3  -> 기본값 출력
    choose('helloWorld, 'yuna')  // Error!!      -> type 오류
    ```

### 2.3 나머지 매개변수
- 때로는 인수의 개수가 고정되지 않거나, 함수가 매개변수로 몇개를 받을지 모르는 경우가 생기기도 한다. 이렇게 가변인자 함수를 구현해야 할 때, 나머지 매개변수(Rest Parameter)를 사용할 수 있다. 
- 나머지 매개변수를 사용하면 인자를 원하는만큼 넘겨줄수도, 하나도 넘겨주지 않을 수도 있다. 나머지 매개변수를 나타낼 때는 생략부호 `...`를 사용하고, 는 함수 매개변수 목록 맨 마지막에 위치해야 한다. 
```
functiohn sum(...number: number[]): number {
    return numbers.reduce((total, n)=> total +n, 0)
}
sum(1,2,3,4) // 10 으로 평가
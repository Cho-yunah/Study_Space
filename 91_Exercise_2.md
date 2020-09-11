# 91_제어문 과제



### Q1. 변수 x가 10보다 크고 20보다 작을 때 변수 x를 출력하는 조건식을 완성하라

```js
var x = 12;
var result= (10<x && x>20) ? x:'';
console.log(result);
```



### Q2.  for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.

``` js
for (var i=0; i<10; i++) {
    if (i%2===0) 
}
console.log(i);
```



### Q3.  for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 문자열로 출력하시오.

```js
var result="";
for (var i=0; i<10; i++) {
    if(i%2===0) {
        result+=i;
    }
}
console.log(result);

```



### Q4. for문을 사용하여 0부터 10미만의 정수 중에서 홀수만을 큰수부터 출력하시오.

```js
for (var i=9; i<10; i--) {
    if(i%2===1){
        console.log(i);
    }
}
```



### Q5. while문을 사용하여 0 부터 10 미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.

``` js
var i= 0;
 
while(i<10) {
    if(i%2===0){
        console.log(i);
    }
    i++;
}
```



 ### Q6. while문을 사용하여 0 부터 10 미만의 정수 중에서 홀수만을 큰수부터 출력하시오.

```js
var i= 9;

while(i>=0) {
    if(i%2===1) {
        console.log(i);
    }
    i--;
}
```



### Q7. for 문을 사용하여 0부터 10미만의 정수의 합을 출력하시오.

```js
var result=0;
for(var i=0; i<10; i++) {
    result+=i;
}
console.log(result);
```



### Q8.  1부터 20 미만의 정수 중에서 2 또는 3의 배수가 아닌 수의 총합을 구하시오.

```js
var result=0;
for(var i=1; i<20; i++) {
    if(i%2!==0 && i%3!==0) {
        result+=i;
    }
}
console.log(result);
```



### Q9.  1부터 20 미만의 정수 중에서 2 또는 3의 배수인 수의 총합을 구하시오.

```js
var result=0;
for(var i=1; i<20; i++) {
    if (i%2===0 || i%3===0) {
        result+=i;
    }
}
console.log(result);
```



### Q10.  두 개의 주사위를 던졌을 때, 눈의 합이 6이 되는 모든 경우의 수를 출력하시오.

```js
var result;

for (var x=1; x<=6; x++) {
    for (var y=6; y>=1; y--) {
        if (x+y===6) {
            result= [x,y];
            console.log(result);
        }
    }
}
```



### Q11.  삼각형 출력하기 - pattern 1

다음을 참고하여 *(별)로 높이가 5인(var line = 5) 삼각형을 문자열로 완성하라. 개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.

```js
var star = '*';
var result='';
var jump='\n';

for (var line=0; line<5; line++) {
    for (var star=0; star<=line; star++) {
        result+='*';
    } result+='\n';
}
console.log(result);
```



### Q12.  삼각형 출력하기 - pattern 2

다음을 참고하여 *(별)로 트리를 문자열로 완성하라. 개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.

```js
var star ='*';
var result = '';
var space = ' ';
var jump = '\n';

for (var line=0; line < 5; line++) {
    for (var space =0; space <=line; space++) {
        result += ' ';
    }
    for (var star = 4; star >= line; star--) {
        result+= '*';
    }
    result+= '\n';
}
console.log(result);
```



###  Q13.  삼각형 출력하기 - pattern 3

다음을 참고하여 *(별)로 트리를 문자열로 완성하라. 개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.

```js
var star='*';
var result='';
var jump ='\n';

for (var line=0; line<5; line++) {
	for(var star=4; star>=line; star--) {
	result+='*';
	} result+='\n';
}
console.log(result);
```



### Q14. 삼각형 출력하기 - pattern 4

다음을 참고하여 *(별)로 트리를 문자열로 완성하라. 개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.

```js
var star ='*';
var result = '';
var space = ' ';
var jump = '\n';

for (var line=0; line < 5; line++) {
    for (var space =4; space >=line; space--) {
        result += ' ';
    }
    for (var star = 0; star <= line; star++) {
        result+= '*';
    }
    result+= '\n';
}
console.log(result);
```



### Q15. 정삼각형 출력하기

```js
var star ='*';
var result='';
var space =' ';
var jump = '\n';

for (var n=0; n<5; n++) {
    for (var space =5; space >n; space--) {
        result+= ' ';
    }
    for (var star =0; star <=2*n; star++) {
        result+= '*';
    }
    result +='\n';
}
console.log(result);
```



### *Q16. 역정삼각형 출력하기

```js
var star= '*';
var result='';
var space= ' ';
var jump = '\n';

for (var n=0; n<5; n++) {
    for (var space=0; space<n; space++) {
        result+= ' ';
    }
    for (var star=5; star>=2*n-3; star--) {
        result+= '*';
    }
    result += '\n';
}
console.log(result);
```
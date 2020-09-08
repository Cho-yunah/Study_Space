#과제 1

Q. 아래코드를 삼항 연산자로 변경하기

```
var x = 11;
var res;
if (x === 0) {
  res = '영';
} else if (x % 2 === 0) {
  res = '짝수';
} else {
  res = '홀수';
}
```



A. 답

```
var x = 0;
var result = x===0 ? 영 : (x%2 ? '홀수' : '짝수');
console.log(result);
```


# 반복문 연습 문제



## 1.  1 ~ 10,000의 숫자 중 8이 등장하는 횟수 구하기 

### Q.

1부터 10,000까지 8이라는 숫자가 총 몇번 나오는가? 이를 구하는 함수를 완성하라. 단, 8이 포함되어 있는 숫자의 갯수를 카운팅 하는 것이 아니라 8이라는 숫자를 모두 카운팅 해야 한다. 예를 들어 8808은 3, 8888은 4로 카운팅 해야 한다. (hint) 문자열 중 n번째에 있는 문자 : str.charAt(n) or str[n]

```
function getCount8 () {
    
}
console.log(getCount8()); // 4000
```

### A.

1. 1부터 10,000까지 숫자가 증가하여야 하기 때문에 반복문을 사용하고, 증가하는 숫자에서 문자 '8'이 카운트 되어야 하므로 문자열로 인식할 수 있도록 한다.
2. 증가하는 숫자의 자리마다 문자 '8'이 있는지 순회하면서 확인해야 하기 때문에 for문을 사용한다.
3. if 문을 사용하여 문자 '8'과 같으면 1개씩 카운트가 되도록 설정한다.
4. count 한 수를 리턴한다.

```jsx
function getCount8 () {
  var count= 0;
  var txt= '';
  
  for (var i = 1; i <= 10000; i++) {
    txt += i;
  }
  for (var m = 0; m <txt.length ; m++) {
    if (txt[m] === '8') count++;
  }
  return count;
}
console.log(getCount8());   // 4000
```



## **2. 이상한 문자 만들기**

### Q.

toWeirdCase함수는 문자열을 인수로 전달받는다. 문자열 s에 각 단어의 짝수번째 인덱스 문자는 대문자로, 홀수번째 인덱스 문자는 소문자로 바꾼 문자열을 리턴하도록 함수를 완성하라.

예를 들어 s가 ‘hello world’라면 첫 번째 단어는 ‘HeLlO’, 두 번째 단어는 ‘WoRlD’로 바꿔 ‘HeLlO WoRlD’를 리턴한다.

주의) 문자열 전체의 짝/홀수 인덱스가 아니라 단어(공백을 기준)별로 짝/홀수 인덱스를 판단한다.

```jsx
function toWeirdCase(s) {

}
console.log(toWeirdCase ('hello world')); // HeLlo WoRlD'
console.log(toWeirdCase ('my name is lee'))  // 'My NaMe Is LeE'
```

### A.

1. 매개변수 s로 전달된 문자열을 나열하기 위해 빈 문자열 선언한다.
2. 해당 문자열을 변환해야 하므로 문자열 s의 길이만큼 포문을 돌린다.
3. i 가 짝수일때는 대문자, 홀수일때는 소문자로 변환되어야 하므로, if....else 문을 활용하기로 한다.
4. 해당하는 조건에 따라 기존 문자열에 추가되면서 출력이 될수 있도록 설정한다.
5. 함수가 string 값을 반환하도록 설정한다.

```js
function toWeirdCase(s) {

  var word = s.split(' ');
  var result = '';

  for (var m = 0; m < word.length; m++) {
    for (var i = 0; i < word[m].length; i++) {
      if (i % 2 === 0) {
        result += word[m][i].toUpperCase();
      } else {
        result += word[m][i];
      }
    }
    result += ' ';
  }
  return result;
}
console.log(toWeirdCase('hello world'));
console.log(toWeirdCase('my name is lee')); 
```
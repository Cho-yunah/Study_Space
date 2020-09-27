# 알고리즘 문제 코드풀이



## 2. 정렬

### 2.1 정렬 확인

Q. 주어진 배열(array)이 정렬되어 있다면 true, 그렇지 않다면 false를 반환하는 함수를 구현하라. 단, 어떠한 빌트인 함수도 사용하지 않고 for 문을 사용하여 구현하여야 한다.

```js
function isSorted(array) {
    
}
console.log(isSorted([1, 2, 3, 4, 5])); // true
console.log(isSorted([2, 3, 4, 1, 5])); // false
```



A. 

**풀이 1 - 처음 계획하고 짠 코드**

```js
function isSorted(array) {
  let result=''; //출력 값이 Boolean 값이므로 let result 로 설정해도된다. 
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i]>array[i+1]) {
      result = false;
      break;
    } else {
      result = true;
    }
  } return result;
}
console.log(isSorted([1, 2, 3, 4, 5])); 
console.log(isSorted([2, 3, 4, 1, 5]));
```



**풀이 2 - 더 간단하게 풀어본 코드**

```js
function {
  for (let i = 0; i<array.length-1; i++) {
    if (array[i]>array[i+1]) return false;
  }
  return true;
}
console.log(isSorted([1, 2, 3, 4, 5])); 
console.log(isSorted([2, 3, 4, 1, 5]));
```



### 2.2 버블 정렬

Q. 버블 정렬(buble sort)은 순차적으로 배열을 순회하면서 인접한 두 요소를 비교하여 작은 요소를 왼쪽으로, 큰 요소를 오른쪽으로 교환한다. 버블 정렬은 가장 간단하지만 가장 느린 정렬 알고리즘이다.

시간 복잡도: O(n2)

* 버블 정렬을 통해 주어진 배열(array)을 정렬하는 함수를 구현하라. 단, 어떠한 빌트인 함수도 사용하지 않고 for 문을 사용하여 구현하여야 한다.

```js
function bubbleSort(array) {
    
}
console.log(bubbleSort([2, 4, 5, 1, 3]));     // [1, 2, 3, 4, 5]
console.log(bubbleSort([5, 2, 1, 3, 4, 6]));  // [1, 2, 3, 4, 5, 6]
console.log(bubbleSort([3, 1, 0, -1, 4, 2])); // [-1, 0, 1, 2, 3, 4]
```



A. 

**풀이1 - 처음 계획하고 푼 코드**

```js
function bubbleSort(array) {
  for (let cycle = 0; cycle < 10000; cycle++) {
    for (let i = 0; i < array.length - 1; i++) {
      let j = i + 1;
      let temp = 0;
      if (array[i] > array[j]) {
        temp = array[i]; 
        array[i] = array[j];
        array[j] = temp;
      } else {
        continue;
      }
    }continue;
  }
  return array;
}
console.log(bubbleSort([2, 4, 5, 1, 3])); // [1, 2, 3, 4, 5]
console.log(bubbleSort([5, 2, 1, 3, 4, 6]));  // [1, 2, 3, 4, 5, 6]
console.log(bubbleSort([3, 1, 0, -1, 4, 2])); // [-1, 0, 1, 2, 3, 4]
```

 
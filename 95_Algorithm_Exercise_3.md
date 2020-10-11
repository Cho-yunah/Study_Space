# 알고리즘 문제 코드풀이

## 2. 정렬

### 2.3 선택 정렬

- 선택 정렬(selection sort)은 배열의 최소값을 검색하여 배열의 왼쪽부터 순차적으로 정렬을 반복하는 정렬 알고리즘이다.
- 배열이 미정렬 상태이므로 최소값 검색에는 이진 검색이 아닌 선형 검색 알고리즘을 사용한다.
- 선택 정렬은 버블 정렬보다 빠르다.
- 시간 복잡도: O(n)

Q. 선택 정렬을 통해 주어진 배열(array)을 정렬하는 함수를 구현하라. 단, 어떠한 빌트인 함수도 사용하지 않고 for 문을 사용하여 구현하여야 한다.

```jsx
function selectionSort(array) {

}
console.log(selectionSort([3, 1, 0, -1, 4, 2])); // [-1, 0, 1, 2, 3, 4]
console.log(selectionSort([2, 4, 5, 1, 3]));     // [1, 2, 3, 4, 5]
console.log(selectionSort([5, 2, 1, 3, 4, 6]));  // [1, 2, 3, 4, 5, 6]
```

A.

```jsx
function selectionSort(array) {
  for (let i = 0; i < array.length-1; i++) {
    let min = i; // 정렬되지 않은 배열중에서 가장 작은 인덱스를 min으로 지정
    for (let j = i + 1; j < array.length; j++) {
      if (array[min] > array[j]) { // 현재의 최솟값보다 작은 값이 있다면 min을 변경
        min = j;
      }
    }
    let temp = array[min]; // 배열에서 최솟값과 가장 값의 값의 위치를 바꿔줌
    array[min] = array[i];
    array[i] = temp;

  } return array;
}

console.log(selectionSort([3, 1, 0, -1, 4, 2])); // [-1, 0, 1, 2, 3, 4]
console.log(selectionSort([2, 4, 5, 1, 3]));     // [1, 2, 3, 4, 5]
console.log(selectionSort([5, 2, 1, 3, 4, 6]));  // [1, 2, 3, 4, 5, 6]
```



### 2.4 삽입 정렬

- 삽입 정렬(insertion sort)은 인덱스 1부터 왼쪽과 비교하면서 순차적으로 정렬을 반복하는 정렬 알고리즘이다.
- 정렬이 진행됨에 따라 왼쪽에는 정렬이 종료된 값이 모이게 되고, 오른쪽에는 아직 정렬되지 않은 값이 남게 된다.
- 선택 정렬은 최소값 검색이 필요하지만 삽입 정렬은 필요 없다.
- 삽입 정렬은 평균 시나리오에서 선택 정렬과 유사하고(데이터 정렬 유형에 따라 차이가 있다) 버블 정렬보다 빠르다.
- 시간 복잡도: O(n)

Q. 삽입 정렬을 통해 주어진 배열(array)을 정렬하는 함수를 구현하라. 단, 어떠한 빌트인 함수도 사용하지 않고 for 문을 사용하여 구현하여야 한다.

```jsx
function insertionSort(array) {

}

console.log(insertionSort([3, 1, 0, -1, 4, 2])); // [-1, 0, 1, 2, 3, 4]
console.log(insertionSort([2, 4, 5, 1, 3]));     // [1, 2, 3, 4, 5]
console.log(insertionSort([5, 2, 1, 3, 4, 6]));  // [1, 2, 3, 4, 5, 6]
```

A.

1- 처음에 세운 알고리즘은 버블정렬과 거의 비슷하게 만들어져서 다시 고민했습니다.

2- array[1]부터 시작한다는 것을 활용하여 풀었습니다.

```jsx
function insertionSort(array) {
  for (let i = 1; i < array.length; i++) { 
    for (let m = i-1; m >= 0; m--) {
      if (array[m+1]>array[m]) {
        break;
      } else {
        let temp = array[m+1];
        array[m+1] = array[m];
        array[m] = temp;
      }
    }
  } return array;
}
console.log(insertionSort([3, 1, 0, -1, 4, 2])); // [-1, 0, 1, 2, 3, 4]
console.log(insertionSort([2, 4, 5, 1, 3]));     // [1, 2, 3, 4, 5]
console.log(insertionSort([5, 2, 1, 3, 4, 6]));  // [1, 2, 3, 4, 5, 6]
```
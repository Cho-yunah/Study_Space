# 03 Union Type and Intersection Type


- 타입스크립트는 타입에 적용할 수있는 특별한 연산자인 유니온과 인터섹션을 제공한다. 타입은 집합과 비슷하므로 집합처럼 연산을 수행할 수 있다.
- 합집합을 인터섹션 타입, 교집합을 유니언타입으로 생각하면 된다.

## 1. 유니언 타입 (Union)

- 유니언 타입은 여러 타입중 하나가 될수 있는 값을 의미하고, 막대(|)로 각 타입을 구분한다.  
예를 들어,  `number | string | boolean` 은 값의 타입이 number, string, boolean  중 하나가 될수 있음을 의미한다.

- 유니언 타입인 값이 있으면, 유니언에 있는 모든 타입에 공통인 멤버들에만 접근할 수 있다.

    ```jsx
    type Bird = {name: string, layEggs(): void;}
    type Fish = {name: string, layEggs(): void, swim(): void;}

    type BirdOrFishOrBoth = Bird | Fish
    type BirdandDog = Bird & Fish

    declare function getSmallPet() : Bird |Fish;
    let pet = getSmallPet();
    pet.layEggs();  // OK!
    // pet.swim();  // Error_두개의 잠재적 타입중 하나에서만(Fish) 사용할 수 있다.
    // 모든 타입에 공유되지 않은 함수를 호출시키려는 시도는 에러를 발생시킨다.
    ```

<br>
## 2. 인터섹션 타입 (Intersection)

- 인터섹션 타입은 여러 타입을 하나로 결합한다. 기존의 타입과 다른 타입을 합쳐 필요한 기능을 모두 가진 단일 타입을 얻을 수 있다.

    ```jsx
    interface ErrorHandling {
      success: boolean;
      error?: { message: string };
    }

    interface ArtworksData {
      artworks: { title: string }[];
    }

    interface ArtistsData {
      artists: { name: string }[];
    }

    type ArtistsResponse = ArtistsData & ErrorHandling;

    ```
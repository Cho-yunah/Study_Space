## 1.  CRA + Typescript 로 프로젝트 기본 설정

```jsx
npx create-react-app your-project-name --typescript
```

- 위와 같은 명령을 실행했는데, typescript에 관련된 파일이 생성되지 않았을 경우에는 다음과 같은 명령어를 사용한다.

```jsx
npx --ignore-existing create-react-app your-project-name --template typescript
```

- 기존에 전역으로 설치된 create-react-app을 무시하고 설치하는 명령어이고, 잘 설치가 되었을 경우에는 `tsconfig.json` 으로 기초 설정이 되어진 상태로프로젝트를 진행 할 수 있다.

```jsx
//tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "sourceMap": true,
    "jsx": "react-jsx",
    "module": "esnext",
    "esModuleInterop": true,
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": [
    "src"
  ]
}
```

## 2. 컴포넌트 만들기

- 위에서 CRA+Typescript 로 프로젝트를 만들면 src 폴더에  `.tsx` 파일들이 생성된다.
- 컴포넌트를 만드는 과정은 CRA+Javascript 로 컴포넌트를 만들때와 크게 차이는 없다.
- type 을 추가로 선언을 해준다고 생각하면 된다. 간단히 컴포넌트를 만들어 보자

    화면에 간단한 인사말을 출력하고 아무것도 반환하지 않는 클릭 버튼을 만든다.

    ```jsx
    import React from "react";

    function Greetings({name, mark, option, onClick}: GreetingsProps){
        const handleClick = () => onClick(name)
        return (
        <div>Hello, {name} {mark}
        {option && <p>{option}</p>}
            <div>
                <button onClick= {handleClick}>
                    click me!
                </button>
            </div>
        </div>
        );
    };
    reetings.defaultProps= {
        mark: '!'
    }

    export default Greetings
    ```

- 함수를 간단하게 구현을 한다. Greetings 함수는 props를 전달받아 화면에 렌더하게 된다. 이때 전달받을 props들은 매개변수와 같다.
- 타입스크립트에서는 매개변수에 대한 타입을 선언해야 한다.

    ```jsx
    type GreetingsProps = {
        name: string;
        mark: string;
        option?: string;
        onClick: (name: string) => void;
    };
    ```

- 매개변수의 타입을 함수 위쪽에 선언해놓으면 개발자의 입장에서 어떤 props들이 전달되는지 명확히 알수있어 가독성이 좋고 결과를 추측할 수 있다.
- 위에서 만든 컴포넌트를 화면에 렌더하기 위해 component를 export하고, App.tsx에서 import한다.

    ```jsx
    // App.tsx
    import React from 'react';
    import Greetings from "./Greetings";

    const App: React.FC = () => {
      const onClick = (name: string) => {
        console.log(name)
      } 
      return (
        <Greetings name="리액트" onClick= {onClick}/>
      );
    }
    export default App;
    ```

    - `Greetings.tsx` 에서는 onClick 함수를 전달받았으므로 `App.tsx` 에서 onClick 함수를 구현한다.

### 2.1 React.FC

- 리액트 컴포넌트를 만들때 React.FC라는 키워드를 통해 함수를 만들수 있는데, 다음과 같은 형태이다.

    ```jsx
    const App: React.FC = () => {} 
    ```

- 이 키워드를 사용하여 위의 Greetings 함수를 만들어 보면,

    ```jsx
    const Greetings = React.FC<GreetingsProps>=({children}) => null;
    ```

    이렇게 구현할 수 있다.

- 이 키워드는 편한부분도 있지만 불편한 부분들이 있어서 그렇게 많이 사용되지는 않는다. 장점과 단점을 정리해본다면
    - 장점 : props에서 children 이 따로 설정하지 않아도 자동으로 지정되어 있어서 편하게 바로 사용할 수 있다.
    - 단점: 모든 컴포넌트에 children이 들어있다고 생각하기 때문에 의미가 명료하지 않다 (undefined가 될수도 있다는 점)

        & `defalutProps` 가 작동하지 않는다.
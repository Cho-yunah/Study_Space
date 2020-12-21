# 07. 리액트 컴포넌트 스타일링



## 1. 컴포넌트 스타일링

- 리액트에서 컴포넌트를 스타일링하는 가장 기본적인 방법은 css 파일을 만들어서 컴포넌트에서 import해서 사용하는 것이다.
- 그러나 앱의 규모가 커지고, 복잡해질수록 리액트의 css에서의 큰 단점이 있는데, 이는 바로 style이 스코핑이 되지 않는다는 것이다.
- 하나의 스코프를 공유하기 때문에, 즉 분리되지 않고 하나의 파일로 합쳐지기 때문에 같은 클래스 명을 사용할 수 없고, 이 때문에 스타일링을 하기 위해 지정하는 css 선택자가 복잡해진다.
- 클래스 명을 모두 다르게 하는 방식을 택한다면, 해당 팀의 컨벤션이 깨지거나 실수를 하면 스타일링에 어려움을 겪는다. 이러한 여러 문제들을 컴퓨터의 기술(webpack등)로 해결할 수 있다.
- 이러한 이유들로 리액트 프로젝트에서 컴포넌트를 스타일링 할 때 자주 사용되는 기술들이 있다. 1) Sass  2) CSS Module  3) Sass Module 이다.  앞의 3개의 기술은 모두 `create-react-app`에서 기본적으로 제공하는 방식이다.

1. Sass: Syntactically Awesome Style Sheets의 약어로 CSS pre-processor 로서, 복잡한 작업을 쉽게 할 수 있게 해주고, 코드의 재활용성을 높여줄 뿐 만 아니라, 코드의 가독성을 높여주어 유지보수를 쉽게해줍니다.
2. CSS Module: 리액트 프로젝트에서 컴포넌트를 스타일링 할 때 CSS Module 이라는 기술을 사용하면, CSS 클래스가 중첩되는 것을 완벽히 방지할 수 있다.
3. Sass Module:

### 1.1 Webpack의 역할 ❗

- 보통 index.js 파일안에는 여러 컴포넌트들을 import하는데, 이 때 웹팩이 import 된 모듈들을 하나로 합치는 (bundling) 역할을 한다.

- webpack안에는 babel-loader와 style looader가 있는데,
  1. babel-loader는 `.js` `.jsx` 파일을 받아서 babel에 보내어 번역을 한후에 다시 가져와 최종 배포용 파일로 보내는 중개인 역할을 한다.
  2. style loader도 마찬가지로 `.css` 파일을 브라우저가 읽을수 있는 css 문법으로 트랜스 파일링 해주는 loader에게 위임하는 중개자 역할을 한다.
- 웹팩의 설정이 어떻게 되어 있는지 확인하려면 다음과 같다.

```jsx
// 설치 명령어로 만들고 eject 하여 안의 내용을 살펴본다
npx create-react-app style-loaders-example
cd style-loaders-example
npm run eject
```

- 컴포넌트 스타일링했던 프로젝트를 eject를 하면 webpack.config.js 파일이 새로 생성되고, 그안에는 실제 웹팩 설정 내용이 들어있다.

- CSS설정을 보려면 검색을 해서 볼수 있다. 검색을 하면 css 에 관련된 내용이 있고, 그안에는 정규표현식으로 style 관련 파일을 어떻게 처리하는지에 대해 나와있다.

- 웹팩안의 로더 설정은 객체로 되어있고, 그 객체는 안에는 사용할 loader 설정이 기술되어 있다.

  ```jsx
  // .css 파일을 import 했을 경우의 loader 설정
  // "postcss" loader applies autoprefixer to our CSS.
  .....
  {
     test: cssRegex, // /\\.css$/
     exclude: cssModuleRegex, // /\\.module\\.css$/
     use: getStyleLoaders({
     importLoaders: 1,
     sourceMap: isEnvProduction && shouldUseSourceMap,
  }),
     sideEffects: true,
  },
  ```

- 만약, `create-react-app`에서 지원하지 않는 파일 형식을 import하고 싶다면, eject해서 설치하고 그 설정을 직접 우리가 만들어야 한다.

- eject 는 한번 하면 다시 되돌릴수 없다는 것을 주의해야 한다. eject를 할 경우 CRA로 다시 돌아가지 못하기 때문에, CRA에서 새로운 기능이 추가되었을때 그에 대한 업그레이드를 받을수 없고, 나의 설정에 대한 지원을 받기가 어렵다는 것이 단점이다.

## 2. Sass 의 사용

```jsx
설치 명령어 **npm install node-sass** 

// 만약 설치를 하고 오류가 났을 경우 버전의 문제일수 있는데, 이 경우에는 node_modules 폴더를 삭제하고 package.json 파일의 node-sass 버전을 원하는 버전으로 수정한 후에 다시 터미널에서 npm i 를 실행한다.
```

- Sass는 복잡해지고 길어지는 클래스명을 nesting을 통하여, 즉 계층 구조를 통하여 중복없이 간단하게 css를 만들 수 있다.

```jsx
// html 구조
<div className="App">
  <header className="header">
    <img src={logo} className="logo" alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
  </header>
</div>
// Sass의 계층 구조를 사용하여 간단하게 표기
.App {
  text-align: center;

  .logo {
    height: 40vmin;
  }

  .header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }
}
```

## 3. Module 의 사용

- 모듈도 CRA에서 기본적으로 제공하는 기능이다.
- 기존의 `이름.css` 파일의 이름을 `이름.module.css`로 바꾸어 import한다.

```jsx
기존:  import "./App.css";
모듈:  import styles from "./App.module.css";
```

- 이렇게 

  ```
  module.css
  ```

  를 import하면, 내부적으로 다음과 같은 동작을 한다.

  1. 어떤 이상한 이름으로 클래스를 바꾼후, 스타일을 추가한다. (⇒ 자동으로 이름을 만들어주기 때문에 module 파일끼리는 클래스 이름이 절대 겹치지 않는다.)
  2. 실제 이름을 키로 변경한 이상한 이름을 value로 하는 객체를 export default 한다.
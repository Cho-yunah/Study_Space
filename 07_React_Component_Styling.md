# 07. 리액트 컴포넌트 스타일링



## 1. 컴포넌트 스타일링

- 리액트에서 컴포넌트를 스타일링하는 가장 기본적인 방법은 css 파일을 만들어서 컴포넌트에서 import해서 사용하는 것이다.
- 그러나 앱의 규모가 커지고, 복잡해질수록 리액트의 css에서의 큰 단점이 있는데, 이는 바로 style이 스코핑이 되지 않는다는 것이다.
- 하나의 스코프를 공유하기 때문에, 즉 분리되지 않고 하나의 파일로 합쳐지기 때문에 같은 클래스 명을 사용할 수 없고, 이 때문에 스타일링을 하기 위해 지정하는 css 선택자가 복잡해진다.
- 이러한 이유들로 리액트 프로젝트에서 컴포넌트를 스타일링 할 때 자주 사용되는 기술들이 있다. 1) Sass  2) CSS Module  3) Sass Module 이다.

1. Sass: Syntactically Awesome Style Sheets의 약어로 CSS pre-processor 로서, 복잡한 작업을 쉽게 할 수 있게 해주고, 코드의 재활용성을 높여줄 뿐 만 아니라, 코드의 가독성을 높여주어 유지보수를 쉽게해줍니다.
2. CSS Module: 리액트 프로젝트에서 컴포넌트를 스타일링 할 때 CSS Module 이라는 기술을 사용하면, CSS 클래스가 중첩되는 것을 완벽히 방지할 수 있다.
3. Sass Module:

- webpack 안에 style looader가 있는데,  이 style loader가 css 파일을 웹팩 안에서 브라우저에서 읽을수 있는 css 문법으로 트랜스 파일링 해준다.

```jsx
설치 명령어 npx create-react-app style-loaders-example
cd style-loaders-example
npm run eject
```

- 컴포넌트 스타일링했던 프로젝트를 eject를 하면 webpack.config,js (웹팩 설정)안에 css 에 관련된 내용이 있고,
- 그안에는 정규표현식으로 style 관련 파일을 어떻게 처리하는지에 대해 나와있다.
- 객체로 있고, 사용할 loader 설정이 기술되어 있다.
- eject 를 할 경우 나의 설정에 대한 지원이나 업그레이드를 더이상 받을 수 없다는 점이다.
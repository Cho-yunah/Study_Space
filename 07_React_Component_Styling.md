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
// CRA 파일생성 후, eject 하여 안의 내용을 살펴본다
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



## 3. Module 의 사용 (CSS, SASS)

- 모듈도 CRA에서 기본적으로 제공하는 기능이다.
- 기존의 `이름.css` 파일의 이름을 `이름.module.css`로 바꾸어 import한다.

```jsx
기존:  import "./App.css";
모듈:  import styles from "./App.module.css";
```

- 이렇게 `module.css`를 import하면, 내부적으로 다음과 같은 동작을 한다.

  1. 어떤 이상한 이름으로 클래스를 바꾼후, 스타일을 추가한다. (⇒ 자동으로 이름을 만들어주기 때문에 module 파일끼리는 클래스 이름이 절대 겹치지 않는다.)
  2. 실제 이름을 키로 변경한 이상한 이름을 value로 하는 객체를 export default 한다.

- Module의 개념은 css 파일을 만드는데만 사용하는 것이 아니라 리액트 컴포넌트를 만드는 데도 사용되는 것은 당연하다. 이 컴포넌트를 만들때, 조건부로 className에 따라 렌더링을 다르게 할 때나, 여러 className을 사용해야 할때 간혹 불편함이 생긴다.

  예를 들면,

  ```jsx
  // Button.jsx
  import React from 'react';
  import styles from './Button.module.css';
  
  export default class Button extends React.Component {
    state = {
      loading: false,
    };
  
    startLoading = () => {
      console.log('start');
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 1000);
    };
  
    render() {
      const { loading } = this.state;
      return (
        <button
          **className={
            loading ? `${styles.button} ${styles.loading}` : styles.button**
          }
          {...this.props}
          onClick={this.startLoading}
        />
      );
    }
  }
  ```

  - 위와 같은 예제에서 button의 className에 조건을 줄때, class 명을 조건에 따라 여러개 달아주어야 하므로 템플릿 리터럴 `${ }` 을 사용할 수 밖에 없다. 이 과정을 간단하게 해주는 라이브러리를 사용하면 템플릿 리터럴 없이 작성할 수 있다.

    ```jsx
    설치 명령어 npm i classnames
    
     설치 후 => import classNames from 'classnames';
    ```

    - classnames 라는 라이브러리를 설치하고 사용하면 다음과 같이 코드를 쓸수 있다.

    ```jsx
    console.log(classNames('foo', 'bar')); // "foo bar"
    console.log(classNames('foo', 'bar', 'baz')); // "foo bar baz"
    console.log(classNames({ foo: true }, { bar: true })); // "foo bar"
    console.log(classNames({ foo: true }, { bar: false })); // "foo"
    console.log(classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '')); // "bar 1"
    console.log(classNames(styles.button, styles.loading)); // Button_button__2Ce79 Button_loading__XEngF
    ```

    - 0을 제외한 falsy한 값들 (false, null, undefined, ' ')은 무시된다.
    - 위의 button 예제에 classnames 라이브러리를 사용하면 다음과 같이 만들수 있다.

    ```jsx
    // Button.jsx
    return(   
    	<button
    		{this.props}
         **className={
    				classNames(styles.button, loading && styles.loading)}**
            onClick={this.startLoading}
          />
        );
    ```

    - classnames 라이브러리과 module을 함께 사용한 상태에서 구문을 더 간단히 줄이고 싶다면, classnames을 import할 때 bind 메서드를 묶어주고, 그것을 변수에 할당해서 사용하면 된다.

    ```jsx
    // Button.jsx
    **import classNames from 'classnames/bind';**
    
    **const cx= classNames.bind(styles);**
    	...
    return(   
    	<button
    		{...this.props}
         **className={
    				classNames={cx("button", {loading})}**
            onClick={this.startLoading}
          />
        );
    ```



## 4. Style Components

- 컴포넌트 스타일링을 할때 사용되는 라이브러리 중의 하나다.

```jsx
// CRA 파일생성 후, eject 하여 안의 내용을 살펴본다
npx create-react-app styled-components-example
cd styled-components-example
npm i styled-components
// Button.jsx
**import styled from "styled-component';**

const StyledButton = **styled.button`이 안에 style을 넣어준다`;**

export default StyledButton;
```

- style components는 기존의 클래스 네임을 특이하게 바꾼다던지 하는것이 아니라 새로운 클래스 네임을 생성해서 붙여준다. = 자동화

- style components는 지금까지 봐왔던 문법과 조금 다르게 생소할 수 있다. 스타일을 넣어줄 컴포넌트 뒤에 `` 을 쓰고, 그 백틱 사이 안에 문자열로 스타일 프로퍼티들을 넣어주는 방식이다.

  - 그러나 이 방식의 단점은 style 자동완성이 되지 않는다는 점이다.

  ```jsx
  // Button.jsx
  **import styled from "styled-component';**
  
  const StyledButton = styled.button**`
  	background: transparent;
  	border-radius: 3px;
  	border: 2px solid palevioletred;
  	color: red;
  	margin: 0 1em
  `;**
  
  export default StyledButton;
  ```

- 만약 위의 전체 스타일 프로퍼티에서 일부 프로퍼티만 변경을 하고 싶을때, 새로운 버튼 컴포넌트를 만들어서 스타일을 새로 주어야 한다고 생각할 수 있다.

  그러나 style components에서 제공하는 문법으로 이 문제를 해결할 수 있다. ${ 조건문 } 을 넣어주는 방법이다.

  ```jsx
  // button.jsx
  const StyledButton = styled.button**`
  	background: transparent;
  	border-radius: 3px;
  	border: 2px solid palevioletred;
  	color: red;
  	margin: 0 1em**
  
  	${(props) => 
  		props.primary &&
  			**css**` // 조건연산자를 사용했을 때 오류가 나면 앞에 css를 붙인다. 
  				background; paleviolered;
  				color: white;
  			`}}
  **`;**
  ```

- 스타일이 적용된 엘리먼트인데, 다른 태그로 렌더링해서 사용하고 싶을 때는 `as='#'` 을 붙여서 사용한다.

  ```jsx
  <Button **as="a" href= "/hello"**>
  	버튼
  </Button>
  // Button에 적용된 스타일은 그대로 사용하지만, 다른 태그로 사용할 것이라는 뜻이다.
  ```

  - as 키워드는 기본 스타일 세팅을 마치고 그 스타일을 다른 태그에 적용할 때 용이하게 사용된다.
  - 태그가 아닌 객체(함수 등)을 넣어서 사용해도 된다.



## 5. React Shadow

- custom element를 만들어서 새로운 document를 생성함으로써 캡슐화되어 분리된 영역을 만드는 것이다.
- MDN의 웹 컴포넌트 문서에서 커스텀 엘리먼트에 대한 내용이 자세히 설명되어 있다.

[웹 컴포넌트](https://developer.mozilla.org/ko/docs/Web/Web_Components)

- react shadow도 설치를 하여 사용할 수 있다.

```jsx
// CRA 파일생성 후 
npx create-react-app react-shadow-example
cd react-shadow-example
npm i react-shadow
```

- 사용법은 다음과 같다.

```jsx
// Shadow.jsx
import React fro "react";

const style = `p {color: orange}`;

export default function Shadow() {
	return ( 
		<root.div>
			<p> 안녕하세요 </P>
			<style type="text/css">{style}</style>
		</root.div>
	);
} 
// App.js
import Shadow from "./components/Shadow";

function App () {
	return (
		<Shadow />
	);
}
```

- React shadow를 사용하면 완전히 캡슐화를 할 수 있지만 css style을 문자열로 작성해야 한다는 점이 단점이다.

  이 단점을 해결하기 위해 1) css 파일을 별도로 관리하면서 필요할때 가져오는 방법과 2) 스타일 컴포넌트와 연결하는 방법이 있다.

  두번째 방법은 용량이 커질수 있다는 단점과 몇가지 step이 더 필요하다는 단점이 있으므로, 어떻게 써야 할지를 고민해봐야 한다.



## 6. Ant Design

- 웹 디자인을 제공하는 라이브러리 중의 하나로, 구글의 Material-Ui 도 있다.

- 이 또한 CRA에서 제공하지 않는 라이브러리이기 때문에 설치를 해야한다.

  ```jsx
  cd antd-example
  npm i antd
  ```

  설치 후에는 import를 한다.

  ```jsx
  // index.js
  import 'antd/dist/antd.css';
  // App.js
  import {가져올 컴포넌트 이름} from 'antd';
  ```

  - 위와 같은 방법을 사용하면 필요한 컴포넌트를 가져올때 마다 import를 해야 하는데 이게 번거롭다면 eject하여 수동으로 설정을 넣어주는 방법이 있다.

  ```jsx
  npm run eject
  npm install babel-plugin-import --save-dev
  ```

  ```jsx
  // webpack 설정에 다음과 같은 내용을 추가한다.
  {
    ...
    "babel": {
      "presets": [
        "react-app"
      ],
      "plugins": [
        [
          "import",
          {
            "libraryName": "antd",
            "libraryDirectory": "es",
            "style": "css"
          }
        ]
      ]
    },
    ...
  }
  ```

  이렇게 하면 컴포넌트를 가져올때마다 일일이 import를 하지 않아도 된다.

- Ant 에서 제공하는 아이콘을 가져오고 싶을 때는 라이브러리를 추가로 설치한다.

  ```jsx
  설치명령어 npm install @ant-design/icons
  // App.js에 import하기 =>	import {Button} from 'antd';
  ```



### 6.1 Ant 디자인의 Row & Col

- Ant 디자인에서 제공하는 것 중의 하나는 Row, Col 기능이다. 이것은 브라우저의 뷰포트를 일정하게 나누어 표?와 같은 구조를 만들어준다.
- 이를 사용하면 레이아웃을 좀더 간단하게 할수 있고, 반응형을 만들때에도 꽤 유용하다.

```jsx
import React from 'react';
**import { Row, Col } from 'antd';**

const colStyle = () => ({
  height: 50,
  backgroundColor: 'red',
  opacity: Math.round(Math.random() * 10) / 10,
});

**// <Col span={24중에 어느정도 차지할지 정수} />**

function App() {
  return (
    <div className="App">
      <Row>
        <Col span={12} style={colStyle()} />
        <Col span={12} style={colStyle()} />
      </Row>
      <Row>
        <Col span={8} style={colStyle()} />
        <Col span={8} style={colStyle()} />
        <Col span={8} style={colStyle()} />
      </Row>
      <Row>
        <Col span={6} style={colStyle()} />
        <Col span={6} style={colStyle()} />
        <Col span={6} style={colStyle()} />
        <Col span={6} style={colStyle()} />
      </Row>
    </div>
  );
}

export default App;
```

위의 코드가 출력된 모습은 아래와 같다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/aa804453-7301-4f89-aaaf-787a2c8bbc2b/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/aa804453-7301-4f89-aaaf-787a2c8bbc2b/Untitled.png)

- 중간간격을 뗄수도 있는데 gutter라는 키워드를 넣어주면 된다.  하나의 칸이나 열을 비워두고 싶을 때는 offset 키워드를 사용한다.

```jsx
**// <Row gutter={16 + 8n 의 정수} />
// <Col offset={24 중 건너띄고 싶은 정수} />**
<Row gutter={16}>
   <MyCol span={8} />
   <MyCol span={8} offset={8} />
</Row>
```

- html에서의 flex의 개념으로 정렬을 할 수 있기 때문에 그에 맞는 어트리뷰트로 정렬을 하면 된다.

```jsx
**// <Row justify="좌우정렬" align="위아래정렬" />**
<Row
  style={{
     height: 300,
   }}
   justify="start"
   align="top"
 >
  <MyCol span={4} />
  <MyCol span={4} />
  <MyCol span={4} />
  <MyCol span={4} />
</Row>
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e3ecb798-bcdb-4eb8-92ff-62c9e9dc757d/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e3ecb798-bcdb-4eb8-92ff-62c9e9dc757d/Untitled.png)

- Ant 디자인에서 이미 만들어진 레이아웃을 가져올수도 있다. Ant 디자인에 대한 것은 홈페이지에서 더 자세히 알수 있다.
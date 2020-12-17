# 06. React Routing



## 1. Routing 이해하기

- 페이지의 URL에 따라 어떤 것을 보여줄지 결정하는 기능이다.
- 우선 서버와 클라이언트의 관계를 이해해야 한다.
  1. User가 서버에 html 을 요청하면 **서버에서 모든 html을 보내주었던 방식이 전통적인 서버 사이드 방식이다**. 페이지를 로딩할 때 마다 서버로부터 리소스를 전달받아 렌더링을 하면 속도가 느려지고 트래픽도 낭비된다.
  2. 그래서 **최근에는 클라이언트 사이드 방식으로 우선 애플리케이션을 브라우저에 로드한 다음 필요한 데이터만 서버에서 전달**받아 다시 렌더링을 한다.
- 이러한 클라이언트 사이드 방식은 SPA에서 사용되는 방식이고, SPA 구현에 리액트가 사용될때 라우터가 필요하다. 라우터를 이해하기 위해 먼저 SPA가 무엇인지 알아보겠다.



### 1.1 SPA 란

- SPA는 Single Page Application 의 약자로, 페이지가 1개인 어플리케이션이란 뜻이다.
- **SPA는 기본적으로 웹 애플리케이션에 필요한 모든 정적 리소스를 최초에 한번 다운로드한다.** 이후 새로운 페이지 요청시, 페이지 갱신에 필요한 데이터만을 전달받아 페이지를 갱신하므로 전체 트래픽 감소와 네이티브 앱과 유사한 사용자 경험을 제공할 수 있다.
- SPA의 핵심가치는 사용자 경험 향상에 있으며 애플리케이션 속도의 향상도 기대할 수 있다.
- 그러나 단점도 있는데, 앱의 규모가 커지면 JS 파일 사이즈가 커진다는 점이다. 이로 인해 초기구동속도가 상대적으로 느리고, 검색엔진 최적화의 문제가 있다.



### 1.2 Routing

- SPA가 싱글 페이지라고 하지만 한종류의 화면만 있다는 말은 아니다. 기능별로 페이지를 나눠서 만들수 있는데, 페이지 별로 주소가 있어야한다. 다른 주소에 따라 다른 뷰를 보여주어야 하기때문이다.
- 주소에 따라 다른 뷰를 보여주는 것을 라우팅이라고 하는데, 리액트 자체에는 이 기능이 내장되어 있지 않는다. 따라서 유저가 직접 브라우저의 API를 사용하고 상태를 설정하여 다른 뷰를 보여주어야 한다.
- react-router 은 공식 라우팅 라이브러리는 아니지만 현재 가장 많이 사용되고 있는 라이브러리로, 라우팅을 간단하게 해준다. 따라서 리액트에서 필수적인 라이브러리다.
- SPA 라우팅의 과정은 다음과 같다.
  1. 브라우저에서 최초에 '/' 경로로 요청을 하면,
  2. React Web App 을 내려줍니다.
  3. 내려받은 React App 에서 '/' 경로에 맞는 컴포넌트를 보여줍니다.
  4. React App 에서 다른 페이지로 이동하는 동작을 수행하면,
  5. 새로운 경로에 맞는 컴포넌트를 보여줍니다.





## 2. React-router 사용하기

- 우선 리액트 라우터를 사용할 프로젝트를 만들어서 해당 프로젝트 디렉토리에서 라우터 라이브러리를 설치한다.

  ```
  프로젝트 생성  npx create-react-app 프로젝트명                                        설치 명령어 npm i react-router-dom
  ```



### 2.1 프로젝트에 라우터 적용하기

1. 특정 경로에서 보여줄 컴포넌트를 준비한다.

   - '/' ⇒ Home 컴포넌트
   - '/profile' ⇒ Profile 컴포넌트
   - '/about'  ⇒  About 컴포넌트

2. 메인JS 파일에 만든 컴포넌트들을 import 한다.

3. 라우터 적용을 위해  `BrowserRouter`라는 컴포넌트도 import 한다.

   ```jsx
   // 2, 3번을 코드로 작성하면,
   
   import React from 'react';
   **import { BrowserRouter, Route } from 'react-router-dom';**
   import Home from './pages/Home';
   import Profile from './pages/Profile';
   import About from './pages/About';
   ```

4. 각 컴포넌트를 BrowserRouter 로 감싼다.

   그리고 각 컴포넌트(Home, Profile, About)를 Route 컴포넌트의 경로와 component로 넣어준다.

```jsx
function App() {
  return (
    **<BrowserRouter>
      <Route path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/about" component={About} />
    </BrowserRouter>**
  );
}
export default App;
```

5. 이후 브라우저에서 요청한 경로에, Route의 path가 들어있으면, 그 path의 해당 component를 보여준다.



### 2.2 라우터 적용의 주의점

- 위의 예제처럼 컴포넌트를 만들었을때, 경로를 알려주기 위해 컴포넌트의 앞에는 `/` 가 붙여진다.

  ```jsx
  '/' ⇒ Home 컴포넌트
  '/profile' ⇒ Profile 컴포넌트
  '/about'  ⇒  About 컴포넌트
  ```

- 위와 같은 코드에서는 Profile 이나 About 컴포넌트를 보여줄때 Home 컴포넌트까지 같이 보인다.

- 이는 react-router-dom의 매칭 알고리즘에 의한 것으로, `/Profile`안에 `/`가 포함되어 있는 것으로 인식하기 때문이다.

- 이러한 동작을 막기위해 `Route` 태그안에 `exact`  를 넣는다. `exact`를 넣으면 개발자의 의도대로 경로를 만들수 있다. (경로가 정해져 있다.)





## 3. Dynamic 라우팅

- 이전에 개발자의 의도대로 경로를 정해서 만들수 있다고 하였다. 그러나 정해지지 않은 경로를 만들어야 할 경우도 생기는데, 이를 Dynamic routing이라 한다.

```jsx
// APP.js
import { BrowserRouter, Route} from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/profile" **exact** component={Profile} />
      **<Route path="/profile/:id" component={Profile} />**
      <Route path="/about" component={About} />
		  <Route path="/about?id=34" component={About} />
    </BrowserRouter>
  );
}
```



### 3.1  **params 가 다른 경우**

- **/profile/1** 이라는 경로를 새로 만들고 싶을 때는 기존의 /profile route에는 exact를 넣어주고, 새롭게 Route 컴포넌트를 만들어 경로에 조건을 붙인다. (params를 받아오는 것이라 할 수 있다.)

- 위처럼 Route 하나 더 생성한 후에, 해당 컴포넌트로 이동하여 컴포넌트에 props를 넣어준다. 그리고 console.log를 찍어보면 props로 들어가는 항목들을 볼수 있는데, 그 항목들 중에서 id 값으로 사용될 만한것을 찾아서 변수에 할당한다. 이 변수를 활용하여 조건문을 만들 수 있고, 그에 따라 경로를 다르게 할 수 있다.

  ```jsx
  // Profile.jsx
  
  import React from 'react';
  
  export default function Profile({ history, location, match }) {
    console.log(history, location, match);
    const id = match.params.id; 
  	// id는 문자열이므로 숫자로 사용할때는 숫자로 변환해야 한다.
  
  	if (id === undefined) {
  	    return (<div><h1>Profile</h1></div>);}
  
   // api 호출등을 할때 사용할 수 있다.
  		  return (<div><h1>Profile: {id}</h1></div>); } 
  ```



### 3.2  **쿼리문이 다른 경우**

- **/about?id=34** 이라는 경로는 쿼리문이 다른 경우이므로 위의 첫번째 경우처럼 쉽게 가져올수 없다.

1. 직접 쿼리문을 가져오는 방법( 예를 들어 props.location.search )은 가능하지만 복잡하고 까다로우므로 거의 사용되지 않는다.

2. 직접 쿼리문을 가져오지 않는 방법으로는 2가지가 있다.

   - 첫번째는 내장객체 URLSearchParams를 사용하는 방법이다.

   ```jsx
   const searchParams = new URLSearchParams(search);
     // console.log(searchParams.get('id'));
   ```

   그러나 이 방법은 IE를 지원하지 않는다는 문제점이 있다.

   - 두번째로는 외부라이브러리를 사용하는 방법이다.

     query-string 이라는 라이브러리인데, 설치를 한후에 사용할 수 있다.

   ```
   설치 명령어 **npm i query-string**
   ```

   ```jsx
   // query-string을 사용하기 위해 import한다.
   import React from 'react';
   **import qs from 'query-string';**
   
   export default function About(props) {
     console.log(props);
     const search = props.location.search;
     console.log(search); // ?id=34
   
     **const { id } = qs.parse(search);
   	console.log(queryString.id)  // 34**
   
     return (
       <div>
         <h1>About</h1>
         {id === undefined || <p>id : {id}</p>}
       </div>
     );
   }
   ```





## 4.  Switch문 & NotFound

- switch문은 여러 Route 중 위에서부터 순서대로 경로를 비교하면서 먼저 일치하는 경로의 해당 컴포넌트를 하나 보여준다.

- 만약 각 비교문이 포함 관계에 있다면 순서에 따라 결과가 달라진다.

- ( `/` ⇒ `/about` ) vs ( `/about` ⇒ `/` )

- **포함관계에 따라 순서를 조작하므로 exact를 사용하지 않을수 있다**.

  예를 들어, 경로의 포함관계 생각했을때, `/` 는 `/about` 에 포함되어 있는 관계다. 이렇게 포함되어 있는 `/` 경로의 코드를 맨아래로 내린다.

  ```jsx
  function App() {
    return (
      <BrowserRouter>
  			<Switch>
  			  <Route path='/about' component={About} />
  			  <Route path='/profile/:id' component={Profile} />
  			  <Route path='/profile' exact component={Profile} />
  				<Route path='/' exact component={Home} />
  				<Route component={NotFound} />
  			</Switch>
  		</BrowserRouter>
    );
  }
  ```

  즉, 범위가 좁은 코드(겹치는 부분이 가장 작은)를 상위에 쓰는 것이다.

- 이렇게 switch문을 사용하면 `exact`를 사용하지 않을 수 있다. `exact`를 사용하지 않기 때문에 순서가 중요하다.

- 가장 마지막에 어디 path 에도 맞지 않으면 보여지는 컴포넌트를 설정해서,"Not Found" 페이지를 만들 수 있다.





## 5.  JSX 링크로 라우팅 이동

- a태그는 하이퍼링크를 통해 연결된 페이지로 이동할 수 있도록 주소를 바꾼다. 동시에 해당 주소의 페이지를 서버에 요청하여 받는다.

  그런데 여기서 **서버에 요청하여 받는** a태그의 기본동작은 리액트의 동작과는 반대되는(?) 동작이다. 따라서 a태그를 리액트에서 사용하면 안된다.

- 리액트에는 **서버에 요청을 하지 않고 페이지의 경로를 바꿔줄 컴포넌트가 있는데, `react-router-dom`의 `Link to` 컴포넌트**다. 애플리케이션을 시작하면서 브라우저가 source로 처음에 다 받았기 때문에 로딩을 할 필요가 없다. 서버에 데이터 요청을 하지않고 주소에 맞는 페이지를 보여주는 방식이다.

- `**Link` 컴포넌트가 하는 일을 정리해보면,  History API를 사용하여 주소를 바꾸고, 주소와 일치하는 페이지를 보여주는 라우팅**을 하는 것이다.

```jsx
import React from 'react';
**import { Link } from 'react-router-dom';**

function Links() {
  return (
    <ul>
      <li>
        **<Link to="/">**Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/profile/1">Profile/1</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/about?name=mark">About?name=mark</Link>
      </li>
    </ul>
  );
}

export default Links;
```



### 5.1  NavLink

- `Link`컴포넌트에서 기능이 몇가지 추가된 컴포넌트이다.
- activeClassName, activeStyle 처럼 active 상태에 대한 **스타일 지정이 가능**하다. 그렇지만 Route 의 path 처럼 동작하기 때문에 exact 가 있다.





## 6.  JS로 라우팅 이동하기

- HOC= High Order Component 고차 컴포넌트

- 고차 컴포넌트를 활용한 라우팅 이동방법인데, 최근에 많이 사용되지는 않는다. hooks이 도입된 이후, 즉 version 16.3 이후부터는 hook을 사용하면서 고차컴포넌트의 활용이 줄어들었다.

- 이에 대한 것은 추후에 다시 정리하겠다.

  지금은 고차 컴포넌트는 함수이며, 매개변수를 컴포넌트로 받고, 리턴을 컴포넌트로 한다는 것만 알고 넘어가려 한다.





## 7. Redirect

- Redirect 도 컴포넌트로, 리다이렉트가 랜더되면 이동을  하는데, 리다이렉트를 표현할때 적어놓은 곳으로 이동한다.

```jsx
import React from "react";
import { BrowserRouter, Route, Switch, **Redirect**} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Login from "./pages/Login";

**const isLogin = true;**

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/profile/:id" component={Profile} />
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        <Route
          path="/login"
          **render={() => (isLogin ? <Redirect to="/" /> : <Login />)}**
        />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
```
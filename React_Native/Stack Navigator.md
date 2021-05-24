# Stack Navigator

React Navigation의 각 네비게이터는 자체 라이브러리에 있기 때문에 사용하려는 navigator 라이브러리를 설치해주어야 한다.

```jsx
npm i react-navigation-stack
```

## 1. stack navigation의 원리

- stack navigator은 screen을 스택에 밀어넣어 순서대로 쌓는 방식이다.
- 사용자가 앱을 사용할 때 stack navigator에서 해당 screen을 `push` 또는 `pop` 하여 다른 화면을 보여준다.
- stack에 screen을 쌓아두었기 때문에 필요할 때 스택안에서 screen을 이동할 수 있다. 스크린의 이동이 스택으로 관리되므로 뒤로가기 버튼을 눌렀을때 이전의 스크린으로 돌아가게 되는 방식이다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/798c430b-698b-4436-950b-2b1ced4aff6e/1.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/798c430b-698b-4436-950b-2b1ced4aff6e/1.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/74c7253b-cc3a-4e5c-acca-9c5ee4130699/2.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/74c7253b-cc3a-4e5c-acca-9c5ee4130699/2.png)

- 위의 그림과 같은 원리라고 생각하면 한결 이해가 쉽게 된다.
- stack navigator은 화면을 전환할때 새로운 화면이 오른쪽에서 미끄러져 들어오는 애니메이션을 가지고 있다.

## 2. Stack Navigator 사용하기

- `createStackNavigator` 로 쌓고자 하는 스크린들을 정의한다.

  아래의 코드에서는 `screens` 라는 변수를 만들어서 지정을 했다.

```jsx
// routes/HomeStack

import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation';

const screens = {
  Home: {
    screen: Home, // 어떤 screen을 보여줄것인지.
  },
  ReviewDetails: {
    screen: ReviewDtails,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack); 
```

- 이렇게 만들어진 스택은 최상위의 컨테이너에 담겨져 있어야 한다. 이를 위해  `createAppContainer` 를 import 하고,  `HomeStack`을 감싼다.
- 위처럼 화면이동을 담당하는 `route/HomeStack` 을 만들고, View 에 관련된 Screens 컴포넌트를 분리하여 코드를 만들었다.

```jsx
// screens/Home.js => Home Component

import React from 'react';
import {View, Text, Button} from 'react-native';

export default function Home(**{navigation}**) {
  const pressHandler = () => {
    **// navigation.navigate('ReviewDetails');
    navigation.push('ReviewDetails');**
  };
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="go to review dets" onPress={pressHandler} />
    </View>
  );
}
// screens/ReviewDetail.js => ReviewDetail Component

import React from 'react';
import {View, Text, Button} from 'react-native';

export default function ReviewDetails(**{navigation}**) {
  const pressHandler = () => {
    navigation.goBack();
  };
  return (
    <View>
      <Text>ReviewDetails Screen</Text>
      <Button title="back to home screen" onPress={pressHandler} />
    </View>
  );
}
```

이렇게 만든 stack navigator을 App.js에 import 한다.

```jsx
import React from 'react';
// import Home from './screens/home';
import Navigator from './routes/homeStack';

function App() {
  return <Navigator />;
}

export default App;
```

위 코드의 관계는 이러하다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a1433c87-6089-42e1-9f15-f88a4bb89a1d/Are_you_ready.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a1433c87-6089-42e1-9f15-f88a4bb89a1d/Are_you_ready.png)

## 3. stack navigation에 추가된 편의 기능

- 네비게이터가 스택 네비게이터인 경우 기존의 navigate 및 goBack 의 추가된 기능이 있다.
  1. `replace` : 현재 경로를 새 경로로 교체
  2. `push` : stack에 새로운 경로를 밀어 넣기
  3. `pop` : stack으로 돌아가기
  4. `popToTop` : stack 맨위로 이동

(기존의 기능에는 navigate, reset, setParams, dispatch, setOptions, isFocused, addListener 등이 있다.)
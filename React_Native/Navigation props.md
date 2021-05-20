# Navigation Props

## 1. navigation prop 의 편의 기능

- navigation prop은 stack navigator의 **모든 screen** component에서 전달받을 수 있는 prop이다.
- 이 `navigation prop`는 탐색 작업을 전달하는 다양한 편의 기능이 포함되어 있고, 이는 다음과 같다.
  1. `navigate` : 다른 화면으로 이동하여 이를 수행하는데 필요한 조치를 파악한다.
  2. `reset` : 네비게이터 상태를 지우고 새 경로로 교체
  3. `goBack` : 활성 화면을 닫고 이전 screen으로 다시 이동
  4. `setParams` : 경로의 매개 변수 변경
  5. `dispatch` : navigation state를 업데이트 하는 action을 보냄
  6. `addListener` : 네비게이터의 이벤트 업데이트 구독
  7. `isFocused` : screen이 focus 되었는지 여부 확인
  8. `setOptions` : screen 옵션 업데이트
- 위의 8가지의 기능은 모든 컴포넌트에서 사용 가능한것이 아니라는 것을 알아두어야 한다. 이 navigation prop은 오직 Screen 컴포넌트에서 전달받을 수 있는 것이다.
- 그렇지만 일반 컴포넌트에서 이 navigation prop을 사용하고 싶다면, `useNavigation` hook 을 쓰면 된다.

<br/>

## 2. Common API reference

각각의 편의기능의 사용법을 알아보려 한다.

### 2.1 navigate

- `navigate` 는 앱의 다른 화면으로 이동할 수 있다. 인수를 2개 받는다.

  ```jsx
  navigation.navigate(name, params)
  - name : screen name
  - params : 목적지 경로에 병합할 매개변수
  ```

- 기본적으로 화면은 이름(name)으로 식별된다. 그러나 `getId` prop에 params를 취함으로써 screen을 전환할 수 있다.

  ```jsx
  function Home({navigation: {navigation}}) {
  	return (
  		<View>
  			<Text> This is Home. </Text>
  			<Button
  				onPress={() => 
  					navigate('About', {names: ['Minsu', 'Sohee']})
  				}  
  				title= 'Go to Sohee's about" />
  		</View>
  )}
  ```

  ```jsx
  <Screen name={About} component={About} getId={({ params }) => params.userId} />
  ```

### 2.2 goBack

- 네비게이터에서 이전 화면으로 돌아갈 수 있다.

  ```jsx
  function Detail({ navigation: {goBack}}) {
  	return (
  		<View>
  			<Button onPress= {() => goBack()} title = "go back previous page" />
  		</View>
  ) }
  ```

### 2.3 reset

- 기존의 네비게이터의 상태를 새로운 상태로 대체한다. 만약 기존의 상태를 보존하고 싶다면 `CommonActions.reset` 를 dispatch 와 함께 사용할 수 있다.

  ```jsx
  navigation.reset({
  	index: 0, routes: [{ name: 'Profile}],
  })
  ```

### 2.4 setParams

- 현재 화면의 매개변수를 업데이트 할 수 있다. 리액트의 setState와 비슷하게 동작한다는 것으로 생각하면 된다.

  ```jsx
  function ProfileScreen({ navigation: { setParams } }) {
    render() {
      return (
        <Button
          onPress={() =>
            setParams({
              friends:
                route.params.friends[0] === 'Brent'
                  ? ['Wojciech', 'Szymon', 'Jakub']
                  : ['Brent', 'Satya', 'Michaś'],
              title:
                route.params.title === "Brent's Profile"
                  ? "Lucy's Profile"
                  : "Brent's Profile",
            })
          }
          title="Swap title and friends"
        />
      );
    }
  }
  ```

### 2.5 setOptions

- 컴포넌트 안에서 컴포넌트의 props, state, context를 사용하여 화면을 구분하려 할 때 유용하다.

  ```jsx
  function ProfileScreen({ navigation, route }) {
    const [value, onChangeText] = React.useState(route.params.title);
  
    React.useLayoutEffect(() => {
      navigation.setOptions({
        title: value === '' ? 'No title' : value,
      });
    }, [navigation, value]);
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={onChangeText}
          value={value}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }
  ```

### 2.6 Navigation Events

- `addListener` 을 사용하여 이벤트를 추가할 수도 있다.

  ```jsx
  function Profile({ navigation }) {
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        // do something
      });
  
      return unsubscribe;
    }, [navigation]);
  
    return <ProfileContent />;
  }
  ```

### 2.7 isFocused

- 화면에 현재 초점이 맞춰져 있는지 확인할 수 있다. 화면에 초점이 맞춰져 있으면 true를 반환한다.

  ```jsx
  const isFocused = navigation . isFocused ( ) ;
  ```

### 2.8 dispatch

- 꼭 필요한 경우가 아니라면 dispatch를 사용하지 않는것이 좋다.

  ```jsx
  import { CommonActions } from '@react-navigation/native';
  
  navigation.dispatch(
    CommonActions.navigate({
      name: 'Profile',
      params: {},
    })
  );
  ```
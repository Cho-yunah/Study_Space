# React Navigation Installation

React native에서 화면을 전환하기 위해서는 navigation을 이용해야 한다. React의 router와 유사하지만, react native에서는 route를 사용하지 못하기 때문에 navigation을 주로 사용한다.

## React Navigation 설치하기

1. React Navigation을 시작하기 위해 프로젝트에 필요한 패키지를 설치한다.

   ```jsx
   npm i @react-navigation/native
   ```

   <br/>

2. 설치가 완료되었으면 navigator가 의존하는 패키지도 다음과 같은 명령어로 설치한다.

   ```js
   npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
   ```

   <br/>

3. 위의 패키지를 모두 설치했다면, ios 연결을 하기 위해 pod 을 설치한다.

   ```js
   npx pod-install ios
   ```

   React Native 0.60 이전에는 연결을 하는 명령어도 실행했어야 했는데, 이후 버전부터는 연결이 자동이기 때문에 `react-native link` 와 같은 명령을 추가로 실행할 필요가 없다.

   <br/>

4. 에러가 발생한다면, 필요한 패키지나 모듈이 제대로 설치되지 않은 것일수 있다. 에러메세지에서 알려주는 모듈을 설치하고 pod에서도 설치해주는 방식으로 문제를 해결할 수 있다. React-Navigation의 유형별 해결방법은 [공식 사이트](https://reactnavigation.org/docs/troubleshooting/)에 자세히 설명되어 있다.
# React Native 시작하기

## 1. React Native 란

- 리액트 네이티브는 오픈소스 라이브러리로, 이를 통해 Android 와 iOS 애플리케이션을 제작할 수 있다.

- React Native를 사용하면 React Component를 사용하여 javascript 코드에 대한 뷰를 만들수 있다. 런타임에 React Native는 Component에 해당하는 Android, iOS 뷰를 생성한다.

- 리액트 네이티브는 앱을 구축하는데 사용할 수 있는 필수 요소들을 제공하고 있고, 이러한 구성 요소는 리액트 네이티브의 `Core Components`요소라 한다.

- 리액트 네이티브의 Core Components는 앞으로 더 설명을 하려한다. https://reactnative.dev/docs/components-and-apis 여기서 자세히 확인할 수 있다.

- 리액트 네이티브는 React를 기반으로 하여 동작하므로, 리액트 컴포넌트와 props, state 등의 기본 지식이 필요하다.

  <br/>

## 2. React Native 초기 설정 (Mac 설정)

1. Homebrew 를 사용하여서 terminal에서 Node 와  Watchman을 설치한다.

    ```jsx
    brew install node (version 12)
    brew install watchman
    ```

2. iOS용 React Native 앱을 빌드하는데 Xcode 가 필요하므로 Xcode설치한다. Apple store 에서 설치할 수 있다. 
3. CocoaPods 은 Xcode 프로젝트의 라이브러리들의 dependency를 관리한다. 프로젝트 dependency는 Podfile이라는 텍스트 파일에 지정된다. CocoaPods은 라이브러리간의 dependencies를 해결하고, 소스 코드 결과를 가져와서 Xcode 작업 공간에 연결하여 프로젝트를 빌드하는 역할을 한다.

    ```jsx
    sudo gem install cocoapods
    ```

4. 위의 모든 패키지를 설치한 후에 `react-native-cli` 로 새 프로젝트를 만든다.

    ```jsx
    npx react-native init Project_Name
    ```

    만약 typescript를 적용한 react-native 프로젝트를 만들고 싶다면 

    ```jsx
    npx react-native init Project_Name --template react-native-template-typescript
    ```

    위의 명령어로 프로젝트를 생성하면 된다.

    - 여기서 설치가 잘되지 않고 error 가 발생한다면, cli의 문제일 수도 있다. 나에게 발생했던 에러는 아래와 같다.

        ```jsx
        "https://registry.yarnpkg.com/react-native-template-template-typescript: Not found”.
        ```

    - 이를 해결하기 위해 기존의 cli를 제거하고 새로운 cli를 전역으로 설치했다. 코드는 아래와 같은 순서로 진행한다.

        ```jsx
        // Uninstall legacy cli
        npm uninstall -g react-native-cli

        // install new cli
        npm i -g @react-native-community/cli

        //init tyscript project
        npx react-native init MyApp --template react-native-template-typescript
        ```
!
<img width="503" alt="스크린샷 2021-05-02 오후 3 32 25" src="https://user-images.githubusercontent.com/68039555/117239597-0e9f0100-ae6a-11eb-847d-685904269aa7.png">

        터미널에서 이 사진과 같은 모습을 볼 수 있다면, 설치완료!

5. 프로젝트가 잘 생성됐다면 프로젝트를 실행한다.

    ```jsx
    npm start
    npm run ios 
    ```

6. 컴퓨터 성능에 따라 프로젝트가 빌드되는 시간이 다르다. 빌드가 될때까지 기다린다. 빌드가 잘 되었다면, 바탕화면에 프로젝트 앱 아이콘이 하나 생기고, 다음과 같은 화면을 볼수 있다.

!
<img width="266" alt="_2021-04-29__11 54 08" src="https://user-images.githubusercontent.com/68039555/117239642-25455800-ae6a-11eb-9de9-0ed1494f12cc.png">

!
<img width="407" alt="_2021-04-29__11 57 03" src="https://user-images.githubusercontent.com/68039555/117239676-31c9b080-ae6a-11eb-8faa-8f0794a7dee8.png">

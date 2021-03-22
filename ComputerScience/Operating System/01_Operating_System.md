# **01. 운영체제**



## 1. Computer Science 기본지식이 필요한 이유

- 프로그램의 구조를 잡고 최적화에 필요하다.
- 문제를 접했을때, 쪼개서 푸는데 익숙하게 된다.
- 커뮤니케이션의 원활함
- 새로운 기술을 만나도 스스로 익히고 활용가능

### 1.1 필수 CS 기본 지식 항목

- 운영체제 및 네트워크
- 자료구조/ 알고리즘 (코딩 테스트)
- 데이터베이스 (실무 프로그램 관련)

## 2. OS란(운영체제란)

- OS는 Operating System의 약자로 컴퓨터를 운영하는데 필요한 기본적인 지침인 운영체제를 말한다. 컴퓨터 입장에서는 OS를 '교과서'하고 라고 할수 있다.
- 주요 운영체제: MS의 윈도, 애플의 맥 OS, 리눅스, 안드로이드, iOS 등이 있다.
- 운영체제는 정확하게 커널(kernel)을 의미한다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/92037e03-1291-4789-aad8-0b530f0588a3/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/92037e03-1291-4789-aad8-0b530f0588a3/Untitled.png)

- 컴퓨터 하드웨어는 운영체제 없이는 동작하지 안는다. 운영체제가 하드웨어를 관리, 관장한다.
- 하드웨어는 CPU, Memory, Storage, Network로 이루어져있는데, 이각각의 하드웨어 요소들을 운영체제 입장에서 바라보면 resorce 즉, 컴퓨팅 자원이라고 한다.

### 2.1 컴퓨터 내부 체계

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/399dc210-9326-40af-8813-c0863bb9357b/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/399dc210-9326-40af-8813-c0863bb9357b/Untitled.png)

### 2.2 운영체제의 쉘(Shell)

- 운영체제의 커널 자체는 인터페이스를 제공해주지 못한다.
- 그래서 사용자 인터페이스로 쉘을제공하는데, 이는 사용자가 운영체제 기능과 서비스를 조작할 수 있도록 인터페이스를 제공하는 프로그램이다.
- 쉘은 터미널환경은 CLI환경(키보드중심)과 GUI환경(마우스중심) 두종류로 분류한다. 이중 유명한 쉘은 '리눅스 bash'가 있다.
- 사용자는 shell 을 통해 애플리케이션을 사용할수 있다.

### 2.3 운영체제의 시스템콜(System Call)

- 커널이 하는 역할중 가장 큰 역할은 애플리케이션과 같은 응용 프로그램이 직접적으로 운영시스템을 건드리지 못하게한다.
- 커널이 응용프로그램의 요청을 받을 수 있도록 가이드를 주는데 이를 시스템 콜이라고 한다.
- 시스템콜은 시스템 호출 인터페이스로도 말할 수 있는데, 이것은 응용프로그램의 인터페이스를 제공하는 프로그램이다.
- 하드웨어에 storage 라는 저장공간이 있는데, 응용프로그램이 애플리케이션은 이 storage 등과 같은 컴퓨팅 자원에 직접적으로 접근할 수 없다.
- 그렇다면 응용프로그램은 어떻게 시스템 자원을 사용할수 있을까? 그것은 커널에 요청하는 것이다.
- 응용프로그램이 운영체제 각 기능을 사용할 수 있도록 요청하는 것을 시스템 콜을 호출한다 하고, 이 시스템콜은 명령 또는 함수를 제공한다

### 2.4  API 구현

- API는 Application Programming Interface의 약어로, 응용프로그램이 시스템 자원을 사용할 수 있도록 접근방법을 알려주는 함수 또는 라이브러리다.
- API 내부에는 필요시 해당 운영체제의 시스템콜을 호출하는 형태로 만들어진다.

### 2.5 운영체제를 만든다면??

1. 운영체제를 개발한다. (kernel)
2. 시스템콜을 개발한다.
3. 시스템콜을 기반하여 프로그래밍 언어별 라이브러리를 개발한다. (API)
4. 지원되는 프로그래밍 언어로 Shell 프로그램을 개발한다.
5. 지원되는 프로그래밍 언어로 응용프로그램을 개발한다.

### 2.6 사용자모드와 커널모드

- 컴퓨터에서 명령을 처리하는 것은 CPU가 담당을 하는데 이 명령에는 CPU Protect Ring이라는 것이 붙여지게 된다.

- 이 Ring에 따라 사용자모드, 커널모드로 구분을 한다.

  사용자모드(user mode) : 응용 프로그램이 사용

  커널 모드(kernel mode) : OS가 사용

- 커널 모드에서만 실행가능한 기능들이 있는데, 이 커널 모드로 실행을 하려면 반드시 시스템 콜을 거쳐야 한다.
- 응용 프로그램이 함부로 전체 컴퓨터 시스템을 해치지 못한다.
- 예를 들면 주민등록등본은 꼭 동사무소 또는 민원 24(정부사이트)에서 특별한 신청서를 써야만, 발급받을수 있다는 개념으로 보면된다.

## 3. 정리

- 운영체제는 **시스템 콜**을 제공
- 프로그래밍 언어별 운영체제 지원을 위해, 운영체제 별로 API를 제공한다.
- 응용 프로그램 개발시 운영체제 기능이 필요한 경우(시스템 자원이 필요한 경우), 해당 API를 사용해서 프로그램을 작성한다.
- 응용 프로그램 실행시, 해당 API를 호출하면, 시스템 콜을 호출하여 커널 모드로 변경한 후, OS 내부에서 해당 명령이 실행되고, 그 결과가 응용프로그램에 리턴된다.
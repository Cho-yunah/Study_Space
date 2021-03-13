# 03. 스케쥴러와 프로세스

> 누가 프로세스 실행을 관리할까? → 스케쥴러



## 1. 스케쥴링 알고리즘

- 어느 순서대로 프로세스를 실행시킬까? 이 순서에 따라 알고리즘을 실행하게 된다.



### 1.1 FIFO 스케쥴러 (First In First Out)

- 스케쥴러 알고리즘 중에 가장 간단한 스케쥴러, FCFS(First Come First Served) 스케쥴러 라고도 한다.
- 큐를 만들어 놓고, 요청되는 순서대로 프로세스를 큐에 쌓아두었다가 선입선출의 방식으로 실행한다.
- 프로세스가 저장매체를 읽거나, 프린팅을 하거나 하는 작업 없이, CPU를 처음부터 끝까지 사용한다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eba5edd6-6346-4844-a602-5c0aef44f0b9/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eba5edd6-6346-4844-a602-5c0aef44f0b9/Untitled.png)

- 최근에는 10ms 단위로 빠르게 호출되기도 한다.



### 1.2 SJF 스케쥴러 (Shortest Job First) 스케쥴러

- 최단 작업 우선 스케쥴러로, 가장 프로세스 실행시간이 짧은 프로세스부터 먼저 실행을 시키는 알고리즘이다.
- 순서대로 실행되는것이 아니고, 이상적인 방법이다.

✒✨ 여기서 체크!!

- 운영체제를 크게 2가지로 나눌수 있는데,

  1. RealTime OS(RTOS)

     : 철저하게 성능 보장을 목표로하는 OS로, Hardware OS 와 software OS로 나눈다.

     : 정확하게 프로그램을 시작하며 완료시간을 보장한다. 조금의 오차도 없이 제어할수 있는 OS다.

     : 이를 통해 SJF 스케쥴러를 실현할 수 있다.

  2. General Purpose OS

     : 프로세스 실행시간에 민감하지 않고, 일반적인 목적으로 사용되는 OS 다.

     예를 들면 Windows, Linux 등이 있다.

     

### 1.3 우선순위 기반 스케쥴러

- Priority- Based 스케쥴러라고 하며, 프로그램별로 우선순위를 지정할 수 있다. 우선순위가 높은 순서대로 더 자주 빠르게 실행된다.

  1. 정적 우선순위

     : 프로세스마다 우선순위를 미리 지정한다.

  2. 동적 우선순위

     : 스케쥴러가 상황에 따라 우선순위를 동적으로 변경한다.



### 1.4 Round Robin 스케쥴러

- 시분할 시스템의 기반이 되는 스케쥴러이며, 준비 큐에 프로세스를 쌓아두고, 시간별로 프로세스를 실행한다. 실행했을 때 완전히 완료되지 않으면 다시 큐에 넣어 실행하는 방식이다.



### 1.5 프로세스 상태 기반 스케쥴러

- FIFO, Round Robin 과 함께 기본적인 현대 스케쥴링 알고리즘이고, 멀티 프로그래밍을 실현할 수 있다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/369364db-914b-477d-a87a-340163088f52/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/369364db-914b-477d-a87a-340163088f52/Untitled.png)

- running state: 현재 CPU에서 실행 상태
- ready state: CPU에서 실행 가능 상태(실행 대기 상태)
- block state: 특정 이벤트 발생 대기 상태(예: 프린팅이 다 되었다.)



## 2. 프로그램 성능을 높이고 싶을때 알아두면 좋을 팁

- 프로그램이 IO-bound 냐, CPU-bound 냐
  1. IO-bound : IO관련 기능이 주로 사용하는 프로그램
  2. CPU-bound: CPU/ 메모리를 주로 사용하는 프로그램
- 수시로 파일등을 접근한다면, 한번에 데이터를 메모리에 올려놓고 메모리를 접근하도록 만드는것!
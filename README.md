# react-slack

## 1. 초기 세팅

npm run dev
->db 테이블 세팅
npx sequelize db:seed:all
-> 더미데이터 생성(1워크스페이스, 1채널)

## 2. 프론트엔드 세팅

node_modules는 용량이 커서 깃헙에 잘 안올림
dependencies: 의존 관계
packge-lock.json: a package v2의존, react는 v3 의존->의존하는 패키지의 버전은 package.json에 안나옴, package-lock.json에 나옴.

eslint: 코드 검사 도구(안쓰는 변수 or 오타)
prettier: 코드 정렬

ts->babel->js 변환: 바벨이 js로 다다다 바꿔줌.
strict:true 안쓰면 타입이 any로 되서 any를 최대한 줄이기 위해 사용

공통 css는 메인 html에 작성
ux에 영향 적은 css는 js로 처리

핫리로딩 하려면 서버가 있어야해
프록시서버 설정도 같이 해줌

-D는 라이브러리 만들때 아니면 엄격히 구별할 필요는 x

fork-checker는 동시에

새로고침할때 로그인 안뜰수도 있음 historyAPIFallback설정
SPA는 사실 주소가 없음 주소 있는척 하는거임
History api로 가짜주소 입력
새로고침할때 주소는 서버로 감
서버는 localhost:3090만 알고있음

코드스플리팅으로 모든 소스를 다운받지 않고 필요한것만 다운받음
구분은 페이지 기준으로 하면 쉬움
SSR이 필요없을때

## 3. 강의 정리

### 1. 회원가입 페이지 만들기

중복이 자주 되면 커스텀 훅 제작
처음부터 하지 말고 완성되고나서 하는게 좋음

왜 e매개변수가 useCallback을 쓰면 사라지지?

버츄얼돔으로 달라진게 있는지 확인, 달라지면 다시 그림, 안달라지면 다시 안그림

제너릭??

2021-10-25
리덕스 사용: 전체적인 상태 관리, 비동기 요청(thunk, saga)
컴포넌트에서 비동기 요청이 적을때 리덕스 굳이 안써도 됨
리덕스 단점이 코드 너무 길어짐

헤더 공부하자

proxy 설정: api로 하면 3095가 보낸것처럼 바꿀 수 있음

2021-10-26
로그인 화면 만들기

2021-10-27
로그인 정보를 어디에 저장할 것인지? state에 저장하면 한 컴포넌트 내에서만 쓸 수 있다.
->리덕스 사용해야 함(전역 데이터)

리덕스 대안은 context api 사용, 이 강의에서는 swr 사용

swr은 get요청만 된다.
swr은 next에서 만든거라 next와 잘맞음

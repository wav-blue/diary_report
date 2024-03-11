# ✏️ 두두 일기장

## 주제

사용자가 입력한 일기를 요약 모델을 활용하여 간략하게 표시해주는 서비스입니다.
<br/>일기 서비스에 텍스트 분석을 활용하여 사용자의 흥미를 유발하고자 합니다.

> \* Huggingface에 공유해주신 모델을 활용했습니다.<br/>
> 출처 : https://huggingface.co/psyche/KoT5-summarization

## 기술 스택

#### 공통

<img src="https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white"/>

#### FRONT

   <img src="https://img.shields.io/badge/react-61DAFB?logo=react&logoColor=white"/>

   <img src="https://img.shields.io/badge/styled components-DB7093?logo=styledcomponents&logoColor=white"/>

#### BACK

<img src="https://img.shields.io/badge/Typescript-3178C6?logo=Typescript&logoColor=white"/> <img src="https://img.shields.io/badge/node.js-339933?style=flat&logo=node.js&logoColor=white"/>

   <img src="https://img.shields.io/badge/nestjs-E0234E?logo=nestjs&logoColor=white"/>

   <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=PostgreSQL&logoColor=white"/>

#### AI Server

<img src="https://img.shields.io/badge/Flask-000000?logo=Flask&logoColor=white"/>

<br/>

## 주요 기능

#### 일기 작성

- 작성한 일기 조회
- 일기 작성 및 삭제
- 모델을 통해 요약한 결과 표시

#### 회원 기능

- 회원가입, 로그인
- 리프레시 토큰을 사용하여 로그인 유지

#### 칭호

- 결제를 통해 칭호 획득
- 칭호 설명, 유저의 획득일자 조회(inner join)

#### 결제

- 상품에 따른 결제 가능
- 주문 내역 조회
- 결제 수단(가상 계좌, 카드) 조회

\* toss payments API를 활용했습니다.

### 백엔드

#### UserModule

- **유저 정보**
- 유저(USER)의 생성, 정보 조회
- 로그인 처리

#### AuthModule

- **인증(jwt)**
- jwtToken의 생성, 검증 (Access Token, Refresh Token)
- Access Token에서 userId 추출

#### DiaryModule

- **일기**
- 일기(DIARY) 생성, 조회, 삭제

#### PaymentsModule

- **결제 처리, 주문**
- 결제 성공 처리
- 주문 내역(ORDER) 저장 및 조회

#### BillingModule

- **결제 수단**
- 결제 수단(Card, Virtual Account) 저장 및 조회

#### AxiosModule

- **요청 관리**
- 분석 서버(Flask)로의 요청 관리

#### LoggerModule

- **로깅**
- 로그 작업 설정

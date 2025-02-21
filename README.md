# MovieAPI

MovieAPI는 영화(또는 작품) 정보를 관리할 수 있는 간단한 RESTful API 서버입니다. Node.js, Express, MongoDB(Mongoose)를 기반으로 동작하며, 영화 데이터의 생성, 조회, 수정, 삭제(CRUD) 기능을 제공합니다.

## 주요 기능

- **영화 등록 (Create)**
  - **엔드포인트:** `POST /movies`
  - **설명:** 요청 본문에 영화 제목(title), 작가(author), 제작 연도(year), 장르(genre), 줄거리(summary) 등의 정보를 포함하여 새로운 영화 데이터를 등록합니다.
  - **응답:** 등록된 영화 데이터(JSON)

- **영화 목록 조회 (Read)**
  - **엔드포인트:** `GET /movies`
  - **설명:** 전체 영화 목록을 조회하며, 쿼리 파라미터를 이용하여 제목(title), 장르(genre), 작가(author)로 필터링이 가능합니다.
  - **예시 쿼리:** `/movies?title=Inception&genre=Sci-Fi`
  - **응답:** 필터 조건에 맞는 영화 목록(JSON 배열)

- **개별 영화 조회 (Read by ID)**
  - **엔드포인트:** `GET /movies/:id`
  - **설명:** 특정 영화의 고유 ID를 이용하여 해당 영화의 상세 정보를 조회합니다.
  - **응답:** 영화 데이터(JSON)

- **영화 정보 수정 (Update)**
  - **엔드포인트:** `PUT /movies/:id`
  - **설명:** 특정 영화의 고유 ID를 기반으로 영화 정보를 업데이트합니다. 요청 본문에 수정할 필드들을 포함합니다.
  - **응답:** 수정 성공 메시지와 업데이트된 영화 데이터(JSON)

- **영화 삭제 (Delete)**
  - **엔드포인트:** `DELETE /movies/:id`
  - **설명:** 특정 영화의 고유 ID를 이용하여 해당 영화 데이터를 삭제합니다.
  - **응답:** 삭제 성공 메시지와 삭제된 영화 데이터(JSON)

- **정적 파일 제공**
  - **설정:** `public` 폴더에 있는 정적 파일들을 제공합니다.
  - **설명:** 클라이언트 사이드 애플리케이션 혹은 프론트엔드 리소스를 제공할 수 있습니다.

## 기술 스택

- **Node.js & Express:** 서버 및 API 구현
- **MongoDB & Mongoose:** 데이터베이스 연결 및 스키마 모델링
- **Nodemon (개발 의존성):** 개발 중 서버 자동 재시작

## 디렉토리 구조 

```
MovieAPI
├── app.js               # 서버 및 API 라우팅 설정
├── package.json         # 프로젝트 메타 정보 및 의존성
├── databases/           # MongoDB 연결 설정 파일
├── models/              # Mongoose 스키마 (예: 영화(Item) 모델)
└── public/              # 정적 파일 제공 폴더
```

## 실행 화면

![image](https://github.com/user-attachments/assets/30cfe4c4-a452-4167-a1ea-74679488be89)

## 앞으로 해야할 것 

- 포스터 어떻게 구현할지?
- 객체 .id값을 프론트단에서 어떻게 사용할지?
- 프론트엔드 화면 개선
- 백엔드 로직 개선

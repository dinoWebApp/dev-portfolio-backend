# 개발자들을 위한 포트폴리오 제작 사이트

포트폴리오 작성을 어려워하는 개발자들에게 포트폴리오 작성 가이드를 제공하고 작성된 포트폴리오를 url로 제공하는 웹사이트입니다.

URL: <https://www.dev-portfolio.kr>

<img src='./images/dev-portfolio-main.png'>

프론트엔드: <https://github.com/dinoWebApp/dev-portfolio>

백엔드: <https://github.com/dinoWebApp/dev-portfolio-backend>

이미지 호스팅: <https://github.com/dinoWebApp/image-hosting>

DockerHub Webhooks (Continuous Deployment): <https://github.com/dinoWebApp/continuous-deploy-docker>

## 사용한 메인 라이브러리

- 프론트엔드
  - svelte v4
  - axios
  - emailjs-com v3.2
  - jsonwebtoken v9

- 백엔드
    - nestjs v9
    - typeorm
    - passport
    - passport-github2
    - passport-google-oauth20
    - passport-jwt
    - pg v8

## API Docs

REST API Docs 는 [여기](https://documenter.getpostman.com/view/27639458/2s9YJdXNgX)를 참고해주세요.

## 배포 및 아키텍처

<img src=./images/dev-portfolio-archImg.png>


- 리눅스에 nginx 웹서버 구축
- 프론드엔드, 백엔드 모두 도커라이징하여 웹서버를 통해 배포
- 리눅스에 이미지 호스팅 프로그램 제작, 배포하여 프론트엔드에서 사용
- 리눅스에 postgreSQL 설치하여 백엔드에서 사용
- Github Actions 와 DockerHub Webhooks를 사용하여 CI/CD 파이프라인 구축

## 메인 화면

- 웹사이트 개요
- 주요 기능 소개
- emailjs-com 라이브러리를 사용하여 구현한 문의 메일 작성 기능

## Authentication

- GoogleOAuth 와 GithubOAuth를 이용하여 인증 기능을 구현하였습니다.

## Authorization

- JWT를 사용하여 권한을 부여합니다.

## 마이페이지

- 로그인이 되어 있지 않다면 로그인 페이지로 이동합니다.
- 포트폴리오를 체계적으로 작성할 수 있도록 항목별로 입력을 받습니다.
- 자체 제작한 이미지 호스팅 프로그램을 사용하여 프로필 사진과 아키텍처 사진을 관리합니다. (rest api)

## 포트폴리오 페이지

- 이미지 호스팅 프로그램과 데이터 베이스에서 불러온 데이터들을 포트폴리오 양식에 맞게 배치합니다.

## Contact

Email : <kgjsmart1559@gmail.com>

---
title: "[Beginner]web-misconf-1"
categories: [Security, Web]
tags: [Dreamhack, Beginner]
mermaid: true
---
### 문제 설명  
기본 설정을 사용한 서비스입니다.  
로그인한 후 Organization에 플래그를 설정해 놓았습니다.  

### 문제 풀이  
- 주어진 파일을 보면, `Dockerfile`과 `defualt.ini`파일만이 존재함  
- `Dockerfile`을 통해 해당 서비스가 `grafana`라는 것과 `defualt.ini`를 통해 기본 설정을 사용하고 있음을 알 수 있음  
- 서버를 생성하고, 서버에 접속해보면 로그인을 해야함을 알 수 있음  
- 이에 `default.ini`에서 계정 정보를 찾아보고 로그인을 시도할 수 있음  
- 로그인 성공 시, 여러 정보들을 알 수 있는데, 문제에서 말한 `Organization`을 찾아야 함  
- `Orgs` 탭에 들어가보면 `Organization Users`라는 정보만을 확인할 수 있음  
- 다른 경로를 더 찾아보다 `Settings` 탭의 `auth.anonymous` 칸에 `org_name`에 대한 정보를 확인할 수 있었음  

### `default.ini` 파일 분석  
> 아래 내용은 `grafana`의 공식 docs에 발췌한 내용입니다.   

- `app_mode = production`  
    - 옵션으로 `production`과 `development`가 존재함  
    - 기본값은 `production`으로 설정됨  
    - `grafana` 개발 작업을 하는 경우가 아니면 옵션 변경x  
- `instance_name = ${HOSTNAME}`  
    - `grafana` 서버 인스턴스의 이름을 설정  
    - 로깅, 내부 메트릭 및 클러스터링 정보에 사용됨  
    - `${HOSTNAME}`은 환경 변수 `HOSTNAME`의 값을 사용함  
    - 해당 값이 비어있거나 없는 경우 `grafana`는 시스템 호출을 사용해 머신 이름을 얻으려고 시도  

    > **내부 메트릭(Internal Metrics)란?**  
    > `grafana`가 자체적으로 수집하는 <u>자신의 상태 및 성능 정보</u>
    > 예를 들어, HTTP 요청 처리 시간, 대시보드 로딩 속도, 로그인 시도 횟수 등이 있음  
    {: .prompt-info }  

    > **클러스터링 정보(Clustering Information)란?**  
    > `grafana`는 고가용성 환경에서 여러 인스턴스를 클러스터로 구성할 수 있음  
    > 각 인스턴스가 자신을 식별할 이름이 필요함(instance_name)  
    > 이를 통해 서로 다른 인스턴스들 간의 상태 정보를 공유하거나 세션 저장, 알람 분산 처리 등에 활용함  
    {: .prompt-info }  
    > **고가용성 환경(High Availability; HA)란?**  
    > 서버나 서비스가 장애가 발생해도 멈추지 않고 계속 작동하도록 구성한 시스템을 말함  
    {: .prompt-info }
    > **클러스터(Cluster)란?**  
    > 여러 대의 서버를 하나의 시스템처럼 묶어서 운영하는 구조  
    > 특징  
    > 1. 하나의 작업을 여러 대가 나눠 수행 → 속도 향상  
    > 2. 중앙에서 상태 정보 공유 → 세션, 알람, 로그인 정보 공유  
    {: .prompt-info }  

> 다음 내용부터는 세부적인 내용을 다 살펴보기 보다, GPT를 활용하여 섹션 정보를 요약  
> 세부 옵션은 [공식 문서](https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/)를 참고할 것   

- **`[paths]`**  
`grafana` 서버가 사용하는 파일 경로를 설정하는 섹션  
- **`[server]`**  
`grafana` 웹 서버의 포트, 도메인, HTTP/HTTPS 설정 등을 정의하는 섹션  
- **`[database]`**  
`grafana`가 사용하는 데이터베이스의 종류, 연결 정보 등을 설정하는 섹션  
- **`[remote_cache]`**  
`grafana`가 원격 캐시(redis 등)를 사용하는 경우 해당 캐시의 설정을 정의하는 섹션  
- **`[dataproxy]`**  
데이터 프록시 요청 관련 시간 제한 및 로깅을 설정하는 섹션  
- **`[analytics]`**  
`grafana` 사용 통계 및 업데이트 확인 관련 설정을 정의하는 섹션  
- **`[security]`**  
관리자 계정, 쿠키 보안, 로그인 보호 등 보안 관련 설정을 정의하는 섹션  
- **`[auth.anonymous]`**  
인증 없이 접속한 사용자의 권한과 조직 설정을 정의하는 섹션  

- 위 정보를 토대로, `[security]` 섹션에서 관리자 계정 정보를 얻을 수 있음을 알 수 있음  

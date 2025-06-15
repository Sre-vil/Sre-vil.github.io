---
title: "[Beginner]pathtraversal"
categories: [Security, Web]
tags: [Dreamhack, Beginner]
mermaid: true
---
### 문제 설명  
사용자의 정보를 조회하는 API 서버입니다.  
Path Traversal 취약점을 이용해 /api/flag에 있는 플래그를 획득하세요!  

### 풀이  
```python
    userid = request.form.get('userid', '')
    info = requests.get(f'{API_HOST}/api/user/{userid}').text
```
- `userid`를 통해 `/api/user/{userid}`에 접근하는 것을 확인 가능  
- `userid`에 `..`을 넣어 경로를 벗어날 수 있음  
- `/api/user/..`로 접근하면 `/api/flag`에 접근 가능  
- burp suite를 이용해 `userid`에 `..`을 넣어 요청을 보내 `flag` 획득  
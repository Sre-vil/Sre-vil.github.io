---
title: "[Beginner]file-download-1"
categories: [Security, Web]
tags: [Dreamhack, Beginner]
mermaid: true
---
### 문제 설명  
File Download 취약점이 존재하는 웹 서비스입니다.  
flag.py를 다운로드 받으면 플래그를 획득할 수 있습니다.  

### 풀이  
- 주어진 파일 중 `index.html`을 보면 다음과 같은 힌트를 얻을 수 있음  
    ```html
    {% for file in files  %}
    <li><a href="/read?name={{ file }}">{{ file }}</a></li>
    {% endfor %}
    ```
- `read`라는 경로로 `name` 파라미터를 통해 파일을 읽어오는 것을 알 수 있음  
- `name` 파라미터에 `../flag.py`를 입력하여 `flag`를 획득함  
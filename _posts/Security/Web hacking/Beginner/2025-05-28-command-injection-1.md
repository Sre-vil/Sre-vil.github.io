---
title: "[Beginner]command-injection-1"
categories: [Security, Web]
tags: [Dreamhack, Beginner]
mermaid: true
---
### 문제 설명  
특정 Host에 ping 패킷을 보내는 서비스입니다.  
Command Injection을 통해 플래그를 획득하세요. 플래그는 flag.py에 있습니다.  

### 문제 풀이  
```python
cmd = f'ping -c 3 "{host}"'
try:
    output = subprocess.check_output(['/bin/sh', '-c', cmd], timeout=5)
```
- 주어진 코드를 보면, `host` 변수에 입력된 값을 `ping` 명령어로 실행하는 것을 알 수 있음  
- 생각해봐야할 부분은 위 명령이 어떻게 처리되느냐인데, `/bin/sh -c 'ping -c 3 "0.0.0.0"'` 처럼 처리됨  
    - 이 부분을 생각해야 하는 이유는 proxy를 이용하여 필터링 우회할 때, `""`를 적절히 활용해야하기 때문  

```html
<input type="text" class="form-control" id="Host" placeholder="8.8.8.8" name="host" pattern="[A-Za-z0-9.]{5,20}" required>
```
- 주어진 `ping.html` 파일을 보면, 입력값에 `pattern="[A-Za-z0-9.]{5,20}"`이 걸려있음을 알 수 있음  
- 이 부분은 입력값이 영문자, 숫자, 점(.)으로 이루어져야 하며, 길이는 5~20자여야 함을 의미함  
- 하지만 프론트단에서 검증이 이루어지므로, proxy 도구를 사용해 이를 우회할 수 있음  

### 플래그 획득 방법  
- burpsuite를 통해 `ping.html`에 접속(서버 생성 후)  
- `ping.html`에 필터링에 걸리지 않는 정상적인 임의의 IP 주소를 입력(이때, burpsuite에서 Intercept를 켜두어야 함)  
- `POST` 요청에서 `body`를 수정하면 되는데, `"`을 고려하여 `0.0.0.0"; cat "flag.py` 와 같은 식으로 입력하면 `flag`를 획득할 수 있음  

### 기억할 점  
- 필터링이 프론트엔드단에서 이루어진다면 proxy 도구를 사용해 입력값 검증을 우회할 수 있음  
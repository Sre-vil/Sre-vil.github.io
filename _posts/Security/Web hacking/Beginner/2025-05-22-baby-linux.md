---
title: "[Beginner]baby-linux"
categories: [Security, Web]
tags: [Dreamhack, Beginner]
mermaid: true
---
### 문제 설명  
리눅스 명령어를 실행하는 웹 서비스가 작동하고 있습니다.  
해당 웹 서비스의 코드가 첨부파일로 주어집니다.  
flag.txt 파일을 찾아 출력하여 플래그를 획득하세요!  
플래그 형식은 DH{...} 입니다.  

### 문제 풀이에 필요한 코드  
```python
#!/usr/bin/env python3
import subprocess
from flask import Flask, request, render_template

APP = Flask(__name__)

@APP.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        user_input = request.form.get('user_input')
        cmd = f'echo $({user_input})'
        if 'flag' in cmd:
            return render_template('index.html', result='No!')

        try:
            output = subprocess.check_output(['/bin/sh', '-c', cmd], timeout=5)
            return render_template('index.html', result=output.decode('utf-8'))
        except subprocess.TimeoutExpired:
            return render_template('index.html', result='Timeout')
        except subprocess.CalledProcessError:
            return render_template('index.html', result='Error')

    return render_template('index.html')

if __name__ == '__main__':
    APP.run(host='0.0.0.0', port=8000)
```

### 문제 풀이  
- `user_input`을 통해 원하는 명령어를 입력할 수 있음  
- `flag`가 포함되면 `No!`가 리턴됨을 코드를 통해 알 수 있음  
- 즉, `fla*`와 같은 방식으로 우회할 수 있음  
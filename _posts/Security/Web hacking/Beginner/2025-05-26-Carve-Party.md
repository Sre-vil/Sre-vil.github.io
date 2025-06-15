---
title: "[Beginner]Carve Party"
categories: [Security, Web]
tags: [Dreamhack, Beginner]
mermaid: true
---
### 문제 설명  
할로윈 파티를 기념하기 위해 호박을 준비했습니다! 호박을 10000번 클릭하고 플래그를 획득하세요!  

### 문제 풀이 방법  
- 해당 문제는 서버가 생성되지 않고, html 파일이 주어짐  
- html 파일을 분석하여 `flag`를 출력하도록 코드 임의로 수정 가능  

### 내가 수정한 부분  
```javascript
$(function() {
  $('#jack-target').click(function () {
    while (counter <=10000){
      counter += 1;
      if (counter <= 10000 && counter % 100 == 0) {
        for (var i = 0; i < pumpkin.length; i++) {
          pumpkin[i] ^= pie;
          pie = ((pie ^ 0xff) + (i * 10)) & 0xff;
        }
      }
      make();
    }
  });
});
```

### 코드 설명  
- 원본 코드를 분석해보면 `$('#jack-target').click` 이벤트가 발생할 때마다 `counter`가 1씩 증가하고, `counter`가 100의 배수일 때마다 `pumpkin` 배열의 각 요소에 `pie` 값을 XOR 연산하여 변경함을 알 수 있음  
- 따라서 단순히 `counter`를 10000으로 변경하는 것은 `flag`를 획득할 수 없음  
- `counter += 100`으로 수정한 후 직접 클릭해도 되지만, `while` 문을 활용하여 클릭 한 번하면 10000번 클릭하도록 수정함  
---
title: "Sieve of Eratosthenes"
categories: [Algorithm, Prime]
tags: [Python, Algorithm, Prime]
mermaid: true
---
### 정의  
- 특정 범위 내의 모든 소수를 빠르고 효율적으로 찾아내는 알고리즘  

### 예시 코드  
```python
def sieve_of_eratosthenes(n):
    primes = [True] * (n + 1)  # 소수 여부를 저장하는 리스트
    primes[0] = primes[1] = False  # 0과 1은 소수가 아님

    for i in range(2, int(n**0.5) + 1):
        if primes[i]:
            for j in range(i*i, n + 1, i):
                primes[j] = False

    return [i for i, is_prime in enumerate(primes) if is_prime]

# 예시: 50 이하의 모든 소수 출력
print(sieve_of_eratosthenes(50))
```
### 원리  
- **"소수의 배수는 소수가 아니다"**라는 원리를 이용  

1. 배열 생성 및 초기화  
    - 구하고자 하는 범위만큼의 배열을 만들고 초기값을 `True`로 설정  
    - 0과 1은 소수가 아니므로 `False`로 설정  
    
2. 가장 작은 소수 선택  
    - 남아있는 수 중에서 가장 작은 수 p를 선택  
3. 소수의 배수 제거  
    - 선택된 소수의 배수들을 배열에서 모두 `False`로 설정  
    - 이때 자기 자신(p)은 지우지 않음  
4. 과정 반복  
    - 남아있는 수 중에서 다음으로 가장 작은 수를 선택하여, 그 수의 배수를 모두 지우는 과정 반복  
5. 종료  
    - 이 과정을 계속 반복하면 배열에 남아있는 `True` 값의 인덱스가 모두 소수가 됨  

> **최적화: 어디까지 반복해야 할까?**  
> 모든 숫자를 확인할 필요는 없습니다.
> N까지의 소수를 찾을 때 `N의 제곱근`까지만 반복하면 됩니다.  
> 그 이유는 N이 소수가 아닌 수라면, `N = a x b`로 표현될 때 `a`와 `b` 중 적어도 하나는 반드시 `N의 제곱근` 이하이기 때문입니다.  
> 따라서 `N의 제곱근`까지의 수들의 배수만 지워도 N까지의 모든 합성수가 걸러집니다.  
{: .prompt-tip }
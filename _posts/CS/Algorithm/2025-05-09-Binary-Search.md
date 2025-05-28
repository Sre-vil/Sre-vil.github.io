---
title: "Binary-Search"
categories: [Algorithm, Search]
tags: [Python, Algorithm, Search]
mermaid: true
---
### 정의  
- 정렬되어 있는 리스트에서 탐색 범위를 반으로 줄여가며 원하는 값을 찾는 알고리즘  
- 변수 3개(`start`, `end`, `mid`)를 사용하여 탐색  
- 찾으려는 데이터와 중간점 위치에 있는 데이터를 반복적으로 비교해서 원하는 데이터를 찾는 것  

- lower_bound : 탐색값이 2개 이상 있는 경우 가장 앞에 위치한 탐색값  
- upper_bound : 탐색값이 2개 이상 있는 경우 가장 뒤에 위치한 탐색값  

### 반복문을 활용한 코드  
```python
def binary_search(arr, target):
    arr.sort()
    start = 0
    end = len(arr)-1 # 마지막 인덱스 

    while start <= end:
        mid = (start + end)//2 # 중간값 
        
        if arr[mid] == target: return mid
        elif arr[mid] > target: end = mid - 1
        else: start = mid + 1
    return
```

### 재귀를 활용한 코드  
```python
def binary_search(arr, target, start, end):
    if start > end: return -1

    mid = (start + end)//2 # 중간값

    if arr[mid] == target: return mid
    elif arr[mid] > target:
        return binary_search(arr, target, start, mid - 1)
    else:
        return binary_search(arr, target, mid + 1, end)
```

### 코드 작성 시 반드시 기억할 원리  
- 입력되는 배열은 반드시 정렬되어 있어야 함  
- 재귀함수를 사용하여 구현한다면 재귀적으로 `start`와 `end` 값을 변경해야 하므로, `start`와 `end`를 매개변수로 전달해야 함  
- 항상 `(start+end)//2`로 중간값을 구해야 함  
- `start`가 `end`보다 커지면 탐색을 종료해야 함  
- `arr[mid] > target`인 경우, `mid`를 다시 확인하지 않기 위해 `end = mid - 1`로 설정해야 함  
- `arr[mid] < target`인 경우, `mid`를 다시 확인하지 않기 위해 `start = mid + 1`로 설정해야 함  
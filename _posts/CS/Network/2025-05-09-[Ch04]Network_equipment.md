---
title: "Chapter04. 네트워크 장비에 관한 이야기"
categories: [CS, Network]
tags: [네트워크, 후니]
mermaid: true
---
> **Chapter04의 핵심 내용**  
> - 랜카드(NIC) 종류  
> - 허브란?(feat. 리피터)  
> - 스위치란?(feat. 브리지)  
> - 스위치 기능 정리(Learning, Flooding, Forwarding, Filtering, Aging)  
> - 브리지 vs 스위치  
> - Looping이란?  
> - 라우터 맛보기  
{: .prompt-tip }

# 4.1 랜카드(NIC) 종류  
> 랜카드는 유저의 데이터를 케이블을 통해 허브나 스위치, 라우터 등으로 전달하고 수신한 데이터를 CPU에게 전달하는 장치  
> 요즘 PC들은 알아서 랜카드를 인식하고, 필요한 프로그램 설치 및 네트워크에 연결해줌(Plug and Play 기능 지원)  
{: .prompt-info }

- 어떤 환경에서 사용하는가?  
    - 이더넷용 랜카드  
    - Token Ring용 랜카드  
    - FDDI용 랜카드  
    - ATM용 랜카드  
    ⇒ **대부분의 환경에서는 이더넷을 사용**  
- 어디에 설치하는가?  
    - 데스크톱용 랜카드  
    - 노트북용 랜카드(PCMCIA 방식)  
    - 외장형 랜카드(USB 방식)  
    > 데스크톱용 랜카드의 경우 PC의 버스 방식을 고려해야 함  
    > - PCI 방식(현재 가장 많이 사용), ISA 방식(구형 PC), EISA(서버급 PC)  
    > - 여기서 말하는 버스는 컴퓨터에서 데이터가 날아다니는 길을 의미  
    {: .prompt-info }
- 속도에 따른 구분  
    - 이더넷 랜카드의 경우, 10Mbps, 100Mbps, 1Gbps 등으로 구분됨  
- 랜카드에 접속하는 케이블 종류에 따른 구분  
    - TP 포트를 가진 랜카드  
    - BNC나 AUI 포트를 가진 랜카드  
    - 광케이블과 접속하는 랜카드  

> **IRQ와 Base Memory**  
> 네트워크 어댑터 정보를 확인하다보면 IRQ(인터럽트 요청)과 Base Memory라는 단어를 확인할 수 있음  
> 목적지 주소가 자신의 랜카드 MAC Address와 일치하는 데이터가 들어오면, 랜카드는 CPU에 IRQ를 이용해 인터럽트를 걸게 됨  
> CPU는 IRQ 번호를 확인하여 랜카드가 요청한 서비스임을 파악하고, 이 데이터에 어떤 서비스를 할 것인지 미리 정해놓은 장소(Base Memory)로 이동해서 작업을 시작함  
> 만일 IRQ가 다른 서비스를 위해 이미 예약된 번호라면 랜카드를 인식하지 못하게 되는데, 최근 PC들은 자동으로 안쓰는 IRQ를 배정함  
{: .prompt-info }  

# 4.2 허브란?(feat. 리피터)  
- 리피터란?  
    - 네트워크에서 데이터를 전송하는 경우 케이블에 따라 전송 거리에 제약이 있음  
    - 케이블이 갈 수 있는 최대 거리 이상 떨어진 두 장비 간을 UTP 케이블로 연결하기 위해 사용하는 것이 리피터  
    - 한쪽에서 들어온 데이터를 그대로 다른 쪽으로 전달하는 역할  
    - 허브 역시 리피터 기능을 가짐  

- 허브  
    - 이더넷용과 토큰링용이 존재  
    - 속도를 보고 랜카드에 맞는 허브를 선택하는 것이 중요  
    - 스위치가 저렴해지면서 거의 사용되지 않음  
    - 랜카드, 케이블, 허브만 있으면 내부에서는 허브에 접속된 PC가 서로 통신 가능(단, 외부 인터넷은 안됨)  
    - 포트가 여러 개 달린 장비로, 한 포트로 들어온 데이터를 나머지 모든 포트로 뿌려줌  
    - CSMA/CD의 적용을 받으므로, 하나의 PC가 허브에 데이터를 보내고 있을 때 다른 PC가 데이터를 보내면 Collision 발생  
    - 같은 허브에 연결되어 있는 모든 PC들은 동일한 Collision Domain에 속함  
    - 허브끼리 연결된 경우, Collision Domain이 커짐(즉, 허브가 많아질수록 Collision Domain이 커짐)  

- 허브의 한계  
    - 모든 PC들은 하나의 Collision Domain 안에 있기 때문에 어느 한순간에는 한 PC만 데이터를 보낼 수 있음  
    - 10Mbps의 속도를 가진 허브에 10대의 PC가 연결되어 있다면, 각 PC는 1Mbps의 속도로 데이터를 전송할 수 있음(공유해서 사용)  

- 허브 종류  
    - 인텔리전트 허브(NMS; Network Managed System 지원)  
        - Auto Partition 기능을 지원. Collision을 발생시키는 PC를 찾아내어 Isolation 시킴  
    - 더미 허브  
    - 세미인텔리전트 허브
        - 따로 있을 때는 더미 허브이지만, 인텔리전트 허브와 연결하면 자신도 인텔리전트 허브가 되는 허브  
    - Stackable 허브  
        - 허브 간 연결이 효율적으로 설계된 허브  
        - 여러 허브가 스택으로 연결되면 훨씬 더 좋은 성능을 발휘  
        - NMS 이용한 관리 시 한 대의 장비처럼(IP 주소 하나로) 관리 가능  

# 4.3 스위치란?(feat. 브리지)  
- Collision Domain을 나누어 줄 수 있는 장비(브리지는 스위치의 초기 형태)  
- 각 포트에 연결된 PC가 독자적으로(Dedicated 하게) 10Mbps 혹은 100Mbps의 속도를 가짐  
- 허브에 비해 데이터 처리 방법이 우수하며 데이터의 전송 에러 등을 복구해주는 기능 등 여러 기능을 추가적으로 가짐  

- 허브 vs 스위치  
    ![허브와 스위치](/assets/img/Cisco/hub_switch.jpg)
    - 네트워크의 트래픽이나 용도에 따라 달라짐. 최근은 스위치가 많이 내려서 그냥 스위치를 씀  

- 통신 예시  
    ![스위치 예시](/assets/img/Cisco/switch_example.jpg)  
    - 1111이라는 MAC Address를 가진 PC가 2222 PC에게 통신을 하는 중에도 3333 PC는 4444 PC와 통신 가능  
    - 브리지는 브리지 테이블(스위치 테이블, MAC Address Table)을 이용하여 1111과 2222이 통신할 때 브리지를 사용하지 않아도 됨을 알고 있음  
        - 이를 기반으로 프레임을 통과시키지 않음. 충돌을 방지  

# 4.4 스위치 기능 정리  
**Learning**   
- 스위치가 출발지 MAC Address를 학습하는 것을 의미  
![Learning](/assets/img/Cisco/learning.jpg)
- E0 세그먼트에 있는 A(1111) PC가 통신을 하게 되면 이더넷의 기본 성질에 따라 E0 세그먼트에 있는 모든 PC에게 프레임을 뿌리게 됨  
- 스위치(브리지)는 이 프레임을 받아서 출발지 MAC Address를 확인하고 스위치 테이블에 저장함  

**Flooding**  
- 들어온 포트를 제외한 나머지 모든 포트로 뿌리는 것을 의미함  
![Flooding](/assets/img/Cisco/flooding.jpg)
- E0 세그먼트에 있는 A(1111) PC가 5555를 가진 PC와 통신하기 위해 프레임을 전송  
- 스위치(브리지)는 프레임을 받고 목적지를 확인했을 때 5555가 자신의 스위치 테이블에 없음을 알게 됨  
- 이때 스위치는 들어온 포트를 제외한 모든 포트로 프레임을 뿌림(Flooding)  

**Forwarding**  
- 목적지가 출발지와 다른 세그먼트에 존재하는 경우에 발생  
![Forwarding](/assets/img/Cisco/forwarding.jpg)
- 스위치(브리지)가 5555의 위치를 알고 있음  
- 세그먼트 E0에는 1111이 6666쪽으로 프레임 전송  
- 이를 접수한 스위치(브리지)는 테이블을 확인하고 목적지 5555가 E2 세그먼트에 있는 것을 알게 됨  
- 이 경우 스위치(브리지)는 1111한테 받은 프레임을 E2 세그먼트로 전송함(Forwarding)  

**Filtering**  
- 스위치(브리지)가 프레임을 수신했을 때 목적지가 출발지와 같은 세그먼트에 있는 경우  
![Filtering](/assets/img/Cisco/filtering.jpg)
- E0 세그먼트에 있는 A(1111) PC가 2222에게 프레임을 전송  
- 이더넷 특성상 프레임은 2222와 스위치(브리지)에 전송됨  
- 스위치(브리지)는 테이블을 확인하고 목적지가 같은 세그먼트에 있는 것을 알게 됨  
- 이 경우 스위치(브리지)는 프레임을 수신했지만 다른 세그먼트로 전송하지 않음(Filtering)  
- 이때, E1 세그먼트에 있는 3333과 4444가 통신을 해도 필터링으로 인해 E0에서 통신이 일어나는 도중에도 통신 가능(즉, Collision Domain이 나뉘어짐)  

**Aging**  
- 스위치(브리지)가 스위치 테이블에 저장된 MAC Address를 일정 시간마다 삭제하는 것  
![Aging](/assets/img/Cisco/aging.jpg)
- 타이머가 끝나기 전에 스위치(브리지에) 프레임이 들어오면 타이머가 리셋됨  

**기능 전체 정리**  
![정리](/assets/img/Cisco/switch_flow.jpg)
- 스위치(브리지)가 프레임을 접수함  
- 출발지의 MAC Address를 스위치 테이블에 저장 혹은 Aging 타이머 리셋  
- 목적지가 브로드캐스트, 멀티캐스트 또는 스위치 테이블에 없는 경우 Flooding  
- 목적지 주소가 스위치 테이블에 있는 경우, 같은 세그먼트에 존재하는지 확인 후 Filtering or Forwarding  

> **콜리전 도메인을 나눠주는 기능을 Filtering이다.**  

# 4.5 브리지 vs 스위치  
- 스위치의 경우 처리 절차를 미리 칩에 구워서 하드웨어 방식으로 만드는 ASIC(Application Specific Integrated Circuit) 방식이기 때문에 프레임 처리 속도가 브리지에 비해 빠름  
- 브리지의 경우 프레임의 처리 방식이 SW적으로 프로그램에 의해서 처리되는 방식임  

- 스위치는 10메가 포트와 100메가 포트가 한 장비에 같이 존재하여, 서로 다른 속도를 연결해주는 기능이 존재  
- 브리지는 포트들이 같은 속도만을 지원  

- 스위치는 몇십 또는 몇백개의 포트를 제공  
- 브리지는 대부분 2개에서 3개 정도의 포트를 제공  

- 스위치의 경우 Cut-Through 방식과 Store and Forward 방식이 존재  
- 브리지의 경우 Store and Forward 방식만 존재  

> **Store-and-forwading**  
> - 들어오는 프레임을 전부 받아들인 후 처리를 시작하는 방식  
> - 에러가 발견되면 이 프레임을 버리고 재전송을 요구하기 때문에 에러 복구 능력이 뛰어남  
> - 회선에 에러가 자주 발생하거나 출발지와 목적지의 전송 매체가 다른 경우 주로 사용  
> **Cut-Through 방식**  
> - 들어오는 프레임의 목적지 주소(처음 48비트)만 확인하고 전송 처리를 시작하는 방식  
> - 프레임을 전부 받아들이지 않기 때문에 속도가 빠르지만, 에러 복구 능력에는 약점을 가짐  
> **Fragment-Free 방식**  
> - Cut-Through 방식과 Store-and-forward 방식의 장점만 결합한 방식  
> - 처음 512비트를 확인하여 Cut-Through 방식보다 에러 감지 능력이 뛰어나며, 전체 프레임을 기다리지 않아 속도가 빠름  
{: .prompt-info }

# 4.6 Looping이란?  
- 프레임이 스위치(브리지)를 지나면서 무한히 돌아다녀 데이터 전송이 불가능해진 상태  
![Looping](/assets/img/Cisco/looping.jpg)
- 두 호스트 사이에 스위치(브리지)가 두 대 이상 존재하여 하나의 호스트에서 다른 호스트로 가는 경로가 2개 이상 존재  
- 보통 하나의 경로가 끊어져도 다른 경로를 쓰기 위해서 이런 구조를 사용하나, Looping이 발생하게 됨  
- A가 브로드캐스트 패킷을 전송하면, 양쪽 브리지로 들어가게 되고, 이 패킷은 양쪽 브리지에서 Flooding이 발생하여 무한히 돌아다니게 됨  

- Looping을 방지하기 위해 스위치(브리지)에서는 STP(Spanning Tree Algorithm)라는 알고리즘을 사용  
- 브리지나 스위치에서 목적지까지의 경로가 2개 이상 존재하면 반드시 루핑이 발생하고, 이를 방지하는 것이 스패닝  

- 스패닝 트리 알고리즘은 스위치(브리지)에서 두 개 이상의 경로가 존재할 때, 그 중 하나의 경로만을 사용하고 나머지 경로는 Block 상태로 만들어 루핑을 방지함. 이후 기존 경로에 문제가 생기면 Block 상태의 경로를 Active 상태로 바꿔줌  

# 4.7 라우터 맛보기  
- 스위치로는 해결할 수 없는 한계가 있어 라우터를 사용하게 됨
- 예외적으로 라우터를 대신하는 스위치가 존재하는데 이를 Layer 3 Switch라고 함  

1. 스위치는 Collision Domain 영역을 줄일 수 있지만, 브로드캐스트 영역(도메인)을 줄일 수는 없음   
2. 라우터에는 네트워크 주소에 따라 전송을 조절하는 Filtering 기능이 있으며, 이를 통해 불필요한 트래픽이 전송되는 것을 막음  
3. 여러 개의 경로를 가지고 있기 때문에 데이터가 여러 경로를 통해 전송될 수 있음. 따라서 한쪽 경로에 문제가 생겨도 다른 경로를 통해 전송 가능  
4. 프로토콜, 데이터 크기, 중요도 등 상황에 따라 트래픽 전송 순서를 조정해주는 QoS(Quality of Service) 기능을 제공  

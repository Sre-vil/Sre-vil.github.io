---
title: Portfolio
layout: collection
permalink: /portfolio/
collection: portfolio
author_profile: true
sort_by: order
sort_order: reverse
classes: wide
---

### Profile
---
<p class="profile-description">이곳은 포트폴리오 페이지입니다.</p>

<div class="portfolio-container">
  {% for item in site.portfolio %}
  <div class="portfolio-card" data-title="{{ item.title }}" data-content-id="portfolio{{ forloop.index }}">
    <div class="portfolio-image">
      <img src="{{ item.header.teaser }}" alt="{{ item.title }}">
    </div>
    <div class="portfolio-text">
      <h3>{{ item.title }}</h3>
      <p>{{ item.excerpt }}</p>
    </div>
  </div>
  {% endfor %}
</div>

<!-- 🔹 팝업 창 -->
<div id="popupOverlay" class="popupOverlay">
  <div class="popupContent">
    <span class="closePopupBtn">&times;</span>
    <h3 id="popupTitle" hidden="true"></h3>
    <p id="popupText"></p>
  </div>
</div>

<!-- 🔹 개별 프로젝트 내용 (숨김) -->
{% for item in site.portfolio %}
<div id="portfolio{{ forloop.index }}" class="popupHidden">
  {{ item.content | markdownify }} <!-- 🔹 Markdown 본문만 표시 -->
</div>
{% endfor %}

<style>
    .profile-description {
      font-family: "Pretendard"; /* author-profile에서 사용한 폰트 적용 */
      font-weight: 400;
      font-size: 16px; /* author-profile의 폰트 크기와 일관성 유지 */
      color: var(--text-color); /* 기존 텍스트 색상 유지 */
      margin-top: 10px;
    }
    /* 🔹 Portfolio 카드 디자인 */
    .portfolio-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      justify-content: flex-start;
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    /* 🔹 Portfolio 개별 카드 */
    .portfolio-card {
      width: 250px;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #f8f9fa;
      border-radius: 15px;
      overflow: hidden;
      text-align: center;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease-in-out;
      cursor: pointer;
    }

    .portfolio-card:hover {
      transform: scale(1.05);
    }

    /* 🔹 Portfolio 카드 내 이미지 스타일 */
    .portfolio-image {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }

    .portfolio-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* 🔹 Portfolio 카드 내용 스타일 */
    .portfolio-text {
      padding: 15px;
    }

    .portfolio-text h3 {
      margin: 10px 0;
      font-size: 18px;
      font-weight: bold;
    }

    .portfolio-text p {
      font-size: 14px;
      color: #666;
    }

    /* 🔹 기존 기본 리스트 스타일 제거
    .collection {
      display: none !important;
    } */

    /* 🔹 popupHidden 요소 완전 숨김 */
    .popupHidden {
      display: none !important;
      visibility: hidden;
      position: absolute;
      left: -9999px;
    }

    /* 🔹 a::before 요소 제거 */
    a::before {
        content: '';
        display: inline-block;
    }

    .masthead a::before {
        content: '';
    }

    /* 🔹 Sidebar 내부의 불필요한 ::before 요소 제거 */
    .sidebar a::before,
    .sidebar .author__avatar::before,
    .sidebar .author__name::before {
      content: none !important;
      display: none !important;
    }

    /* 🔹 팝업 스타일 */
    .popupOverlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    }
    
    .popupContent {
      background: #fff;
      padding: 20px;
      border-radius: 6px;
      max-width: 800px;
      width: 80vw;
      height: 80vh;
      max-height: 800px; /* 🔹 팝업 내부 최대 높이 설정 */
      overflow-y: auto; /* 🔹 팝업 내부 스크롤 가능 */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      position: relative;
      overflow-y: auto;
      scrollbar-width: thin; /* Firefox 스크롤바 크기 */
      scrollbar-color: #ccc transparent; /* 스크롤바 색상 */
    }
    /* Webkit 기반 브라우저 (Chrome, Edge, Safari) */
    .popupContent::-webkit-scrollbar {
      width: 8px; /* 스크롤바 두께 */
    }

    .popupContent::-webkit-scrollbar-track {
      background: transparent; /* 스크롤바 트랙 배경 */
      border-radius: 16px;
    }

    .popupContent::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.3); /* 스크롤바 색상 */
      border-radius: 16px; /* 둥근 모양 */
      transition: background 0.3s ease-in-out;
    }

    .popupContent::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.5);
    }

    /* Edge 브라우저 */
    .popupContent::-ms-scrollbar {
      width: 8px;
    }

    .popupContent::-ms-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 16px;
    }

    /* 🔹 팝업 닫기 버튼 */
    .closePopupBtn {
      position: absolute;
      top: 10px;
      right: 15px;
      cursor: pointer;
      font-size: 24px;
    }

    /* 🔹 팝업 내 갤러리 이미지 스타일 */
    .popup-gallery img {
      width: 100%;
      max-width: 400px;
      display: block;
      margin: 10px auto;
    }
</style>

<script>
    document.addEventListener("DOMContentLoaded", function() {
    console.log("📌 Portfolio Script Loaded");

    // 모든 article.archive__item 숨기기
    document.querySelectorAll('article.archive__item').forEach(item => {
        item.style.display = 'none';
        item.style.visibility = 'hidden';
        item.style.position = 'absolute';
        item.style.left = '-9999px';
    });

    // 팝업 관련 요소 가져오기
    const popupOverlay = document.getElementById('popupOverlay');
    const popupTitle = document.getElementById('popupTitle');
    const popupText = document.getElementById('popupText');
    const closePopupBtn = document.querySelector('.closePopupBtn');

    // 모든 포트폴리오 카드 가져오기
    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.getAttribute('data-title'); // 카드에서 타이틀 가져오기
            const contentId = this.getAttribute('data-content-id'); // 해당 프로젝트 내용 ID 가져오기
            const contentElement = document.getElementById(contentId); // 해당 콘텐츠 요소 가져오기
            
            if (!contentElement) {
                console.error(`❌ Error: ${contentId} 요소를 찾을 수 없음`);
                return;
            }

            console.log(`✅ ${title} 팝업 열기`);

            popupTitle.textContent = title;
            popupText.innerHTML = contentElement.innerHTML;

            popupText.innerHTML = contentElement.innerHTML; // 🔹 본문만 삽입
            popupOverlay.style.display = 'flex'; // 팝업 표시
            document.body.style.overflow = 'hidden';  // 배경 스크롤 막기
        });
    });

    // 팝업 닫기 버튼 이벤트
    closePopupBtn.addEventListener('click', function() {
        console.log("🛑 팝업 닫기");
        popupOverlay.style.display = 'none'; // 팝업 닫기
        document.body.style.overflow = 'auto';  // 배경 스크롤 복원
    });

    // 팝업 바깥 클릭 시 팝업 닫기
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            console.log("🛑 팝업 바깥 클릭 -> 팝업 닫기");
            popupOverlay.style.display = 'none'; // 팝업 닫기
            document.body.style.overflow = 'auto';  // 배경 스크롤 복원
        }
    });
});
</script>
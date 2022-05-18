# Infinite Carousel

> 다양한 방식의 무한 슬라이드를 구현할 수 있도록 모듈화한 Infinite Carousel

![Infinite Carousel 예시 이미지](https://user-images.githubusercontent.com/50618754/168975887-63fa19c1-e949-4d4a-b599-c94fc49bfa30.gif)  

# 🔨개발 환경

webpack, React, styld-components  

# ✨ 기능 목록

- 이전/다음 슬라이드 이동(버튼 클릭, 터치 swipe)
- 슬라이드 클릭 시 링크 이동
- 자동 슬라이드 on/off
- 무한 슬라이드 on/off
- 한 화면에 보여줄 슬라이드 개수 조정
- 슬라이드 간격 조정
- 이전,다음 슬라이드 미리보기 조정
- 시작 index 설정
- 슬라이드 애니메이션 속도 조정

# ☁️ options

| 옵션 명         |             설명              |    type     | 기본 값 |
| :-------------- | :---------------------------: | :---------: | :-----: |
| autoSlide       |         자동 슬라이드         |   boolean   |  true   |
| autoSlideSpeed  |    자동 슬라이드 전환 속도    |   number    |  2000   |
| imageFit        |          이미지 맞춤          |   string    | 'fill'  |
| infinite        |         무한 슬라이드         |   boolean   |  true   |
| previewMode     |  이전,다음 슬라이드 미리보기  |   boolean   |  true   |
| previewRatio    | 이전,다음 슬라이드 노출 비율  | number(0~1) |   0.5   |
| slideToShow     |  화면에 보여줄 슬라이드 개수  |   number    |    1    |
| slideMargin     |         슬라이드 간격         |   number    |   20    |
| startIndex      |          시작 index           |   number    |    0    |
| transitionSpeed | 슬라이드 전환 애니메이션 속도 |   number    |   500   |

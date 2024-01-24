![header](https://capsule-render.vercel.app/api?&type=waving&color=0:97FCFF,100:6EFCE9)

<div align="center">

# 오늘 뭐 입지? - TMI

### 테킷 멋쟁이사자처럼 프론트엔드 6기

## 프로젝트 개요

🗓️ 기획 기간 : 2023.09.02 ~ 2023.09.08<br/>
🗓️ 개발 기간 : 2023.09.09 ~ 2023.09.25<br/>
(web for PC)

[오늘 뭐 입지? (Today Mo Ipji?)](https://frontendschool6.github.io/TMI-TodayMoIpji/#/)

## 팀원 소개


|                 [김봉석(조장) ](https://github.com/NewBsk)                 |               [방서빈](https://github.com/seobinbang7)              |                [김진주(스크럼마스터)](https://github.com/pearlKinn)               |[권혜미](https://github.com/GwonH) |
| :---------------------------------------------------------------: | :---------------------------------------------------------------: | :----------------------------------------------------------------: | :----------------------------------------------------------------: |
| <img width="200" height="200" src="./samples/teamates/asj.png" /> | <img width="200" height="200" src="./samples/teamates/kbk.png" /> | <img width="200" height="200" src="./samples//teamates/kjj.png" /> |<img width="200" height="200" src="./samples//teamates/kjj.png" /> |

</div>


TMI는 외출시 온도/날씨에 따라 어떤 옷을 입어야 할지 고민하는 시간을 줄이기 위해 만든 웹 애플리케이션입니다.</br>
› 이 애플리케이션은 다른 사람들이 올린 옷차림을 통해 빠른 패션 선택을 도와주고 매일의 스타일링 고민을 덜어주어 편리성을 높이고 시간 절약에 도움을 줍니다

## 기술 스택

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logoColor=white">
<img src="https://img.shields.io/badge/zustand-00B67A?style=for-the-badge&logoColor=white">
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logoColor=white">
<img src="https://img.shields.io/badge/pocketbase-B8DBE4?style=for-the-badge&logoColor=white">
<img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logoColor=white">
<img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logoColor=white">

## 기능 설명

📍 현재위치의 온도에 맞춰서 오늘 입을 의상을 추천해주는 기능
![](https://velog.velcdn.com/images/pearlx_x/post/09d29541-b408-4920-80a7-ccb405adbaf4/image.gif)
</bg>
📍 자신의 OOTD를 올려서 사람들과 공유할 수 있습니다
![](https://velog.velcdn.com/images/pearlx_x/post/49878e79-5f8f-4c00-a904-bf805be610b7/image.gif)
</bg>
📍 회원 정보를 수정할 수 있습니다
![](https://velog.velcdn.com/images/pearlx_x/post/aafe4000-33d6-450f-a511-fff482f93482/image.gif)
</bg>
📍 댓글을 달아 사람들과 의견을 주고 받을 수 있습니다
![](https://velog.velcdn.com/images/pearlx_x/post/cfbf6bd2-7107-4774-8592-3f1976f0425c/image.gif)
</bg>
📍 로그인 기능
![](https://velog.velcdn.com/images/pearlx_x/post/bb2d5940-7167-46cf-aa62-2f9687746879/image.gif)
📍 회원가입 기능
![](https://velog.velcdn.com/images/pearlx_x/post/4166e23c-112a-4c25-9978-73c522b05036/image.gif)

## 폴더 구조

```
📦src
┣ 📂api
┃ ┣ 📜comment.js
┃ ┣ 📜openweathermap.js
┃ ┣ 📜pocketbase.js
┃ ┗ 📜post.js
┣ 📂assets
┣ 📂components
┃ ┣ 📂Button
┃ ┣ 📂DarkModeButton
┃ ┣ 📂EditPageButton
┃ ┣ 📂Feed
┃ ┣ 📂FeedItem
┃ ┣ 📂FileUpload
┃ ┣ 📂FollowButton
┃ ┣ 📂FormInput
┃ ┣ 📂Heading
┃ ┣ 📂Input
┃ ┣ 📂Loading
┃ ┣ 📂LoginButton
┃ ┣ 📂MoveSlide
┃ ┣ 📂MyItem
┃ ┣ 📂ProfileUpload
┃ ┣ 📂SearchBar
┃ ┣ 📂SpeechBubble
┃ ┣ 📂UserFeed
┃ ┣ 📂UserNickname
┃ ┣ 📂UserProfile
┃ ┣ 📂UserProfilePicture
┃ ┣ 📜GuestOnlyRoute.jsx
┃ ┣ 📜Heart.jsx
┃ ┣ 📜LoadingSpinner.jsx
┃ ┣ 📜Logo.jsx
┃ ┣ 📜ProtectRoute.jsx
┃ ┗ 📜Spinner.jsx
┣ 📂hooks
┃ ┣ 📜useCommentsMutation.js
┃ ┣ 📜useFeedItem.js
┃ ┣ 📜useFetchData.js
┃ ┣ 📜usePostQuery.js
┃ ┗ 📜useStorage.js
┣ 📂layout
┃ ┣ 📂FooterBar
┃ ┣ 📂Nav
┃ ┣ 📂RootLayout
┃ ┣ 📜FooterBar.jsx
┃ ┗ 📜HeaderBar.jsx
┣ 📂pages
┃ ┣ 📂Home
┃ ┣ 📂Mypage
┃ ┣ 📂Post
┃ ┣ 📂Suggestion
┃ ┣ 📂UserProfileEdit
┃ ┣ 📜GuestSetting.jsx
┃ ┣ 📜Mypage.jsx
┃ ┣ 📜SignIn.jsx
┃ ┣ 📜SignIn.module.css
┃ ┣ 📜SignUp.jsx
┃ ┣ 📜SignUp.module.css
┃ ┣ 📜User.jsx
┃ ┣ 📜Welcome.jsx
┃ ┣ 📜Welcome.module.css
┃ ┗ 📜Writing.jsx
┣ 📂store
┃ ┣ 📜auth.js
┃ ┗ 📜useSearchStore.js
┣ 📂swiper
┃ ┣ 📜MypageBodyTypeSlide.jsx
┃ ┣ 📜MypageSievingSlide.jsx
┃ ┣ 📜MypageStyleSlide.jsx
┃ ┗ 📜swiper-bundle.css
```

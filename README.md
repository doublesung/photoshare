# Photoshare

## 專案說明

[作品連結](https://doublesung.github.io/photoshare/)

「Photoshare」，是一個高質免費圖庫，採用前端技術為 Vue Cli，圖源為串接第三方 Pexels API，並搭配 Firebase Realtime Database 實現收藏功能。

## 核心功能

#### 無限滾動

頁面滾動到底部時，自動加載新圖片。

![](https://github.com/doublesung/photoshare/blob/gh-pages/infinite-scroll.gif)

#### 搜索功能

輸入關鍵字找到圖片後，可使用方向、尺寸、顏色進行篩選。

![](https://github.com/doublesung/photoshare/blob/gh-pages/search.gif)

#### 創建收藏

創建收藏並同時增加圖片到收藏中。

![](https://github.com/doublesung/photoshare/blob/gh-pages/add-collection.gif)

#### 下載項目

提供各種尺寸，挑選最符合需求的尺寸進行下載。

![](https://github.com/doublesung/photoshare/blob/gh-pages/download.gif)

#### 精選收藏

能夠自己建立收藏之外，也可以瀏覽別人建立的精美收藏。

![](https://github.com/doublesung/photoshare/blob/gh-pages/collection.gif)

## 專案前端技術

#### 框架

- Vue Cli (Vue 2)
- Vue Router
- Vuex
- vue-infinite-scroll
- vue-loading-overlay

#### 其他套件

- Masonry : 排列出響應式的瀑布流圖片
- Animate.css : 添加動態效果
- Bootstrap 5 : 刻出版面並且製作 RWD 響應式網頁
- Axios : 完成 Ajax 請求
- Firebase Realtime Database : 實現收藏功能

#### API

- Pexels : [API文檔連結](https://www.pexels.com/zh-tw/api/documentation/?language=javascript#photos-curated) (每一小時的請求上限為200次，超過會暫時無法請求，還請多多見諒)
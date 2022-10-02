<template>
  <div class="container-fluid px-3 px-lg-5 pt-7">
    <div class="d-flex flex-column align-items-center">
      <h1 class="">與「{{searchQuery}}」相關的{{isPhoto ? '照片' : '影片'}}</h1>
      <h5 :class="{'opacity-0': showTotalResult}" class="mt-3">找到{{totalResult}}個搜尋結果</h5>
      <!-- 頁面切換 -->
      <ul class="nav position-relative d-flex justify-content-center w-100">
        <div class="d-flex justify-content-center col-12 my-4 my-lg-5">
        <li class="nav-item">
          <router-link :to="{path: '/search/' + searchQuery}" class="nav-link">
            <button class="btn border-0 shadow-none rounded-4 fw-bold fs-4 px-3" type="button"
            :class="photoBtnClass" 
            >
              相片
            </button>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{path: '/search/video/' + searchQuery}" class="nav-link fs-4">
            <button class="btn border-0 shadow-none rounded-4 fw-bold fs-4 px-3" type="button"
            :class="videoBtnClass" 
            >
              影片
            </button>
          </router-link>
        </li>
        </div>
        <li class="nav-item position-lg-absolute d-flex align-items-center end-0 w-100 w-lg-auto h-100 mb-4">
          <button class="border border-1 text-primary rounded-4 w-100 px-3 py-2 d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse" 
          aria-expanded="false" aria-controls="directionCollapse sizeCollapse colorCollapse">
            <i class="svg-icon d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0H24V24H0z"/>
                <path d="M21 4v2h-1l-5 7.5V22H9v-8.5L4 6H3V4h18zM6.404 6L11 12.894V20h2v-7.106L17.596 6H6.404z"/>
              </svg>
            </i>
            <span class="ps-1">篩選</span>
          </button>
        </li>
      </ul>
    </div>
    <!-- 篩選 -->
    <div class="row">
      <!-- 方向 -->
      <div class="col-lg-4 col-12">
        <div class="collapse multi-collapse" id="directionCollapse">
          <div class="dropdown pb-4">
            <button class="bg-transparent border border-1 text-primary rounded-4 text-start w-100 py-2 px-4" type="button" id="directionCollapseButton" data-bs-toggle="dropdown" data-bs-offset="0,10" aria-expanded="false">
              {{currentDirection.text}}
            </button>
            <ul class="dropdown-menu w-100 rounded-4" aria-labelledby="directionCollapseButton">
              <li v-for="(direction, index) in directions" :key="index">
                <button class="bg-transparent border-0 text-primary text-start w-100 py-2 px-4" @click="searchDirection(direction)">
                  {{direction.text}}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 尺寸 -->
      <div class="col-lg-4 col-12">
        <div class="collapse multi-collapse" id="sizeCollapse">
          <div class="dropdown pb-4">
            <button class="bg-transparent border border-1 text-primary rounded-4 text-start w-100 py-2 px-4" type="button" id="sizeCollapseButton" data-bs-toggle="dropdown" data-bs-offset="0,10" aria-expanded="false">
              {{currnetSize.text}}
            </button>
            <ul class="dropdown-menu w-100 rounded-4" aria-labelledby="sizeCollapseButton">
              <li v-for="(size, index) in sizes" :key="index">
                <button class="bg-transparent border-0 text-primary text-start w-100 py-2 px-4" @click="searchSize(size)">
                  {{size.text}}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 顏色 -->
      <div class="col-lg-4 col-12">
        <div v-show="isPhoto" class="color-collapse collapse multi-collapse" id="colorCollapse">
          <div class="dropdown pb-4">
            <div class="d-flex align-items-center border border-1 rounded-4 ps-4 p-2" id="colorCollapseButton" data-bs-toggle="dropdown" data-bs-offset="0,10" aria-expanded="false">
              <div class="color-show me-2 rounded-circle" :style="{backgroundColor: hexBgColor}"></div>
              <span class="text-primary me-1">#</span>
              <input class="color-input bg-transparent border-0 text-primary rounded-4 text-start w-100" type="text" 
              placeholder="輸入 HEX 色碼" maxlength="6" v-model="currentColor"
              @keydown.enter="searchColor($event, '')" 
              >
              <div class="dropdown-menu w-100 rounded-4" aria-labelledby="colorCollapseButton">
                <ul class="dropdown-color-menu d-flex flex-wrap  px-4 my-3 w-100">
                  <li class="col-2" v-for="(color, index) in colors" :key="index"
                  :style="{'background-color': color}" @click="searchColor($event, color)"
                  >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MediaList ref="mediaList" @getMedia="getMedia"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {Dropdown} from 'bootstrap'
import MediaList from '../components/MediaList.vue'

export default {
  name: 'Search',
  components: {
    MediaList
  },
  computed: {
    ...mapState(['totalResult']),

    searchQuery() {
      return this.$route.params.query
    },
    // 是否路徑為相片
    isPhoto() {
      return !this.$route.path.includes('video')
    },
    photoBtnClass() {
      if(this.isPhoto) {
        return 'btn-secondary text-white'
      }else {
        return 'text-primary'
      }
    },
    videoBtnClass() {
      if(!this.isPhoto) {
        return 'btn-secondary text-white'
      }else {
        return 'text-primary'
      }
    },
    showTotalResult() {
      if(this.totalResult === '') {
        return true
      }else {
        return false
      }
    }
  },
  data() {
    return {
      page: 0,
      filterCondition: {
        orientation: '',
        size: '',
        color: ''
      },

      currentDirection: {
        text: '所有方向',
        value: 'allDirection'
      },
      directions: [
        {
          text: '所有方向',
          value: 'allDirection'
        },
        {
          text: '橫向',
          value: 'landscape'
        },
        {
          text: '縱向',
          value: 'portrait'
        },
        {
          text: '正方形',
          value: 'square'
        }
      ],

      currnetSize: {
        text: '所有尺寸',
        value: 'allSize'
      },
      sizes: [
        {
          text: '所有尺寸',
          value: 'allSize'
        },
        {
          text: '大',
          value: 'large'
        },
        {
          text: '中',
          value: 'medium'
        },
        {
          text: '小',
          value: 'small'
        }
      ],

      currentColor: '',
      oldColor: '',
      colors: [
        '#CCF3FC',
        '#D7B9FC',
        '#F0CED1',
        '#F9E7CB',
        '#E0E9CA',
        '#FFFFFF',
        // 第二行
        '#23C5EB',
        '#7311EB',
        '#CF3643',
        '#EA9B20',
        '#99C03A',
        '#959595',
        // 第三行
        '#00586D',
        '#2A005D',
        '#61030C',
        '#6A4000',
        '#3D5309',
        '#161616',
      ],
      hexBgColor: '',
    }
  },
  methods: {
    // 方向過濾搜尋
    searchDirection(direction) {
      if(this.currentDirection.value !== direction.value) {
        this.currentDirection = direction
      
        if(direction.text === '所有方向') {
          this.filterCondition.orientation = ''
        }else {
          this.filterCondition.orientation = direction.value
        }

        // this.getMedia()
        this.reload()
      }
    },
    // 尺寸過濾搜尋
    searchSize(size) {
      if(this.currnetSize.value !== size.value) {
        this.currnetSize = size
      
        if(size.text === '所有尺寸') {
          this.filterCondition.size = ''
        }else {
          this.filterCondition.size = size.value
        }
      
        this.reload()
      }
    },
    // 顏色過濾搜尋
    searchColor(event, color) {
      if(color) {
        // 直接選擇顏色
        this.currentColor = color.replace('#', '')
      }else {
        // input發生的事件
        const dropdown = new Dropdown(event.target)

        dropdown.hide()
        color = '#' + event.target.value
      }
  
      // 與上一次顏色不同並且為有效HEX色碼
      if(this.oldColor !== color && this.isHex()) {
        this.oldColor = color
        this.filterCondition.color = color.replace('#', '')
        this.reload()
      }
    },
    // 獲取相片或影片
    getMedia() {
      this.page++
      this.isPhoto ? this.getSearchPhotos() : this.getSearchVideos()
    },
    // 是否為有效HEX色碼
    isHex() {
      let color = '#' + this.currentColor

      const newDiv = document.createElement("div");

      document.body.appendChild(newDiv)
      newDiv.style.backgroundColor = color

      const background = newDiv.style.backgroundColor

      newDiv.remove()

      return background
    },
    // 請求相片
    getSearchPhotos() {
      this.$store.dispatch('getSearchPhotos', {
        page: this.page,
        query: this.searchQuery,
        orientation : this.filterCondition.orientation,
        size: this.filterCondition.size,
        color: this.filterCondition.color
      })
    },
    // 請求影片
    getSearchVideos() {
      this.$store.dispatch('getSearchVideos', {
        page: this.page,
        query: this.searchQuery,
        orientation : this.filterCondition.orientation,
        size: this.filterCondition.size,
      })
    },
    // 重新加載資料
    reload() {
      this.page = 0
      this.$refs.mediaList.media = []
      this.$refs.mediaList.oldMediaLength = 0

      let grid = document.querySelector('.grid')
      
      grid.style.height = 0

      this.$refs.mediaList.noMore = false
      this.$store.dispatch('setTotalResult', '')
      this.$refs.mediaList.loadMore()
    }
  }, 
  watch: {
    currentColor() {
      if(this.isHex()) {
        this.hexBgColor = '#' + this.currentColor
      }else {
        this.hexBgColor = ''
      }
    },
    isPhoto() {
      this.reload()
    },
    searchQuery() {
      this.reload()
    }
  },
  mounted() {
  },
}
</script>

<style scped lang='scss'>
ul.dropdown-menu {
  li {
    list-style-type: none;

    &:hover {
      background-color: rgba($color: #6c757d, $alpha: .1);
    }
  }
}

.color-collapse {
  .color-show {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
    border: solid 1px #6c757d;
  }

  .color-input {
    outline: none;
  }

  ul.dropdown-color-menu {
    li {
      list-style-type: none;
      height: 2rem;
      cursor: pointer;
      
      &:hover {
        border: solid 3px #FFFFFF;
      }
    }
  }
}
</style>
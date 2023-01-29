<template>
  <div class="container-flulid" style="margin-bottom: 100px">
    <div class="grid clearfix position-relative mn-xl-3 mn-2" @scroll="loadingItem($event)">
      <!-- 項目的columnWidth -->
      <div class="grid-sizer col-xxl-3 col-lg-4 col-6"></div>
      <!-- 項目 -->
      <div 
        class="grid-item col-xxl-3 col-lg-4 col-6 p-xl-3 p-2 " 
        v-for="(medium, index) in media" 
        :key="index"
      >
        <ItemPhoto 
          v-if="!medium.video_files" 
          @setMedium="updateMedium" 
          @showCollectionsModal="showCollectionsModal"
          :photo="medium" 
          :downloadMedium="downloadMedium"
        />
        <ItemVideo 
          v-else-if="medium.video_files" 
          @setMedium="updateMedium" 
          @showCollectionsModal="showCollectionsModal"
          :video="medium" 
          :downloadMedium="downloadMedium"
        />
      </div>
      <!-- loading -->
      <div 
        class="position-absolute d-flex justify-content-center align-items-center w-100" 
        style="height: 100px; z-index: -1"
        :style="{ top: loadingTop }"
      >
        <p v-if="isOverLimitRequest">同一時段的請求次數過多，請休息一下後再次嘗試！</p>
        <p v-else-if="isRequestError">獲取資料時發生錯誤，我們將會盡快修復！</p>
        <p v-else-if="noMore && !isCollection" class="m-0">沒有更多的照片或影片了!</p>
        <template v-if="!isOverLimitRequest && !isRequestError">
          <loading 
            v-if="media.length !== totalResult" 
            :active.sync="busy" 
            :z-index="0" 
            :is-full-page="false" 
            :opacity="0"
          >
            <div class="spinner-border text-secondary" role="status"></div>
          </loading>
        </template>
      </div>
    </div>
    <!-- Toast -->
    <Toast ref="toast" :medium="medium"/>
    <!-- MediaModal -->
    <MediaModal 
      v-if="medium" 
      ref="modal" 
      @goClearMedium="clearMedium" 
      :medium="medium" 
      :downloadMedium="downloadMedium"
    />
    <!-- 無限滾動 -->
    <div 
      v-infinite-scroll="loadMore" 
      infinite-scroll-disabled="busy" 
      infinite-scroll-distance="10"
    ></div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded'

import Toast from './components/Toast.vue'
import ItemPhoto from './components/ItemPhoto.vue'
import ItemVideo from './components/ItemVideo.vue'
import MediaModal from './components/MediaModal'

export default {
  name: 'MediaList',
  components: {
    MediaModal,
    Toast,
    ItemPhoto,
    ItemVideo
  },
  computed: {
    ...mapState(['newMedia', 'totalResult', 'isOverLimitRequest', 'isRequestError']),

    isCollection() {
      return this.$route.path.includes('collections')
    },
    media: {
      get: function() {
        return this.$store.state.media
      },
      set: function(newValue) {
        this.$store.state.media = newValue
      }
    }
  },
  data() {
    return {
      medium: null,
      loading: false,
      loadingTop: '0px',
      busy: false,
      oldMediaLength: 0,
      noMore: false
    }
  },
  methods: {
    // 顯示toast
    showToast() {
      this.$refs.toast.showToast()
    },
    // 瀑布流排列
    masonryImages() {
      const grid = document.querySelector('.grid')

      imagesLoaded( grid, () => {
        // 所有圖片加載完後執行
        new Masonry( grid, {
          itemSelector: '.grid-item',
          columnWidth: '.grid-sizer',
          percentPosition: true,
          transitionDuration: '.2s'
        })

        this.handleGridItemClass()
        this.busy = false
        this.loadingTop = grid.style.height ? grid.style.height : '0px'
      })
    },
    // 下載項目
    downloadMedium(url, name) {
      axios.get(url, { responseType: 'blob' })
      .then(response => {
        const downloadUrl = window.URL.createObjectURL(response.data)
        const link = document.createElement('a')

        document.body.appendChild(link)
        link.href = downloadUrl
        link.download = name
        link.click()
        link.remove()
        URL.revokeObjectURL(response.data)

        this.showToast()
      })
    },
    // 更新medium
    updateMedium(value) {
      this.medium = value

      this.$nextTick(() => {
        this.$refs.modal.photoModal.show()
      })
    },
    // 清除medium
    clearMedium() {
      this.medium = null
    },
    // 顯示收藏modal
    showCollectionsModal(value) {
      this.medium = value

      this.$nextTick(() => {
        this.$refs.modal.collectionsModal.show()
      })
    },
    // 加載照片或影片
    loadMore() {
      if (!this.isOverLimitRequest && !this.isRequestError || this.isCollection) {
        if (this.media.length !== this.totalResult) {
          const grid = document.querySelector('.grid')
    
          this.loadingTop = grid.style.height ? grid.style.height : '0px'

          this.busy = true
          this.$emit('getMedia')
        } else {
          setTimeout(() => {
            this.noMore = true
          }, 300)
        }
      }
    },
    // 新增與移除grid-item的class
    handleGridItemClass() {
      const newMediaArr = Array.from(document.querySelectorAll('.grid-item'))
      const newMediaLength = newMediaArr.length
      const oldMediaLength = this.oldMediaLength
      const newItemArr = newMediaArr.slice(oldMediaLength - newMediaLength)

      newItemArr.forEach(item => {
        item.classList.add('animate__animated', 'animate__slideInUp', 'animate__faster')
        item.style.visibility = 'visible'
        item.addEventListener('animationend', classHandle)
      })
      
      function classHandle() {
        newItemArr.forEach(item => {
          item.classList.remove('animate__animated', 'animate__slideInUp', 'animate__faster')
          item.removeEventListener('animationend', classHandle)
        })
      }

      this.oldMediaLength = newMediaLength
    }
  },
  watch: {
    newMedia() {
      setTimeout(() => {
        this.media.push.apply(this.media, this.newMedia)
        
        this.$nextTick(() => {
          const newMediaArr = Array.from(document.querySelectorAll('.grid-item'))
          const newMediaLength = newMediaArr.length
          const oldMediaLength = this.oldMediaLength
          const newItemArr = newMediaArr.slice(oldMediaLength - newMediaLength)

          newItemArr.forEach(item => {
            item.style.visibility = 'hidden'
          })
          
          this.masonryImages()
        })
      }, 500)
    }
  },
  destroyed() {
    this.$store.state.media = []
    this.$store.state.totalResult = null
  }
}
</script>

<style scoped lang="scss">
.container-image {
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: .3s ease;
  }

  .collection, .download {
    width: 40px;
    height: 40px;
  }

  .photographer, .collection, .download {
    opacity: 0;
    transition: .3s ease;
  }

  .photographer {
    .svg-icon-photographer {
      fill: #fff;
    }
  }

  &:hover {
    .overlay {
      opacity: 0.25;
    }

    .photographer, .collection, .download {
      opacity: 1;
    }
  }
}
</style>

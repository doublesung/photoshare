<template>
  <div class="container-flulid">
    <div class="grid clearfix mn-xl-3 mn-2" @scroll="loadingItem($event)">
      <!-- 項目的columnWidth -->
      <div class="grid-sizer col-xxl-3 col-lg-4 col-6"></div>
      <!-- 項目 -->
      <div class="grid-item col-xxl-3 col-lg-4 col-6 p-xl-3 p-2 " v-for="(medium, index) in media" :key="index">
        <PhotoItem v-if="!medium.video_files" @setMedium="updateMedium" @showCollectionsModal="showCollectionsModal"
        :photo="medium" :downloadMedium="downloadMedium"
        />
        <VideoItem v-else-if="medium.video_files" @setMedium="updateMedium" @showCollectionsModal="showCollectionsModal"
        :video="medium" :downloadMedium="downloadMedium"
        />
      </div>
    </div>
    <!-- Toast -->
    <Toast ref="toast" :medium="medium"/>
    <!-- MediaModal -->
    <MediaModal v-if="medium" ref="modal" @goClearMedium="clearMedium" :medium="medium" :downloadMedium="downloadMedium"/>
    <!-- 無限滾動 -->
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div>
    <!-- loading -->
    <div class="position-relative d-flex justify-content-center align-items-center" style="height: 100px">
      <p v-if="noMore && !isCollection" class="m-0">沒有更多的照片或影片了!</p>
      <loading v-if="media.length !== totalResult" :active.sync="busy" :z-index="0" :is-full-page="false" :opacity="0">
        <div class="spinner-border text-secondary" role="status"></div>
      </loading>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import Toast from './Toast.vue'
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded'
import PhotoItem from './PhotoItem.vue'
import VideoItem from './VideoItem.vue'
import MediaModal from './MediaModals/MediaModal.vue'

export default {
  name: 'MediaList',
  components: {
    MediaModal,
    Toast,
    PhotoItem,
    VideoItem
  },
  computed: {
    ...mapState(['newMedia', 'totalResult']),

    isCollection() {
      return this.$route.path.includes('collections')
    },
  },
  data() {
    return {
      medium: null,
      media: [],  
      loading: false,
      busy: false,
      oldMediaLength: 0,
      noMore: false,
    }
  },
  methods: {
    // 顯示toast
    showToast() {
      this.$refs.toast.showToast()
    },
    // 瀑布流排列
    masonryImages() {
      let grid = document.querySelector('.grid')

      imagesLoaded( grid, () => {
        // 所有圖片加載完後執行
        new Masonry( grid, {
          itemSelector: '.grid-item',
          columnWidth: '.grid-sizer',
          percentPosition: true,
          transitionDuration: '.2s'
        })

        this.handleGridItemClass()
        this.busy = false;
      })
    },
    // 下載項目
    downloadMedium(url, name) {
      axios.get(url, {responseType: 'blob'})
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
      this.$nextTick(()=> {
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
      if(this.media.length !== this.totalResult) {
        this.busy = true;
        this.$emit('getMedia')
      }else {
        setTimeout(() => {
          this.noMore = true
        }, 300)
      }
    },
    // 新增與移除grid-item的class
    handleGridItemClass() {
      let newMediaArr = Array.from(document.querySelectorAll('.grid-item'))
      let newMediaLength = newMediaArr.length
      let oldMediaLength = this.oldMediaLength
      let newItemArr = newMediaArr.slice(oldMediaLength - newMediaLength)

      for (let i = 0; i < newItemArr.length; i++) {
        newItemArr[i].classList.add('animate__animated', 'animate__slideInUp', 'animate__faster')
        newItemArr[i].style.visibility = 'visible'

        newItemArr[i].addEventListener('animationend', classHandle)
      }
      
      function classHandle() {
        for (let i = 0; i < newItemArr.length; i++) {
          newItemArr[i].classList.remove('animate__animated', 'animate__slideInUp', 'animate__faster')

          newItemArr[i].removeEventListener('animationend', classHandle)
        }
      }

      this.oldMediaLength = newMediaLength
    }
  },
  watch: {
    newMedia: {
      handler() {
        setTimeout(() => {
           
          this.media.push.apply(this.media, this.newMedia)
         
          this.$nextTick(() => {
            let newMediaArr = Array.from(document.querySelectorAll('.grid-item'))
            let newMediaLength = newMediaArr.length
            let oldMediaLength = this.oldMediaLength
            let newItemArr = newMediaArr.slice(oldMediaLength - newMediaLength)

            for (let i = 0; i < newItemArr.length; i++) {
              newItemArr[i].style.visibility = 'hidden'
            }
            
            this.masonryImages();
          })

        }, 500)
      },
    }
  },
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

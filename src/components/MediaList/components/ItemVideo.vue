<template>
  <div 
    class="container-image position-relative" 
    @mouseenter="palyVideo($event)" 
    @mouseleave="pauseVideo($event)"
  >
    <!-- 影片 -->
    <div class="position-relative rounded-4 overflow-hidden">
      <img class="image mw-100" :src="imageUrl" alt="photo.alt" loading="lazy">
      <video class="w-100 h-auto position-absolute start-0" preload="none" muted loop>
          <source :src="videoUrl" type="video/mp4">
      </video>
    </div>
    <div 
      class="overlay rounded-4 bg-dark" 
      type="button"
      @click="setVideo"></div>
    <!-- 影片icon -->
    <i class="ri-youtube-fill text-white position-absolute top-0 start-0 mx-3 mt-1 fs-1"></i>
    <!-- 攝影師 -->
    <div class="photographer position-absolute bottom-0 start-0 m-3 text-white d-none d-sm-block">
      <i class="svg-icon-photographer me-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
          <path fill="none" d="M0 0h24v24H0z"/>
          <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM6.023 15.416C7.491 17.606 9.695 19 12.16 19c2.464 0 4.669-1.393 6.136-3.584A8.968 8.968 0 0 0 12.16 13a8.968 8.968 0 0 0-6.137 2.416zM12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        </svg>
      </i>
      <span>{{ video.user.name }}</span>
    </div>
    <!-- 收藏清單 -->
    <button 
      type="button" 
      class="
        collection position-absolute top-0 end-0 m-3 d-flex justify-content-center 
        align-items-center rounded-4 border-0 d-none d-sm-block
      " 
      @click="showCollectionsModal"
    >
      <i class="ri-folder-add-line fs-4 fw-normal text-primary"></i>
    </button>
    <!-- 下載 -->
    <button 
      type="button" 
      class="
        download position-absolute bottom-0 end-0 m-3 d-flex justify-content-center 
        align-items-center rounded-4 border-0 d-none d-sm-block
      "
      @click="downloadVideo"
    >
      <i class="ri-download-2-line fs-4 fw-normal text-primary"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'VideoItem',
  props: {
    video: {
      type: Object
    },
    downloadMedium: {
      type: Function
    }
  },
  data() {
    return {
      isPlaying : null,
      timer: null,
      imageUrl: null,
      videoUrl: null
    }
  },
  methods: {
    // 播放影片
    palyVideo(e) { 
      const video = e.target.firstChild.lastChild

      // 滑鼠停留1秒後會自動播放影片
      if (!video.hasAttribute('autoplay')) {
        this.timer = setTimeout(() => {
          video.setAttribute('autoplay', 'autoplay')

          this.isPlaying = video.play()
        }, 1000)
      } else {
        // 自動播放過的影片 當滑鼠停留會立即播放
        this.isPlaying = video.play()
      }
    },
    // 暫停影片
    pauseVideo(e) {
      const video = e.target.firstChild.lastChild
      // 清除計時
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = 0
      }

      if (this.isPlaying) {
        this.isPlaying.then(() => {
          if (!video.paused) video.pause()
        })
      }
    },
    // 下載影片
    downloadVideo() {
      let url = this.videoUrl
      let id = this.video.user.id
      let photographer = this.video.user.name.replace(' ', '-')

      let name = 'photoshare' + '-' + photographer + '-' + id + '.mp4'

      this.downloadMedium(url, name)
    },
    // 計算圖片寬高
    setImageUrlSize() {
      const imageUrl = this.video.image
      const splitImageUrl = imageUrl.substring(0, imageUrl.indexOf('h='))
      const video = this.getVideo()
      const newImageUrl = splitImageUrl + 'h=' + video.height + '&w=' + video.width
  
      this.imageUrl = newImageUrl
    },
    // 獲取影片
    getVideo() {
      const videoArr = this.video.video_files

      // 排列影片尺寸
      const sizeArr = videoArr.sort((a, b) => a.width - b.width)
      
      return sizeArr[2]
    },
    // 影片網址
    setVideoUrl() {
      const video = this.getVideo()

      this.videoUrl = video.link
    },
    // 傳送video到MediaList
    setVideo() {
      this.$emit('setMedium', this.video)
    },
    // 顯示收藏modal
    showCollectionsModal() {
      this.$emit('showCollectionsModal', this.video)
    }
  },
  mounted() {
    this.setImageUrlSize()
    this.setVideoUrl()
  }
}
</script>

<style scoped lang="scss">
.container-image {
  .image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

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

  .svg-icon-video {
    fill: #fff;
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
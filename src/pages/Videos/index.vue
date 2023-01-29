<template>
  <div>
    <header class="position-relative">
      <div class="header-video">
        <video :src="videoCover.url" autoplay muted loop></video>
      </div>
      <div 
        class="
          position-absolute top-50 start-50 translate-middle d-flex 
          flex-column align-items-center text-white text-nowrap
        "
      >
        <h1>提供免費的照片及影片</h1>
        <h2>創作者分享的最優質圖庫</h2>
      </div>
      <div class="position-absolute bottom-0 end-0 px-3 px-lg-5">
        <p class="text-white opacity-75">
          <span>攝影師:</span>
          <span class="ms-2">{{ videoCover.photographer }}</span>
        </p>
      </div>
    </header>
    <main class="px-3 px-lg-5">
      <ul class="nav d-flex justify-content-center align-items-center my-4 my-lg-5">
        <li class="nav-item">
          <router-link to="/photos" class="nav-link">
            <button 
              class="btn border-0 text-primary shadow-none fw-bold fs-4 px-3" 
              type="button"
            >
              相片
            </button>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/videos" class="nav-link fs-4">
            <button 
              class="btn btn-secondary text-white border-0 shadow-none rounded-4 fw-bold fs-4 px-3" 
              type="button"
            >
              影片
            </button>
          </router-link>
        </li>
      </ul>
      <p class="mb-4 mb-lg-5 fs-4">免費圖庫相片</p>
      <MediaList @getMedia="getMedia"/>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MediaList from '../../components/MediaList'

export default {
  name: 'Videos',
  computed: {
    ...mapState(['videoCover'])
  },
  data() {
    return {
      page: 1
    }
  },
  components: {
    MediaList
  },
  methods: {
    // 獲取封面
    getVideoCover() {
      const id = Math.floor(Math.random() * 3 + 1)

      // this.$store.dispatch('getVideoCover', id)
      this.$store.dispatch('getCover', { 
        id, 
        path: 'videoCovers' 
      })
    },
    // 獲取影片
    getMedia() {
      this.page++
      this.$store.dispatch('getFeaturedVideos', { page: this.page })
    }
  },
  mounted() {
    this.getVideoCover()
  }
}
</script>

<style scoped lang="scss">
.header-video {
  height: 500px;
  
  video {
    object-fit: cover;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .2)
  }
}
</style>
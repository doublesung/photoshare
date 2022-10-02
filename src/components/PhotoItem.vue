<template>
  <div class="container-image position-relative">
    <!-- 圖片 -->
    <img class="image mw-100 rounded-4" :src="photo.src.large" alt="photo.alt" loading="lazy">
    <div class="overlay rounded-4 bg-dark" type="button"
    @click="setPhoto"></div>
    <!-- 攝影師 -->
    <div class="photographer position-absolute bottom-0 start-0 m-3 text-white d-none d-sm-block">
      <i class="svg-icon-photographer me-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
          <path fill="none" d="M0 0h24v24H0z"/>
          <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM6.023 15.416C7.491 17.606 9.695 19 12.16 19c2.464 0 4.669-1.393 6.136-3.584A8.968 8.968 0 0 0 12.16 13a8.968 8.968 0 0 0-6.137 2.416zM12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        </svg>
      </i>
      <span>{{photo.photographer}}</span>
    </div>
    <!-- 收藏清單 -->
    <button type="button" class="collection position-absolute top-0 end-0 m-3 d-flex justify-content-center 
    align-items-center rounded-4 border-0 d-none d-sm-block" @click="showCollectionsModal"
    >
      <i class="ri-folder-add-line fs-4 fw-normal text-primary"></i>
    </button>
    <!-- 下載 -->
    <button type="button" class="download position-absolute bottom-0 end-0 m-3 
    d-flex justify-content-center align-items-center rounded-4 border-0 d-none d-sm-block"
    @click="downloadImage"
    >
      <i class="ri-download-2-line fs-4 fw-normal text-primary"></i>
    </button>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'PhotoItem',
  props: {
    photo: {
      type: Object
    },
    downloadMedium: {
      type: Function
    }
  },
  computed: {
    ...mapState(['medium'])
  },
  methods: {
    // 下載圖片
    downloadImage() {
      let url = this.photo.src.original
      let id = this.photo.id
      let photographer = this.photo.photographer.replace(' ', '-')

      let name = 'photoshare' + '-' + photographer + '-' + id + '.jpg'

      this.downloadMedium(url, name)
    },
    // 傳送photo到MediaList
    setPhoto() {
      this.$emit('setMedium', this.photo)
    },
    // 顯示收藏modal
    showCollectionsModal() {
      this.$emit('showCollectionsModal', this.photo)
    }
  },
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
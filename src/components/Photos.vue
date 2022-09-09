<template>
  <div class="container-flulid">
    <div class="row gx-3 gx-sm-4">
      <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
        <div class="w-100 mb-3 mb-sm-4" v-for="(photoURL, index) in list1" :key="index">
          <img class="w-100 rounded-4" :src="photoURL" alt="" loading="lazy">
        </div>
      </div>
      <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
        <div class="container-image w-100 mb-3 mb-sm-4 position-relative" v-for="(photoURL, index) in list1" :key="index">
          <img class="w-100 rounded-4" :src="photoURL" alt="" loading="lazy">
          <div class="overlay rounded-4 bg-dark"></div>
          <div class="photographer position-absolute bottom-0 start-0 m-3 text-white d-none d-sm-block">
            <img src="" alt="">
            <span>name</span>
          </div>
          <button type="button" class="collection bg-white position-absolute top-0 end-0 m-3 d-flex justify-content-center align-items-center 
          rounded-4 border-0 d-none d-sm-block">
            <i class="ri-folder-add-line fw-normal text-primary"></i>
          </button>
          <button type="button" class="download bg-white position-absolute bottom-0 end-0 m-3 d-flex justify-content-center align-items-center 
          rounded-4 border-0 d-none d-sm-block">
            <i class="ri-download-2-line fw-normal text-primary"></i>
          </button>
        </div>
      </div>
      <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
        <div class="w-100 mb-3 mb-sm-4" v-for="(photoURL, index) in list1" :key="index">
          <img class="w-100 rounded-4" :src="photoURL" alt="" loading="lazy">
        </div>
      </div>
      <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
        <div class="w-100 mb-3 mb-sm-4" v-for="(photoURL, index) in list1" :key="index">
          <img class="w-100 rounded-4" :src="photoURL" alt="" loading="lazy">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'

export default {
  name: 'Photos',
  props: {
  },
  computed: {
    ...mapState(['photos', 'yes'])
  },
  data() {
    return {
      yoo: null,
      list1: [
        "https://tour.taitung.gov.tw/image/26556/1024x768",
        "http://vcdnb.huoying666.com/images/2021/1212/c3d551f63ba1a0d121dcd51b53932078/c3d551f63b.jpg_home-image-640",
        "https://tour.taitung.gov.tw/image/26556/1024x768",
        "http://vcdnb.huoying666.com/images/2021/1212/c3d551f63ba1a0d121dcd51b53932078/c3d551f63b.jpg_home-image-640",
        "https://tour.taitung.gov.tw/image/26556/1024x768",
        "http://vcdnb.huoying666.com/images/2021/1212/c3d551f63ba1a0d121dcd51b53932078/c3d551f63b.jpg_home-image-640",
      ]
    }
  },
  methods: {
    test() {
      axios({
        method: 'get',
        url: 'https://api.pexels.com/v1/curated',
        headers: {
          Authorization: '563492ad6f917000010000013c632f2578244bb3a86a6da7c961215c'
        }
      })
      .then(function(response) {
        return response
      })
    },
  },
  mounted() {
    this.$store.dispatch('getChosenPhotos')
    // this.$store.dispatch('getChosenPhotos', {page: 1})
  },
}
</script>

<style scoped lang="scss">
.container-image {
  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: .3s ease;
  }

  .collection, .download {
    width: 40px;
    height: 40px;
    i {
      font-size: 22px;
    }
  }

  .photographer, .collection, .download {
    opacity: 0;
    transition: .3s ease;
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

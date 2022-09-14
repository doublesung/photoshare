<template>
  <div class="container-flulid">
    <div class="grid clearfix mn-xl-3 mn-2">
      <!-- 設定元素的 columnWidth -->
      <div class="grid-sizer col-xxl-3 col-lg-4 col-6"></div>
      <!-- 元素 width w-xxl-23 w-lg-31 w-48-->
      <div class="d-flex">
        <div class="grid-item col-xxl-3 col-lg-4 col-6 p-xl-3 p-2" v-for="(photoURL, index) in list1" :key="index">
          <div class="container-image position-relative">
            <img class="mw-100 rounded-4" :src="photoURL" alt="" loading="lazy">
            <div class="overlay rounded-4 bg-dark" type="button" data-bs-toggle="modal" data-bs-target="#photoModal"></div>
            <div class="photographer position-absolute bottom-0 start-0 m-3 text-white d-none d-sm-block">
              <img class="rounded-circle me-2" src="https://images.pexels.com/users/avatars/3798027/koolshooters-805.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=1" alt="">
              <span>name</span>
            </div>
            <button type="button" class="collection bg-white position-absolute top-0 end-0 m-3 d-flex justify-content-center align-items-center 
            rounded-4 border-0 d-none d-sm-block" data-bs-toggle="modal" data-bs-target="#collectionsModal">
              <i class="ri-folder-add-line fs-4 fw-normal text-primary"></i>
            </button>
            <a href="https://images.pexels.com/photos/8106641/pexels-photo-8106641.jpeg?cs=srgb&dl=pexels-amusan-8106641.jpg&fm=jpg" download>
            <button type="button" class="download bg-white position-absolute bottom-0 end-0 m-3 
            d-flex justify-content-center align-items-center rounded-4 border-0 d-none d-sm-block">
              <i class="ri-download-2-line fs-4 fw-normal text-primary"></i>
            </button>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- Toast -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div id="liveToast" class="toast bg-white border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="2000">
        <div class="toast-header">
          <strong class="me-auto">下載成功</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          感謝 xxxxx 提供的優質照片!
        </div>
      </div>
    </div>

    <Modals/>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import Masonry from 'masonry-layout';
import imagesLoaded from '../../node_modules/imagesloaded/imagesloaded.pkgd';

import Modals from './Modals.vue'

import {Toast} from 'bootstrap'

export default {
  name: 'Photos',
  components: {
    Modals
  },
  props: {
  },
  computed: {
    ...mapState(['photos'])
  },
  data() {
    return {
      list1: [
        "https://tour.taitung.gov.tw/image/26556/1024x768",
        "http://vcdnb.huoying666.com/images/2021/1212/c3d551f63ba1a0d121dcd51b53932078/c3d551f63b.jpg_home-image-640",
        "https://tour.taitung.gov.tw/image/26556/1024x768",
        "http://vcdnb.huoying666.com/images/2021/1212/c3d551f63ba1a0d121dcd51b53932078/c3d551f63b.jpg_home-image-640",
        "https://tour.taitung.gov.tw/image/26556/1024x768",
        "http://vcdnb.huoying666.com/images/2021/1212/c3d551f63ba1a0d121dcd51b53932078/c3d551f63b.jpg_home-image-640",
        "https://tour.taitung.gov.tw/image/26556/1024x768",
        "http://vcdnb.huoying666.com/images/2021/1212/c3d551f63ba1a0d121dcd51b53932078/c3d551f63b.jpg_home-image-640",
        "https://tour.taitung.gov.tw/image/26556/1024x768",
        "http://vcdnb.huoying666.com/images/2021/1212/c3d551f63ba1a0d121dcd51b53932078/c3d551f63b.jpg_home-image-640",
      ],
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
    showToast() {
      let toastLiveExample = document.getElementById('liveToast')
      let toast = new Toast(toastLiveExample)
      toast.show()
    }
  },
  mounted() {
    // this.$store.dispatch('getChosenPhotos')
    // this.$store.dispatch('getChosenPhotos', {page: 1})
    var grid = document.querySelector('.grid');

    var msnry = new Masonry( grid, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });

    imagesLoaded( grid ).on( 'progress', function() {
      // 圖片加載完畢後布局
      msnry.layout();
      
    });
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
    img {
      width: 40px;
      height: 40px;
      object-fit: contain
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

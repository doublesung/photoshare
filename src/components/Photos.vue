<template>
  <div class="container-flulid">
    <div class="grid clearfix">
      <!-- 設定元素的 columnWidth -->
      <div class="grid-sizer w-xxl-25 w-lg-33 w-50"></div>
      <!-- 元素 width -->
      <div class="grid-item container-image w-xxl-23 w-lg-31 w-48" 
      v-for="(photoURL, index) in list1" :key="index">
        <img class=" mw-100 rounded-4" :src="photoURL" alt="" loading="lazy">
        <div class="overlay rounded-4 bg-dark"> 123</div>
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
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import Masonry from 'masonry-layout';
import imagesLoaded from '../../node_modules/imagesloaded/imagesloaded.pkgd';

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
        "https://tour.taitung.gov.tw/image/26556/1024x768",
        "http://vcdnb.huoying666.com/images/2021/1212/c3d551f63ba1a0d121dcd51b53932078/c3d551f63b.jpg_home-image-640",
        "https://tour.taitung.gov.tw/image/26556/1024x768",
        "http://vcdnb.huoying666.com/images/2021/1212/c3d551f63ba1a0d121dcd51b53932078/c3d551f63b.jpg_home-image-640",
      ],
      cool: true
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

.grid {
  margin-right: -2%;
  .grid-item {
    margin-bottom: 2%;
  }
}
</style>

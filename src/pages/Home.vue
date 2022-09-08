<template>
  <div>
    <Navbar class="cool"/>
    <header class="position-relative">
      <div class="header-image"></div>
      <div class="position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center text-white text-nowrap">
        <h1>提供免費的照片及影片</h1>
        <h2>創作者分享的最優質圖庫</h2>
      </div>
      <a href="#"
      class="position-absolute bottom-0 end-0 px-3 px-lg-5">
        <p class="text-white opacity-75">
          <span>作者:</span>
          <span class="ms-2">我是照片作者喔</span>
        </p>
      </a>
    </header>
    <main class="px-3 px-lg-5">
      <ul class="nav justify-content-center my-4 my-lg-5 position-relative">
        <li class="nav-item">
          <a class="nav-link fs-4 text-active" aria-current="page" href="#">相片</a>
        </li>
        <li class="nav-item">
          <a class="nav-link fs-4" href="#">影片</a>
        </li>
      </ul>
      <p class="mb-5 fs-4">免費圖庫相片</p>
      <Photos/>
    </main>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Photos from '../components/Photos.vue'

export default {
  name: 'Home',
  props: {
    msg: String
  },
  data() {
    return {
      
    }
  },
  components: {
    Navbar,
    Photos
  },
  methods: {
    
  },
  mounted() {

  },
  
}
</script>

<style scoped lang="scss">
.header-image {
  height: 500px;
  background-color: rgba(0, 0, 0, .4);
  background-blend-mode: multiply;
  background-image: url(https://images.pexels.com/photos/13327590/pexels-photo-13327590.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=5000);
  background-size: auto 500px;
  background-position: center center;
}

</style>

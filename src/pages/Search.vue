<template>
  <div class="container-fluid px-3 px-lg-5 pt-7 d-flex flex-column align-items-center" >
    
    <h1 class="">與「台灣」相關的照片</h1>
    <ul class="nav my-4 my-lg-5 position-relative">
      <li class="nav-item">
        <a class="nav-link fs-4 text-active" aria-current="page" href="#">相片</a>
      </li>
      <li class="nav-item">
        <a class="nav-link fs-4" href="#">影片</a>
      </li>
    </ul>
    <Photos/>
  </div>
</template>

<script>
import Photos from '../components/Photos.vue'

export default {
  name: 'Search',
  components: {
    Photos
  }
}
</script>

<style scped lang='scss'>
</style>
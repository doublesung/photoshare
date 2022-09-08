<template>
  <div class="container-flulid">
    <div class="row gx-4">
      <div class="col-3">
        <div class="w-100 mb-4" v-for="(photoURL, index) in list1" :key="index">
          <img class="w-100 rounded-4" :src="photoURL" alt="" loading="lazy">
        </div>
      </div>
      <div class="col-3">
        <div class="w-100 mb-4" v-for="(photoURL, index) in list1" :key="index">
          <img class="w-100 rounded-4" :src="photoURL" alt="" loading="lazy">
        </div>
      </div>
      <div class="col-3">
        <div class="w-100 mb-4" v-for="(photoURL, index) in list1" :key="index">
          <img class="w-100 rounded-4" :src="photoURL" alt="" loading="lazy">
        </div>
      </div>
      <div class="col-3">
        <div class="w-100 mb-4" v-for="(photoURL, index) in list1" :key="index">
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

</style>

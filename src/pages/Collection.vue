<template>
  <div class="container-fluid px-3 px-lg-5 pt-7" v-show="!isLoading">
  <!-- <div class="container-fluid px-3 px-lg-5 pt-7" v-show="!isLoading || isPexel"> -->
    <!-- 標題及按鈕 -->
    <div class="mb-5">
      <div class="position-relative d-flex flex-wrap justify-content-center w-100">
        <p class="title col-12 text-center mb-lg-0 mb-4 fs-1">{{collection.title}}</p>
        <div v-if="!isPexel" class="position-lg-absolute d-flex justify-content-center align-items-center end-0 w-100 w-lg-auto h-100">
          <button class="border border-1 text-primary rounded-4 px-3 py-2 me-3 d-flex align-items-center" type="button" data-bs-toggle="modal" data-bs-target="#eidtCollectionModal">
            <i class="svg-icon d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M6.414 16L16.556 5.858l-1.414-1.414L5 14.586V16h1.414zm.829 2H3v-4.243L14.435 2.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 18zM3 20h18v2H3v-2z"/>
              </svg>
            </i>
            <span class="ps-1">編輯</span>
          </button>
          <button class="border border-1 text-primary rounded-4 px-3 py-2 d-flex align-items-center" type="button" data-bs-toggle="modal" data-bs-target="#deleteCollectionModal">
            <i class="svg-icon d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"/>
              </svg>
            </i>
            <span class="ps-1">刪除</span>
          </button>
        </div>
      </div>
      <p class="text-center mt-3 fs-5">{{collection.description}}</p>
    </div>
    <!-- 編輯收藏 -->
    <eidtCollectionModal :collection="collection"/>
    <!-- 刪除收藏 -->
    <deleteCollectionModal :collection="collection"/>

    <MediaList ref="mediaList" @getMedia="getMedia"/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import MediaList from '../components/MediaList.vue'
import eidtCollectionModal from '../components/CollectionModals/eidtCollectionModal.vue'
import deleteCollectionModal from '../components/CollectionModals/deleteCollectionModal.vue'


export default {
  name: 'Collection',
  components: {
    MediaList,
    eidtCollectionModal,
    deleteCollectionModal
  },
  computed: {
    ...mapState(['collection', 'featuredCollections']),

    isPexel() {
      if(this.$route.params.collectionName.length >= 7) {
        return true
      }else {
        return false
      }
    },
    id() {
      return this.$route.params.collectionName
    }
  },
  data() {
    return {
      isLoading: true,
      page: 0,
      // id: this.$route.params.collectionName
    }
  },
  methods: {
    // 獲取collection
    getMedia() {
      this.page++

      if(this.isPexel) {
        // 向pexel發送請求

        let featuredCollections = this.featuredCollections

        for (let i = 0; i < featuredCollections.length; i++) {
          if(featuredCollections[i].id === this.id) {
            this.$store.dispatch('setColletion', featuredCollections[i])
          }
        }

        this.$store.dispatch('getCollectionPexel', {id: this.id, page: this.page})
      }else {
        // 向json-server發送請求
        
        this.$store.dispatch('getCollectionJsonSever', this.id)
      }
    },
    // 重新加載資料
    reload() {
      this.page = 0
      this.$refs.mediaList.media = []
      
      let grid = document.querySelector('.grid')
      
      grid.style.height = 0

      this.$refs.mediaList.noMore = false
      this.$store.dispatch('setTotalResult', '')
      this.$refs.mediaList.loadMore()
    }
  },
  watch: {
    collection(newValue) {
      if(newValue.title) this.isLoading = false
    },
    id() {
      this.reload()
    }
  }
}
</script>

<style scoped lang='scss'>
.title {
  width: 50%;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
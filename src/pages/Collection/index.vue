<template>
  <div>
    <div v-show="!isLoading" class="container-fluid px-3 px-lg-5 pt-7">
      <!-- 標題及按鈕 -->
      <div class="mb-5">
        <div class="position-relative d-flex flex-wrap justify-content-center w-100">
          <p class="title col-12 text-center mb-lg-0 mb-4 fs-1">{{ collection.title }}</p>
          <div 
            v-if="!isFeatured" 
            class="
              position-lg-absolute d-flex justify-content-center 
              align-items-center end-0 w-100 w-lg-auto h-100
            "
          >
            <button 
              class="border border-1 text-primary rounded-4 px-3 py-2 me-3 d-flex align-items-center" 
              type="button" 
              data-bs-toggle="modal" 
              data-bs-target="#collectionModalEdit"
            >
              <i class="svg-icon d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path d="M6.414 16L16.556 5.858l-1.414-1.414L5 14.586V16h1.414zm.829 2H3v-4.243L14.435 2.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 18zM3 20h18v2H3v-2z"/>
                </svg>
              </i>
              <span class="ps-1">編輯</span>
            </button>
            <button 
              class="border border-1 text-primary rounded-4 px-3 py-2 d-flex align-items-center" 
              type="button" 
              data-bs-toggle="modal" 
              data-bs-target="#collectionModaDelete"
            >
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
        <p class="text-center mt-3 fs-5">{{ collection.description }}</p>
      </div>
      <!-- 編輯收藏 -->
      <CollectionModalEdit :collection="collection"/>
      <!-- 刪除收藏 -->
      <CollectionModaDelete :collection="collection"/>

      <MediaList ref="mediaList" @getMedia="getMedia"/>
    </div>
    <loading :active.sync="isLoading" :z-index="0" :opacity="1">
      <div class="spinner-border text-secondary" role="status"></div>
    </loading>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MediaList from '../../components/MediaList'
import CollectionModalEdit from './components/CollectionModalEdit.vue'
import CollectionModaDelete from './components/CollectionModaDelete.vue'

export default {
  name: 'Collection',
  components: {
    MediaList,
    CollectionModalEdit,
    CollectionModaDelete
  },
  computed: {
    ...mapState(['collection', 'featuredCollections']),

    id() {
      return this.$route.params.id
    },
    isFeatured() {
      return this.$route.meta.isFeatured
    }
  },
  data() {
    return {
      isLoading: true,
      page: 0
    }
  },
  methods: {
    // 獲取collection
    getMedia() {
      this.page++
      
      if (this.isFeatured) {
        // 向pexel發送請求
        const collection = this.featuredCollections.find(collection => {
          return collection.id === this.id
        })

        this.$store.dispatch('getCollectionPexel', { 
          id: this.id, 
          page: this.page,
          collection
        })
      } else {
        // 向firebase發送請求
        this.$store.dispatch('getCollectionFirebase', this.id)
      }

      this.isLoading = false
    },
    // 重新加載資料
    resetData() {
      const grid = document.querySelector('.grid')
      
      grid.style.height = 0

      this.page = 0

      this.$store.state.media = []
      this.$store.state.totalResult = null

      this.$refs.mediaList.noMore = false
      this.$refs.mediaList.loadMore()
    }
  },
  watch: {
    id() {
      this.resetData()
    }
  },
  mounted() {
    // 獲取所有collection
    this.$store.dispatch('getCollections')
  }
}
</script>

<style scoped lang="scss">
.title {
  width: 50%;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
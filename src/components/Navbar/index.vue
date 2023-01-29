<template>
  <nav class="navbar navbar-expand-lg navbar-light position-fixed w-100 bg-white shadow-sm py-3">
    <div class="container-fluid px-3 px-lg-5 flex-nowrap">
      <!-- logo與網頁名 -->
      <router-link to="/photos">
        <div class="d-flex justify-content-center">
          <div class="me-sm-2 me-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
              <path style="fill: #407bff;" d="M30,0H10A10,10,0,0,0,0,10V30A10,10,0,0,0,10,40H30A10,10,0,0,0,40,30V10A10,10,0,0,0,30,0ZM20.03,21.6a7.256,7.256,0,0,1-2.747-.539v-4.2A3.758,3.758,0,1,0,16.236,14.3v14.9A3.8,3.8,0,0,1,12.7,33V14.3a7.3,7.3,0,1,1,7.331,7.3Z"/>
            </svg>
          </div>
          <span class="navbar-brand d-sm-block d-none">Photoshare</span>
        </div>
      </router-link>
      <!-- 搜尋框與清單 -->
      <form class="search-form flex-grow-1 ms-2 d-flex align-items-center rounded-4 position-relative">
        <i class="svg-icon px-2 d-flex">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/>
          </svg>
        </i>
        <input 
          id="searchInput" 
          class="form-control border-0 shadow-none px-0" 
          type="text" 
          placeholder="搜尋免費相片" 
          aria-label="Search" autocomplete="off"
          v-model="searchValue" 
          @keydown.enter="onSearch('input')"
        >
        <!-- 搜尋紀錄與收藏 -->
        <div 
          class="
            search-form-dropdown w-100 shadow py-3 border-0 
            rounded-4 position-absolute top-100 bg-white
          "
        >
          <div class="d-flex justify-content-between align-items-center" v-if="searchRecords.length">
            <span class="px-3 my-3">最近搜尋</span>
            <i 
              class="svg-icon d-flex align-items-center me-3" 
              type="button" 
              @click="deleteSearchRecords"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"/>
              </svg>
            </i>
          </div>
          <ul class="nav px-3 mb-4">
            <li 
              class="nav-item mb-2 me-2" 
              v-for="(searchRecord, index) in searchRecords.slice(0,15)" 
              :key="index"
            >
              <button class="border border-1 text-primary rounded-4" type="button">
                <div class="nav-link" @click="onSearch(searchRecord)">
                  {{ searchRecord }}
                </div>
              </button>
            </li>
          </ul>
          <p class="px-3">精選收藏</p>
          <ul v-if="featuredCollections.length" class="nav px-3">
            <li 
              class="collection-item nav-item overflow-hidden rounded-4 mb-3 me-3"
              v-for="(collection, index) in featuredCollections" 
              :key="index"
            >
            <router-link :to="{ path: `/collections/featured/${collection.id}` }">
              <button class="border border-0 p-0"> 
                <div class="nav-link rounded-4 d-flex flex-column"> 
                  <span>{{ collection.title }}</span>
                  <span class="fw-normal">{{ collection.media_count }}張相片和影片</span>
                </div>
              </button>
            </router-link>
            </li>
          </ul>
          <span v-else-if="isOverLimitRequest" class="px-3 fw-normal">
            同一時段的請求次數過多，請休息一下後再次嘗試！
          </span>
          <span v-else-if="isRequestError" class="px-3 fw-normal">
            獲取資料時發生錯誤，我們將會盡快修復！
          </span>
        </div>
      </form>
      <!-- 我的收藏 -->
      <!-- <router-link to="/collections" class="flex-shrink-0"> -->
        <div class="nav flex-shrink-0" >
          <a class="nav-item fs-4 d-flex mx-3" href="https://github.com/doublesung/photoshare">
            <i class="svg-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"/>
              </svg>
            </i>
          </a>
          <router-link to="/collections">
            <div class="nav-item">
              <span class="nav-link px-0">我的收藏</span>
            </div>
          </router-link>
        </div>
      <!-- </router-link> -->
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import { getDatabase, ref, remove, update } from 'firebase/database'

export default {
  name: 'Navbar',
  computed: {
    ...mapState(['searchRecords', 'featuredCollections', 'isOverLimitRequest', 'isRequestError'])
  },
  data() {
    return {
      searchValue: null
    }
  },
  methods: {
    // 進行搜尋
    onSearch(value) {
      const searchInput = document.getElementById('searchInput')

      searchInput.blur() 

      // 表示是點擊搜尋紀錄
      if (value !== 'input') this.searchValue = value

      const searchRecordIndex = this.searchRecords.indexOf(this.searchValue)

      if (searchRecordIndex !== -1) {
        this.searchRecords.splice(searchRecordIndex, 1)
      }

      this.searchRecords.unshift(this.searchValue)

      if (this.searchRecords.length > 15) {
        this.searchRecords.pop()
      }

      const db = getDatabase()

      update(ref(db), {
        'searchRecords/': this.searchRecords
      })

      this.$router.push({ path: '/search/' + this.searchValue })
    },
    // 刪除所有搜尋紀錄
    deleteSearchRecords() {
      const db = getDatabase()
      
      remove(ref(db, 'searchRecords'))
    }
  },
  mounted() {
    // 獲取搜尋紀錄
    this.$store.dispatch('getSearchRecords')
    // 獲取精選收藏
    this.$store.dispatch('getFeaturedCollections', { page: 1, per_page: 8 })
  }
}
</script>

<style scoped lang="scss">
.navbar {
  z-index: 1;
}

.search-form {
  background-color: #efefef;

  .form-control {
    background-color: transparent;

    &:focus + .search-form-dropdown{
      visibility: visible;
      opacity: 1;
    }
  }
  .search-form-dropdown {
    visibility: hidden;
    opacity: 0;
    transition: .3s ease;
    max-height: 70vh;
    overflow-y: auto;

    .svg-icon {
      opacity: .5;
      transition: .3s ease;

      &:hover {
        opacity: 1;
      }
    }
  }

  .collection-item {
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.1);
    transition: .3s ease;
    
    &:hover {
      box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0);
    }
  }
}
</style>

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
      <form class="search-form flex-grow-1 mx-2 d-flex align-items-center rounded-4 position-relative">
        <i class="svg-icon px-2 d-flex ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/>
          </svg>
        </i>
        <input id="searchInput" class="form-control border-0 shadow-none ps-0" type="text" placeholder="搜尋免費相片" aria-label="Search" autocomplete="off"
        v-model="searchValue" @keydown.enter="search('input')"
        >
        <!-- 搜尋紀錄與收藏 -->
        <div class="search-form-dropdown w-100 shadow py-3 border-0 rounded-4 position-absolute top-100 bg-white">
          <div class="d-flex justify-content-between align-items-center" v-if="searchRecords.length">
            <span class="px-3 my-3">最近搜尋</span>
            <i class="svg-icon d-flex align-items-center me-3" type="button" @click="deleteSearchRecords">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"/>
              </svg>
            </i>
          </div>
          <ul class="nav px-3 mb-4">
            <li class="nav-item mb-2 me-2" v-for="(recordItem, index) in searchRecords.slice(0,15).reverse()" :key="index">
              <button class="border border-1 text-primary rounded-4" type="button">
                <div class="nav-link" @click="search(recordItem.searchRecord)">
                  {{recordItem.searchRecord}}
                </div>
              </button>
            </li>
          </ul>
          <p class="px-3">精選收藏</p>
          <ul class="nav px-3">
            <li class="collection-item nav-item overflow-hidden rounded-4 mb-3 me-3"
            v-for="(collection, index) in featuredCollections" :key="index"
            >
            <router-link :to="{path: `/collections/${collection.id}`}">
              <button class="border border-0 p-0"> 
                <div class="nav-link rounded-4 d-flex flex-column"> 
                  <span>{{collection.title}}</span>
                  <span class="fw-normal">{{collection.media_count}}張相片和影片</span>
                </div>
              </button>
            </router-link>
            </li>
          </ul>
        </div>
      </form>
      <!-- 我的收藏 -->
      <router-link to="/collections" class="flex-shrink-0">
        <div class="nav">
          <div class="nav-item">
            <span class="nav-link pe-0">我的收藏</span>
          </div>
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script>
import {mapState} from 'vuex'
import {reqAddSearchRecord, reqDeleteSearchRecord} from '../api/jsonServerAPI'

export default {
  name: 'Navbar',
  computed: {
    ...mapState(['searchRecords', 'featuredCollections']),
  },
  data() {
    return {
      searchValue: null,
    }
  },
  methods: {
    // 進行搜尋
    search(value) {
      let searchInput = document.getElementById('searchInput')

      // 表示是點擊搜尋紀錄
      if(value !== 'input') this.searchValue = value

      this.findSearchRecord()
      
      searchInput.blur()
      this.$store.dispatch('getSearchRecords')
      this.$store.dispatch('setTotalResult', '')

      this.$router.push({path: '/search/' + this.searchValue})
    },
    // 刪除所有搜尋紀錄
    deleteSearchRecords() {
      let SearchRecordArr = this.searchRecords.map(searchRecord => searchRecord.id)

      SearchRecordArr.forEach(id => {
        reqDeleteSearchRecord(id)
      });

      this.$store.dispatch('getSearchRecords')
    },
    // 查看搜尋紀錄是否存在
    findSearchRecord() {
      let searchValue = this.searchValue

      function isExists(item) {
        return item.searchRecord === searchValue
      }

      let searchRecord =  this.searchRecords.find(isExists)

      if(!searchRecord) {
        reqAddSearchRecord({
          id: '',
          searchRecord: this.searchValue
        })
      }
    },
    // 收藏標題與描述
    setCollection(collection) {
      this.$store.dispatch('setColletion', collection)
      console.log(collection)
    }
  },
  mounted() {
    // 獲取搜尋紀錄
    this.$store.dispatch('getSearchRecords')
    // 獲取精選收藏
    this.$store.dispatch('getFeaturedCollections', {page: 1, per_page: 8})
  },
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

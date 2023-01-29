<template>
  <div>
    <div v-show="!isLoading" class="container-fluid px-3 px-lg-5 pt-7">
      <!-- 標題 -->
      <div class="d-flex flex-column align-items-center">
        <h1 class="">我的收藏</h1>
        <span class="w-100 fs-3 py-5 mb-5 border-bottom text-center">
          項目 {{ Object.keys(collections).length }}
        </span>
      </div>
      <!-- 縮圖清單 -->
      <div class="thumbnail-list d-flex flex-wrap mn-xl-3 mn-2">
        <div 
          class="collection-container col-xxl-3 col-lg-4 col-sm-6 col-12 p-xl-3 p-2 mb-3"
          v-for="(collection, index) in collections" 
          :key="index"
        >
          <router-link :to="{path: 'collections/' + collection.id}">
            <div class="collection-placeholder">
              <ul 
                v-if="collection.media" 
                class="collection-grid-container overflow-hidden rounded-4" 
                :class="setGridLayout(collection.media)"
              >
                <li 
                  class="collection-image overflow-hidden"
                  :class="setGridSpace(collection.media, index)"
                  v-for="(medium, index) in getMediaArray(collection.media).slice(0, 3)" 
                  :key="index"
                >
                  <img 
                    v-if="!medium.video_files"
                    class="h-100 w-100" 
                    :src="medium.src.large" 
                    alt="" 
                    style="object-fit: cover"
                  >
                  <img 
                    v-else-if="medium.video_files"
                    class="h-100 w-100" 
                    :src="medium.image" 
                    alt="" 
                    style="object-fit: cover"
                  >
                  <div class="overlay bg-dark"></div>
                </li>
              </ul>
              <div v-else class="none-image rounded-4"></div>
            </div>
            <div 
              class="
                collection-details d-flex justify-content-between 
                align-items-center fs-5 fw-normal mt-2
              "
            >
              <div class="name">{{ collection.title }}</div>
              <div class="number d-flex align-items-center">
                <span class="me-2">{{ getMediaArray(collection.media).length }}</span>
                <i class="ri-image-2-fill fs-4"></i>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <!-- 無收藏 -->
      <p v-if="collections.length === 0">目前尚未收藏任何相片及影片。</p>
    </div>
    
    <loading :active.sync="isLoading" :opacity="1" :z-index="0">
      <div class="spinner-border text-secondary" role="status"></div>
    </loading>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Collections',
  computed: {
    ...mapState(['collections'])
  },
  data() {
    return {
      isLoading: true
    }
  },
  methods: {
    // 收藏依照片數量改變row
    setGridLayout(media) {
      if (media) {
        const length = Object.values(media).length

        if (length >= 3) return 'collection-grid-container-rows'
      }
    },
    // 收藏依照片數量進行寬高空間改變
    setGridSpace(media, index) {
      const length = this.getMediaArray(media).slice(0, 3).length
      
      if (length == 1) {
        return 'collection-image-full-width'
      } else if (length == 3 && index == 0) {
        return 'collection-image-full-height'
      }
    },
    getMediaArray(media) {
      return media ? Object.values(media) : []
    }
  },
  watch: {
    collections() {
      this.isLoading = false
    }
  },
  mounted() {
    // 獲取所有collection
    this.$store.dispatch('getCollections')
  }
}
</script>

<style scoped lang="scss">
h1 {
  font-size: 1rem * 3.5;
}

.none-image {
  background-color: rgba($color: #000000, $alpha: .1);
  position: absolute;
  height: 100%;
  width: 100%;
  transition: ease .3s;

  &:hover {
    background-color: rgba($color: #000000, $alpha: .25);
  }
}

.collection-container {
  cursor: pointer;
  .collection-placeholder {
    position: relative;
    width: 100%;
    padding-bottom: 100%;

    .collection-grid-container {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      position: absolute;
      height: 100%;
      width: 100%;

      .collection-image {
        position: relative;

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          opacity: 0;
          transition: .3s ease;
        }
      }

      .collection-image-full-width {
        grid-column-end: span 2;
      } 

      .collection-image-full-height {
        grid-row-start: 1;
        grid-row-end: 3;
      }
      
    }
    .collection-grid-container-rows {
      grid-template-rows: repeat(2, minmax(0, 1fr));
    }
  }

  .collection-details {
    color: #6e6d7a;
    transition: .3s ease;
  }

  &:hover {
    .collection-grid-container {
      .collection-image {
        .overlay {
          opacity: 0.25;
        }
      }
    }
    
    .collection-details {
      color: rgba($color: #000000, $alpha: .9);
    }
  }
}
</style>
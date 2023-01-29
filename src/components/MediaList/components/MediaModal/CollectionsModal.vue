<template>
  <div 
    class="modal center-modal fade rounded-4" 
    id="collectionsModal" 
    tabindex="-1" 
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" style="min-width: 30%">
      <div class="modal-content rounded-4">
        <div class="p-5">
          <!-- 關閉 -->
          <button 
            type="button" 
            class="btn-close position-absolute top-0 end-0 m-3" 
            data-bs-dismiss="modal" 
            aria-label="Close"></button>
          <div class="position-relative">
            <!-- 標題 -->
            <div class="d-flex flex-column align-items-center">
              <h5 class="modal-title text-center" id="exampleModalLabel">儲存置收藏</h5>
              <router-link to="/collections" class="fw-normal mb-4">
                <div 
                  type="button" 
                  data-bs-dismiss="modal" 
                  aria-label="Close" 
                  @click="closeMediumModal"
                >
                  我的收藏
                </div>
              </router-link>
            </div>
            <!-- 縮圖清單 -->
            <div class="container-flulid">
              <div class="d-flex flex-wrap mn-2">
                <!-- 新增收藏 -->
                <div class="col-4 position-relative p-2 fw-normal">
                  <div 
                    type="button" 
                    data-bs-dismiss="modal" 
                    aria-label="Close" 
                    @click="showCollectionsModalAdd"
                  >
                    <div class="item-placeholder mb-2">
                      <div 
                        class="
                          item bg-primary bg-opacity-10 d-flex 
                          justify-content-center align-items-center rounded-4
                        "
                      >
                        <div 
                          class="
                            overlay rounded-4 d-flex 
                            justify-content-center align-items-center
                          "
                        >
                          <i class="add-icon ri-add-circle-line fs-1"></i>
                        </div>
                      </div>
                    </div>
                    <span class="text">建立新收藏</span>
                  </div>
                </div>
                <!-- 收藏清單 -->
                <div 
                  class="col-4 position-relative p-2 fw-normal" 
                  v-for="(collection, index) in collections" 
                  :key="index"
                >
                  <div type="button">
                    <!-- 收藏有相片或影片 -->
                    <div 
                      v-if="getMediaArray(collection.media).length" 
                      class="item-placeholder mb-2"
                    >
                      <div 
                        class="
                          item bg-secondary bg-opacity-10 d-flex justify-content-center 
                          align-items-center overflow-hidden rounded-4
                        "
                      >
                        <img 
                          v-if="!getMediaArray(collection.media)[0].video_files"
                          class="w-100 h-100" 
                          :src="getMediaArray(collection.media)[0].src.large" 
                          alt="" 
                          style="object-fit: cover"
                        >
                        <img 
                          v-else
                          class="w-100 h-100" 
                          :src="getMediaArray(collection.media)[0].image" 
                          alt="" 
                          style="object-fit: cover"
                        >
                        <!-- 沒被收藏 -->
                        <div 
                          v-show="isCollected(collection.media)" 
                          @click="addMedium(collection)"
                          class="overlay rounded-4 d-flex justify-content-center align-items-center"
                        >
                          <i class="image-add-icon ri-add-circle-fill fs-1"></i>
                        </div>
                        <!-- 有被收藏 -->
                        <div v-if="isCollected(collection.media)" @click="deleteMedium(collection)">
                          <div 
                            class="
                              overlay-check rounded-4 d-flex 
                              justify-content-center align-items-center
                            "
                          >
                            <i class="image-check-icon ri-checkbox-circle-fill fs-1"></i>
                          </div>
                          <div 
                            class="
                              overlay-delete rounded-4 d-flex 
                              justify-content-center align-items-center
                            "
                          >
                            <i class="image-delete-icon ri-close-circle-fill fs-1"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 收藏無任何相片或影片 -->
                    <div v-else class="item-placeholder mb-2">
                      <div 
                        class="
                          item bg-primary bg-opacity-10 d-flex justify-content-center 
                          align-items-center overflow-hidden rounded-4
                        "
                      >
                        <i class="svg-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path d="M5 11.1l2-2 5.5 5.5 3.5-3.5 3 3V5H5v6.1zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm11.5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                          </svg>
                        </i>
                        <!-- 沒被收藏 -->
                        <div 
                          v-show="isCollected(collection.media)" 
                          class="overlay rounded-4 d-flex justify-content-center align-items-center"
                          @click="addMedium(collection)"
                        >
                          <i class="image-add-icon ri-add-circle-fill fs-1"></i>
                        </div>
                        <!-- 有被收藏 -->
                        <div 
                          v-if="isCollected(collection.media)" 
                          @click="deleteMedium(collection, index)"
                        >
                          <div 
                            class="
                              overlay-check rounded-4 d-flex 
                              justify-content-center align-items-center
                            "
                          >
                            <i class="image-check-icon ri-checkbox-circle-fill fs-1"></i>
                          </div>
                          <div 
                            class="
                              overlay-delete rounded-4 d-flex 
                              justify-content-center align-items-center
                            "
                          >
                            <i class="image-delete-icon ri-close-circle-fill fs-1"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="text">{{ collection.title }}</div>
                  </div>
                </div>
              </div>
            </div>
            <loading :active.sync="isLoading" :is-full-page="false" :opacity="1">
              <div class="spinner-border text-secondary" role="status"></div>
            </loading>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getDatabase, ref, remove, child, push, update } from 'firebase/database'

export default {
  name: 'CollectionsModal',
  props: {
    medium: {
      type: Object
    },
    photoModal: {
      type: Object
    },
    collectionsModalAdd: {
      type: Object
    }
  },
  computed: {
     ...mapState(['collections']),

    isCollection() {
      return this.$route.path.includes('collections')
    }
  },
  data() {
    return {
      isLoading: true
    }
  },
  methods: {
    // 顯示新增收藏
    showCollectionsModalAdd() {
      this.collectionsModalAdd.show()

      const collectionsModalAdd = document.getElementById('collectionsModalAdd')
      const backdropArr = document.querySelectorAll('.modal-backdrop')
      // 先把偽數組變成真的Array對象 之後再取最後一個值
      const backdrop = Array.prototype.slice.call(backdropArr).slice(-1)[0]
      // 調整z-index覆蓋住上一個modal
      collectionsModalAdd.style.zIndex = 1065
      backdrop.style.zIndex = 1060
    },
    // 向收藏添加圖片或影片
    addMedium(collection) {
      const db = getDatabase()
      const path = `collections/${collection.id}/media`
      const newKey = push(child(ref(db), path)).key

      update(ref(db), {
        [path + '/' + newKey]: this.medium
      })
    },
    // 向收藏刪除圖片或影片
    deleteMedium(collection) {
      const db = getDatabase()

      const mediumKey = Object.entries(collection.media).reverse().find((item, index) => {
        if (item[1].id == this.medium.id) {
          if(this.isCollection) this.$store.state.media.splice(index, 1)[0]
          return item
        }
      })
      
      const path = `collections/${collection.id}/media/${mediumKey[0]}`
      
      remove(ref(db, path))
    },
    // 關閉相片資訊
    closeMediumModal() {
      this.photoModal.hide()
    },
    // 是否已被收藏
    isCollected(media) {
      if (media) {
        return Object.values(media).find(item => item.id == this.medium.id)
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
.item-placeholder {
  position: relative;
  width: 100%;
  padding-bottom: 100%;

  .item {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba($color: #212529, $alpha: 0);
    transition: .3s ease;

    .add-icon {
      color: #6e6d7a;
      transition: .3s ease;
    }

    .image-add-icon {
      color: #FFF;
      opacity: 0;
      transition: .3s ease;
    }
  }

  .overlay-check {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba($color: #92E3A9, $alpha: .5);
    transition: .3s ease;

    .image-check-icon {
      color: #FFF;
      transition: .3s ease;
    }
  }

  .overlay-delete {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba($color: #C53F3F, $alpha: 0);
    transition: .3s ease;

    .image-delete-icon {
      color: #FFF;
      opacity: 0;
      transition: .3s ease;
    }
  }

  &:hover {
    .overlay {
      background-color: rgba($color: #212529, $alpha: .5);

      .image-add-icon {
        opacity: 1;
      }

      .add-icon {
        color: rgba($color: #000000, $alpha: .9);
      }
    }

    .overlay-check {
      background-color: rgba($color: #92E3A9, $alpha: 0);

      .image-check-icon {
        opacity: 0;
      }
    }

    .overlay-delete {
      background-color: rgba($color: #C53F3F, $alpha: .5);

      .image-delete-icon {
        opacity: 1;
      }
    }

    & + .text {
      color: rgba($color: #000000, $alpha: .9);
    }
  }
}

.text {
  width: 100%;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
}
</style>
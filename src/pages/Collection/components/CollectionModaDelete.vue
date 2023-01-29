<template>
  <div 
    class="modal center-modal fade rounded-4" 
    id="collectionModaDelete" 
    tabindex="-1" 
    aria-hidden="true"
  >
    <div class="modal-dialog modal-sm modal-dialog-scrollable">
      <div class="modal-content rounded-4">
        <div class="p-5">
          <!-- 標題 -->
          <div class="d-flex flex-column align-items-center">
            <h5 class="modal-title text-center mb-4">確定要刪除收藏嗎?</h5>
          </div>
          <!-- 關閉 -->
          <button 
            type="button" 
            class="btn-close position-absolute top-0 end-0 m-3" 
            data-bs-dismiss="modal" 
            aria-label="Close"
          ></button>
          <!-- 確定&取消 -->
          <div class="gap-3 d-flex justify-content-center">
            <button 
              class="btn btn-secondary text-white me-md-2" 
              type="button" 
              data-bs-dismiss="modal" 
              aria-label="Close"
              @click="deleteCollection"
            >
              確定
            </button>
            <button 
              class="btn btn-primary" 
              type="button" 
              data-bs-dismiss="modal" 
              aria-label="Close"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref, remove } from 'firebase/database'

export default {
  name: 'CollectionModaDelete',
  props: {
    collection: {
      Object
    }
  },  
  methods: {
    // 刪除收藏
    deleteCollection() {
      const db = getDatabase()
      remove(ref(db, 'collections/' + this.collection.id))

      this.$router.replace('/collections')
    }
  },
}
</script>

<style></style>
<template>
  <div 
    class="modal center-modal fade rounded-4" 
    id="collectionModalEdit" 
    tabindex="-1" 
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable" style="min-width: 30%">
      <div class="modal-content rounded-4">
        <div class="p-5">
          <div class="d-flex flex-column align-items-center">
            <h5 class="modal-title text-center mb-4" id="exampleModalLabel">編輯收藏</h5>
          </div>
          <!-- 關閉 -->
          <button 
            type="button" 
            class="btn-close position-absolute top-0 end-0 m-3" 
            data-bs-dismiss="modal" 
            aria-label="Close"
          ></button>
          
          <form class="needs-validation" target="stop-reload">
            <!-- 標題 -->
            <div class="mb-3">
              <label for="collectionTitle" class="form-label">標題</label>
              <input 
                type="text" 
                class="form-control shadow-none" 
                id="collectionTitle" 
                :value="collection.title" 
                required
              >
            </div>
            <!-- 說明 -->
            <div class="mb-4">
              <label for="descriptionTextarea" class="form-label">說明</label>
              <textarea 
                class="form-control shadow-none" 
                id="descriptionTextarea" 
                rows="3" 
                :value="collection.description"
              ></textarea>
            </div>
            <!-- 更新&關閉 -->
            <div class="gap-3 d-flex justify-content-end">
              <button 
                class="btn btn-secondary text-white me-md-2" 
                ype="submit" 
                @click="editCollection"
              >
                更新收藏
              </button>
              <button 
                class="btn btn-primary" 
                type="button" 
                data-bs-dismiss="modal" 
                aria-label="Close"
              >
                關閉收藏
              </button>
            </div>
          </form>
          <!-- 指向表單來解決提交會刷新 -->
          <iframe name="stop-reload" style="display: none"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import { getDatabase, ref, update } from 'firebase/database'

export default {
  name: 'CollectionModalEdit',
  props: {
    collection: {
      Object
    }
  },
  data() {
    return {
      modal: null
    }
  },
  methods: {
    // 在全域創建Modal對象 確保hide函數可執行
    modalObject() {
      this.modal = new Modal(document.getElementById('collectionModalEdit'))
    },
    // 編輯收藏標題說明
    editCollection() {
      const db = getDatabase()
      const path = `collections/${this.collection.id}`

      const title = document.getElementById('collectionTitle').value
      const description = document.getElementById('descriptionTextarea').value

      if (title) {
        update(ref(db), {
          [path + '/title']: title
        })
        
        update(ref(db), {
          [path + '/description']: description
        })

        this.$store.state.collection.title = title
        this.$store.state.collection.description = description

        this.modal.hide()
      }
    }
  },
  mounted() {
    this.modalObject()
  }
}
</script>

<style scoped lang="scss">
textarea { 
  resize: none; 
}
</style>
<template>
  <div 
    class="modal center-modal fade rounded-4" 
    id="collectionsModalAdd" 
    tabindex="-1" 
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable" style="min-width: 30%">
      <div class="modal-content rounded-4">
        <div class="p-5">
          <!-- 標題 -->
          <div class="d-flex flex-column align-items-center">
            <h5 class="modal-title text-center mb-4" id="exampleModalLabel">新增收藏</h5>
          </div>
          <!-- 關閉 -->
          <button 
            type="button" 
            class="btn-close position-absolute top-0 end-0 m-3" 
            data-bs-dismiss="modal" 
            aria-label="Close"
          ></button>
          <form class="needs-validation" target="stop-reload">
            <!-- 新增 -->
            <div class="mb-4">
              <label for="collectionTitleAdd" class="form-label">收藏標題</label>
              <input 
                type="text" 
                class="form-control shadow-none" 
                id="collectionTitleAdd" 
                v-model="collectionTitleAdd" 
                required
              >
            </div>
            <!-- 返回 -->
            <div class="gap-3 d-flex justify-content-end">
              <button 
                class="btn btn-secondary text-white me-md-2" 
                @click="addCollection" 
                type="submit"
              >
                建立收藏
              </button>
              <button 
                class="btn btn-primary" 
                type="button" 
                data-bs-dismiss="modal" 
                aria-label="Close"
                @click="showCollectionsModal"
              >
                返回
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
import { mapState } from 'vuex'
import { getDatabase, ref, child, push, update } from 'firebase/database'

export default {
  name: 'CollectionsModalAdd',
  computed: {
    ...mapState(['collections'])
  },
  props: {
    photo: {
      type: Object
    },
    collectionsModalAdd: {
      type: Object
    },
    showCollectionsModal: {
      type: Function
    }
  },
  data() {
    return {
      collectionTitleAdd: null
    }
  },
  methods: {
    // 新增收藏
    addCollection() {
      if (this.collectionTitleAdd) {
        const db = getDatabase()
        const newKey = push(child(ref(db), 'collections')).key

        update(ref(db), {
          ['collections/' + newKey]: {
            id: newKey,
            title: this.collectionTitleAdd,
            description: '',
            media: {
              [newKey]: this.photo
            }
          }
        })

        this.collectionsModalAdd.hide()
        this.showCollectionsModal()
        this.collectionTitleAdd = null
      }
    }
  }
}
</script>

<style></style>
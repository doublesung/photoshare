<template>
  <div>
    <!-- 相片資訊 -->
    <PhotoModal 
      v-if="!medium.video_files" 
      :photo="medium" 
      :showCollectionsModal="showCollectionsModal" 
      @download="download"
    />
    <!-- 影片資訊 -->
    <VideoModal 
      v-else
      :video="medium" 
      :showCollectionsModal="showCollectionsModal"
      @download="download"
    />
    <!-- 收藏清單 -->
    <CollectionsModal 
      :medium="medium" 
      :photoModal="photoModal" 
      :collectionsModalAdd="collectionsModalAdd"
    />
    <!-- 新增收藏 -->
    <CollectionsModalAdd 
      :photo="medium" 
      :collectionsModalAdd="collectionsModalAdd" 
      :showCollectionsModal="showCollectionsModal"
    />
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import PhotoModal from './PhotoModal.vue'
import VideoModal from './VideoModal.vue'
import CollectionsModal from './CollectionsModal.vue'
import CollectionsModalAdd from './CollectionsModalAdd.vue'

export default {
  name: 'PhotosModal',
  props: {
    medium: {
      type: Object
    },
    downloadMedium: {
      type: Function
    }
  },
  components: {
    PhotoModal,
    VideoModal,
    CollectionsModal,
    CollectionsModalAdd
  },
  data() {
    return {
      photoModal: null,
      collectionsModal: null,
      collectionsModalAdd: null
    }
  },
  methods: {
    // 在全域創建Modal對象 確保hide函數可執行
    modalObject() {
      this.photoModal = new Modal(document.getElementById('photoModal'))
      this.collectionsModal = new Modal(document.getElementById('collectionsModal'))
      this.collectionsModalAdd = new Modal(document.getElementById('collectionsModalAdd'))
    },
    // 關閉相片資訊
    closeMediumModal() {
      this.photoModal.hide()
    },
    // 監聽Modal關閉事件
    watchCloseMediumModal() {
      const photoModal = document.getElementById('photoModal')

      // 清除medium的值
      photoModal.addEventListener('hidden.bs.modal', () => {
        this.$emit('goClearMedium')
      })

      const collectionsModal = document.getElementById('collectionsModal')

      // photoModal跟collectionsModalAdd都已關閉 才會清除medium的值
      collectionsModal.addEventListener('hidden.bs.modal', () => {
        const photoModalDisplay = photoModal.style.display
        const collectionsModalAddDisplay = collectionsModalAdd.style.display

        if (!photoModalDisplay && !collectionsModalAddDisplay) this.$emit('goClearMedium')
      })

      const collectionsModalAdd = document.getElementById('collectionsModalAdd')

      // photoModal跟collectionsModal都已關閉 才會清除medium的值
      collectionsModalAdd.addEventListener('hidden.bs.modal', () => {
        const photoModalDisplay = photoModal.style.display
        const collectionsModalDisplay = collectionsModal.style.display !== 'none' 

        if (!photoModalDisplay && !collectionsModalDisplay) this.$emit('goClearMedium')
      })
    },
    // 關閉尺寸下拉表單
    closeDropdownMenuSize() {
      const menu = document.getElementById('dropdownMenuSize')

      menu.classList.remove('show')
    },
    // 顯示收藏清單
    showCollectionsModal() {  
      this.collectionsModal.show()

      const collectionsModal = document.getElementById('collectionsModal')
      const backdropArr = document.querySelectorAll('.modal-backdrop')
      // 先把偽數組變成真的Array對象 之後再取最後一個值
      const backdrop = Array.prototype.slice.call(backdropArr).slice(-1)[0]
      // 調整z-index覆蓋住上一個modal
      collectionsModal.style.zIndex = 1065
      backdrop.style.zIndex = 1060
    },
    // 下載圖片或影片
    download(url, name) {
      this.downloadMedium(url, name)
      this.closeDropdownMenuSize()
    }
  },
  mounted() {
    this.modalObject()
    this.watchCloseMediumModal()
  }
}
</script>

<style scoped lang="scss">
.close-svg-icon {
  fill: rgba($color: #FFF, $alpha: .9);
}

.close-svg-icon-md {
  fill: rgba($color: #000000, $alpha: .5);
}

.download-svg-icon {
  fill: #FFF;
}

.full-height-modal {
  border-radius: 0;
  
  .full-height-modal-content {
    border-radius: 0;
  }
}
</style>
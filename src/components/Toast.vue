<template>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 2000">
    <div id="liveToast" class="toast bg-white border-0" role="alert" aria-live="assertive" aria-atomic="true" 
    data-bs-delay="3000"
    >
      <div class="toast-header">
        <strong class="me-auto">下載成功</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        感謝 {{getPhotographer()}} 提供的優質照片!
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'bootstrap'

export default {
  name: 'Toast',
  props: {
    medium: {
      type: Object
    }
  },
  methods: {
    showToast() {
      let toastLiveExample = document.getElementById('liveToast')
      let toast = new Toast(toastLiveExample)
      toast.show()
    },
    getPhotographer() {
      const medium = this.medium
      
      if(medium) {
        if(!medium.video_files) {
          return medium.photographer
        }else {
          return medium.user.name
        }
      }
    }
  },
}
</script>

<style></style>
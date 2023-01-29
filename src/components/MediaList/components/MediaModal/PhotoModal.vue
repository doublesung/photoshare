<template>
  <div class="modal full-height-modal fade" id="photoModal" tabindex="-1" aria-hidden="true">
    <!-- 關閉 -->
    <button 
      class="
        close-svg-icon border-0 bg-transparent position-absolute 
        top-0 end-0 m-3 d-none d-md-block
      " 
      data-bs-dismiss="modal" 
      aria-label="Close" 
      type="button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
      </svg>
    </button>
    <div 
      class="
        modal-dialog h-100 rounded-0 my-0 border-0 
        m-sm-auto m-0 min-w-md-80 min-w-100
      "
    >
      <div 
        class="
          modal-content full-height-modal-content h-100 d-flex 
          justify-content-between align-items-center p-4
        "
      >
        <!-- 攝影師&收集&下載 -->
        <div 
          class="
            d-flex justify-content-md-between justify-content-center 
            align-items-center w-100
          "
        >
          <!-- 攝影師 -->
          <div class="d-flex align-items-center">
            <i class="svg-icon me-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM6.023 15.416C7.491 17.606 9.695 19 12.16 19c2.464 0 4.669-1.393 6.136-3.584A8.968 8.968 0 0 0 12.16 13a8.968 8.968 0 0 0-6.137 2.416zM12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
            </i>
            <span class="d-none d-md-block">{{ photo.photographer }}</span>
          </div>
          <div class="d-flex">
            <!-- 收集 -->
            <button 
              class="
                border border-1 text-primary rounded-4 
                px-3 py-2 mx-3 d-flex align-items-center
              " 
              type="button" 
              @click="showCollectionsModal"
            >
              <i class="svg-icon me-0 me-md-1 d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path d="M6 7V4a1 1 0 0 1 1-1h6.414l2 2H21a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-3v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3zm0 2H4v10h12v-2H6V9zm2-4v10h12V7h-5.414l-2-2H8z"/>
                </svg>
              </i>
              <span class="d-none d-md-block">收集</span>
            </button>
            <!-- 下載 -->
            <div class="border-0 px-0 d-flex rounded-4 overflow-hidden">
              <button 
                class="btn btn-secondary text-white border-end rounded-0 border border-0 shadow-none"
              >
                免費下載
              </button>
              <button 
                class="btn btn-secondary rounded-0 p-1 dropdown-toggle-split border border-0 shadow-none" 
                id="dropdownBtnSize" 
                type="button" 
                data-bs-toggle="dropdown" 
                data-bs-offset="0,10" 
                data-bs-auto-close="outside" 
                aria-expanded="false"
              >
                <i class="download-svg-icon h-100 px-1 d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"/>
                  </svg>
                </i>
              </button>
              <ul 
                id="dropdownMenuSize" 
                class="dropdown-menu dropdown-menu-end py-2" 
                aria-labelledby="dropdownBtnSize"
              >
                <li>
                  <span class="dropdown-item bg-transparent text-primary">選擇尺寸:</span>
                </li>
                <li v-for="(sizeItem, index) in sizeArr" :key="index">
                  <div 
                    class="dropdown-item bg-transparent text-dark d-flex align-items-center item-active" 
                    type="button"
                    @click="currentSizeIndex = index"
                  >
                    <span>{{ sizeItem.text }}</span>
                    <span class="text-primary ms-1 me-2">{{ calculateSize(sizeItem.size) }}</span>
                    <i class="position-relative p-3">
                      <svg 
                        v-if="currentSizeIndex === index" 
                        class="position-absolute top-50 end-0 translate-middle-y"
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        width="24" 
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"/>
                      </svg>
                    </i>
                  </div>
                </li>
                <li class="bg-transparent d-flex justify-content-center border-top mt-2">
                  <button 
                    class="btn btn-secondary text-white mt-2 rounded-4" 
                    type="button" 
                    @click="downloadImage"
                  >
                    下載選擇的收藏
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <!-- 關閉 -->
          <button 
          type="button" 
          class="
            close-svg-icon-md border-0 bg-transparent position-absolute 
            top-0 end-0 m-1 d-block d-md-none
          " 
          data-bs-dismiss="modal" 
          aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
            </svg>
          </button>
        </div>
        <!-- 照片 -->
        <div class="position-relative h-80 w-100">
          <img 
            v-show="!isLoading" 
            class="w-100 h-100" 
            :src="photo.src.original" 
            alt="" 
            @load="isLoading = false" 
            style="object-fit: contain"
          >
          <loading :active.sync="isLoading" :is-full-page="false">
            <div class="spinner-border text-secondary" role="status"></div>
          </loading>
        </div>
        <!-- 免費使用&資訊 -->
        <div 
          class="
            d-flex justify-content-md-between 
            justify-content-center align-items-center w-100
          "
        >
          <div class="d-flex align-items-center me-3">
            <i class="svg-icon me-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"/>
              </svg>
            </i>
            <span class="text-primary fw-normal">免費使用</span>
          </div>
          <button 
            class="border border-1 text-primary rounded-4 px-3 py-2 d-flex align-items-center" 
            type="button"
          >
            <i class="svg-icon me-1 d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"/>
              </svg>
            </i>
            <span>資訊</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoModal',
  props: {
    photo: {
      Object
    },
    showCollectionsModal: {
      type: Function
    },
  },
  data() {
    return {
      isLoading: true,
      // 下拉選單內容
      sizeArr: [
        {
          text: '原始尺寸',
          size: 'original'
        },
        {
          text: '大',
          size: 'large'
        },
        {
          text: '中',
          size: 'medium'
        },
        {
          text: '小',
          size: 'small'
        }
      ],
      // 當前選擇尺寸
      currentSizeIndex: 0
    }
  },
  methods: {
    // 監聽相片資訊關閉事件 關閉後恢復默認尺寸選項
    watchCloseMediumModal() {
      const photoModal = document.getElementById('photoModal')

      photoModal.addEventListener('hidden.bs.modal', () => {
        this.toggleCheck(0)
      })
    },
    // 計算圖片大中小的高
    calculateSize(size) {
      const originWidth = this.photo.width
      const originHeight = this.photo.height

      if (size === 'original') {
        // 直接返回原始尺寸
        return `${originWidth} x ${originHeight}`
      } else if (size === 'large') {
        if (originWidth === originHeight) {
          // 正方形
          return '1920 x 1920'
        } else {
          // 寬固定為1920 計算等比例的高
          const quotient = originWidth / 1920
          const height = Math.ceil(originHeight / quotient)

          return `1920 x ${height}`
        }
      } else if (size === 'medium') {
        if (originWidth === originHeight) {
          return '1280 x 1280'
        } else {
          const quotient = originWidth / 1280
          const height = Math.ceil(originHeight / quotient)

          return `1280 x ${height}`
        }
      } else {
        if (originWidth === originHeight) {
          return '640 x 640'
        } else {
          const quotient = originWidth / 640
          const height = Math.ceil(originHeight / quotient)

          return `640 x ${height}`
        }
      }
    },
    // 下載圖片
    downloadImage() {
      const sizeString = this.calculateSize(this.sizeArr[this.currentSizeIndex].size)
      const width = sizeString.split(' x ')[0]
      const height = sizeString.split(' x ')[1]
      const id = this.photo.id
      const photographer = this.photo.photographer
      const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${width}&h=${height}`
      const imageName = `photoshare-${photographer}-${id}.jpg`
          
      this.$emit('download', url, imageName)
    },
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
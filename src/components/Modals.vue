<template>
  <div>
    <!-- 高度填滿 -->
    <div class="modal full-height-modal fade" id="photoModal" tabindex="-1" aria-hidden="true">
      <button type="button" class="close-svg-icon border-0 bg-transparent position-absolute top-0 end-0 m-3 d-none d-md-block" data-bs-dismiss="modal" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
          <path fill="none" d="M0 0h24v24H0z"/>
          <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
        </svg>
      </button>
      <div class="modal-dialog h-100 rounded-0 my-0 border-0 m-sm-auto m-0 min-w-md-80 min-w-100">
        <div class="modal-content full-height-modal-content h-100 d-flex justify-content-between align-items-center p-4">
          <div class="d-flex justify-content-md-between justify-content-center align-items-center w-100">
            <div>
              <img class="rounded-circle me-2" src="https://images.pexels.com/users/avatars/3798027/koolshooters-805.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=1" alt="" style="object-fit: contain">
              <!-- <span class="">KoolShooters</span> -->
            </div>
            <div class="d-flex">
              <button class="bg-transparent border border-1 text-primary rounded-4 px-3 py-2 mx-3" type="button">
                <div class="d-flex align-items-center">
                  <!-- <i class="ri-folder-add-line fs-4 fw-normal text-primary"></i> -->
                  <!-- <i class="svg-icon me-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="none" d="M0 0h24v24H0z"/><path d="M6 7V4a1 1 0 0 1 1-1h6.414l2 2H21a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-3v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3zm0 2H4v10h12v-2H6V9zm2-4v10h12V7h-5.414l-2-2H8z"/>
                    </svg>
                  </i> -->
                  <span>收集</span>
                </div>
              </button>
              <div class="bg-success rounded-4">
                <button class="border-0 bg-transparent text-white h-100 px-0 d-flex align-items-center">
                  <span class="border-end px-3">免費下載</span>
                  <i class="download-svg-icon dropdown-toggle-split h-100 px-1 d-flex align-items-center" type="button" data-bs-toggle="dropdown" data-bs-offset="0,10" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="none" d="M0 0h24v24H0z"/>
                      <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"/>
                    </svg>
                  </i>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#">原始尺寸</a></li>
                    <li><a class="dropdown-item" href="#">大</a></li>
                    <li><a class="dropdown-item" href="#">中</a></li>
                    <li><a class="dropdown-item" href="#">小</a></li>
                    <!-- <li><hr class="dropdown-divider"></li> -->
                    <!-- <li><a class="dropdown-item" href="#">Separated link</a></li> -->
                  </ul>
                </button>
              </div>
            </div>
            <button type="button" class="close-svg-icon-md border-0 bg-transparent position-absolute top-0 end-0 m-1 d-block d-md-none" data-bs-dismiss="modal" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
              </svg>
            </button>
          </div>
          <div class="h-80">
            <img class="w-100 h-100" src="http://vcdnb.huoying666.com/images/2021/1212/c3d551f63ba1a0d121dcd51b53932078/c3d551f63b.jpg_home-image-640" alt="">
          </div>
          <div class="d-flex justify-content-md-between justify-content-center align-items-center w-100">
            <div class="d-flex align-items-center me-3">
              <i class="svg-icon me-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"/>
                </svg>
              </i>
              <span class="text-primary fw-normal">免費使用</span>
            </div>
            <button class="bg-transparent border border-1 text-primary rounded-4 px-3 py-2" type="button">
              <div class="d-flex align-items-center">
                <i class="svg-icon me-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"/>
                  </svg>
                </i>
                <span>資訊</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 垂直置中 -->
    <div class="modal center-modal fade rounded-4" id="collectionsModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style="min-width: 30%">
        <div class="modal-content rounded-4">
          <div class="p-5">
            <div class="d-flex flex-column align-items-center">
              <h5 class="modal-title text-center" id="exampleModalLabel">儲存置收藏</h5>
              <a href="http://">我的收藏</a>
            </div>
            <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="container-flulid ">
              <div class="d-flex flex-wrap mn-2">
                <div class="col-4 position-relative p-2">
                  <div class="item-placeholder">
                    <div class="item bg-secondary bg-opacity-10 d-flex justify-content-center align-items-center rounded-4">
                        <i class="ri-add-circle-line fs-1"></i>
                    </div>
                  </div>
                  <span>建立新收藏</span>
                </div>
                <div class="col-4 position-relative p-2">
                  <div class="item-placeholder">
                    <div class="item bg-secondary bg-opacity-10 d-flex justify-content-center align-items-center overflow-hidden rounded-4">
                      <img class="w-100 h-100" src="https://tour.taitung.gov.tw/image/26556/1024x768" alt="" style="object-fit: cover">
                    </div>
                  </div>
                  <span>建立新收藏</span>
                </div>
                <div class="col-4 position-relative p-2">
                  <div class="item-placeholder">
                    <div class="item bg-secondary bg-opacity-10 d-flex justify-content-center align-items-center overflow-hidden rounded-4">
                      <img class="w-100 h-100" src="https://tour.taitung.gov.tw/image/26556/1024x768" alt="">
                    </div>
                  </div>
                  <span>建立新收藏</span>
                </div>
                <div class="col-4 position-relative p-2">
                  <div class="item-placeholder">
                    <div class="item bg-secondary bg-opacity-10 d-flex justify-content-center align-items-center overflow-hidden rounded-4">
                      <img class="w-100 h-100" src="https://tour.taitung.gov.tw/image/26556/1024x768" alt="">
                    </div>
                  </div>
                  <span>建立新收藏</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 name: 'Modals'
}
</script>

<style scoped lang='scss'>
.svg-icon {
  fill: #6e6d7a;
}

.close-svg-icon {
  fill: rgba($color: #FFF, $alpha: .9);
}

.close-svg-icon-md {
  fill: rgba($color: #000000, $alpha: .5);
}

.download-svg-icon {
  fill: #FFF;
}

.full-height-modal, .full-height-modal-content {
  border-radius: 0;
}

.add-collection {
  background-color: rgba($color: #6e6d7a, $alpha: .3);
}

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
}
</style>
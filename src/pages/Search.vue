<template>
  <div class="container-fluid px-3 px-lg-5 pt-7">
    <div class="d-flex flex-column align-items-center">
      <h1 class="">與「台灣」相關的照片</h1>
      <ul class="nav position-relative d-flex justify-content-center w-100">
        <div class="d-flex justify-content-center col-12 my-4 my-lg-5">
          <li class="nav-item">
            <a class="nav-link fs-4 text-active" aria-current="page" href="#">相片</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fs-4" href="#">影片</a>
          </li>
        </div>
        <li class="nav-item position-lg-absolute d-flex align-items-center end-0 w-100 w-lg-auto h-100 mb-4">
          <button class="bg-transparent border border-1 text-primary rounded-4 w-100 px-3 py-2" type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse" 
          aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2 multiCollapseExample3">
            篩選
          </button>
        </li>
      </ul>
    </div>
    <div class="row">
      <div class="col-lg-4 col-12">
        <div class="collapse multi-collapse" id="multiCollapseExample1">
          <div class="dropdown pb-4">
            <button class="bg-transparent border border-1 text-primary rounded-4 text-start w-100 py-2 px-4" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              所有方向
            </button>
            <ul class="dropdown-menu w-100 rounded-4" aria-labelledby="dropdownMenuButton1">
              <li>
                <button class="bg-transparent border-0 text-primary text-start w-100 py-2 px-4">所有方向</button>
              </li>
              <li>
                <button class="bg-transparent border-0 text-primary text-start w-100 py-2 px-4">橫向</button>
              </li>
              <li>
                <button class="bg-transparent border-0 text-primary text-start w-100 py-2 px-4">縱向</button>
              </li>
              <li>
                <button class="bg-transparent border-0 text-primary text-start w-100 py-2 px-4">正方形</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-12">
        <div class="collapse multi-collapse" id="multiCollapseExample2">
          <div class="dropdown pb-4">
            <button class="bg-transparent border border-1 text-primary rounded-4 text-start w-100 py-2 px-4" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              所有尺寸
            </button>
            <ul class="dropdown-menu w-100 rounded-4" aria-labelledby="dropdownMenuButton1">
              <li>
                <button class="bg-transparent border-0 text-primary text-start w-100 py-2 px-4">所有尺寸</button>
              </li>
              <li>
                <button class="bg-transparent border-0 text-primary text-start w-100 py-2 px-4">大</button>
              </li>
              <li>
                <button class="bg-transparent border-0 text-primary text-start w-100 py-2 px-4">中</button>
              </li>
              <li>
                <button class="bg-transparent border-0 text-primary text-start w-100 py-2 px-4">小</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-12">
        <div class="color-collapse collapse multi-collapse" id="multiCollapseExample2">
          <div class="dropdown pb-4">
            <div class="d-flex align-items-center border border-1 rounded-4 ps-4 p-2" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <div class="color-show me-2 rounded-circle"></div>
              <input class="color-input bg-transparent border-0 text-primary rounded-4 text-start w-100" type="text" 
              placeholder="輸入 HEX 色碼">
              <div class="dropdown-menu w-100 rounded-4" aria-labelledby="dropdownMenuButton1">
                <ul class="dropdown-color-menu d-flex flex-wrap  px-4 my-3 w-100">
                  <li class="col-2" v-for="(color, index) in colors" :key="index" :style="{'background-color': color}"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Photos/>
  </div>
</template>

<script>
import Photos from '../components/Photos.vue'

export default {
  name: 'Search',
  components: {
    Photos
  },
  data() {
    return {
      colors: [
        '#CCF3FC',
        // '#CEDFFC',
        // '#C1B9FC',
        '#D7B9FC',
        // '#E8C6DB',
        '#F0CED1',
        // '#F4D5CC',
        // '#F8E3CB',
        '#F9E7CB',
        // '#FEF6D5',
        // '#F9F7D4',
        '#E0E9CA',
        '#FFFFFF',
        // 第二行
        '#23C5EB',
        // '#256EEB',
        // '#2B11EB',
        '#7311EB',
        // '#C1358B',
        '#CF3643',
        // '#DB532B',
        // '#E78B22',
        '#EA9B20',
        // '#EBC62D',
        // '#E6DC2C',
        '#99C03A',
        '#959595',
        // 第三行
        '#00586D',
        // '#00296F',
        // '#0B005D',
        '#2A005D',
        // '#4F0834',
        '#61030C',
        // '#661700',
        // '#693800',
        '#6A4000',
        // '#765F00',
        // '#716B00',
        '#3D5309',
        '#161616',
      ]
    }
  },
}
</script>

<style scped lang='scss'>;
ul.dropdown-menu {
  li {
    list-style-type: none;
    &:hover {
      background-color: rgba($color: #6c757d, $alpha: .1);
    }
  }
}
.color-collapse {
  .color-show {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
    border: solid 1px #6c757d;
  }
  .color-input {
    outline: none;
  }
  ul.dropdown-color-menu {
    li {
      list-style-type: none;
      height: 2rem;
      cursor: pointer;
      &:hover {
        border: solid 3px #FFFFFF;
      }
    }
  }
}
</style>
<template>
  <nav class="navbar navbar-expand-lg navbar-light position-fixed w-100 bg-white shadow-sm py-3">
    <div class="container-fluid px-3 px-lg-5 flex-nowrap">
      <a class="navbar-brand" href="#">Photoshare</a>
      <form class="search-form flex-grow-1 me-2 d-flex align-items-center bg-secondary bg-opacity-10 rounded-4 position-relative">
        <i class="ri-search-line fs-4 text-primary px-2"></i>
        <input class="form-control border-0 shadow-none ps-0" type="text" placeholder="搜尋免費相片" aria-label="Search">
        <div class="search-form-dropdown w-100 shadow py-3 border-0 rounded-4 position-absolute top-100 bg-white">
          <p class="px-3 mt-3">最近搜尋</p>
          <ul class="nav px-3 mb-4">
            <li class="nav-item recent-search-item mb-2 me-2">
              <a class="nav-link recent-search-link rounded-4" aria-current="page" href="#">我的收藏</a>
            </li>
            <li class="nav-item recent-search-item mb-2 me-2">
              <a class="nav-link recent-search-link rounded-4" aria-current="page" href="#">我的收藏</a>
            </li>
            <li class="nav-item recent-search-item mb-2 me-2">
              <a class="nav-link recent-search-link rounded-4" aria-current="page" href="#">我的收藏</a>
            </li>
            <li class="nav-item recent-search-item mb-2 me-2">
              <a class="nav-link recent-search-link rounded-4" aria-current="page" href="#">我的收藏</a>
            </li>
            <li class="nav-item recent-search-item mb-2 me-2">
              <a class="nav-link recent-search-link rounded-4" aria-current="page" href="#">我的收藏</a>
            </li>
          </ul>
          <p class="px-3">精選收藏</p>
          <ul class="nav px-3 ">
            <li class="collection-item nav-item rounded-4 mb-3 me-3">
              <a class="nav-link collection-link rounded-4 d-flex flex-column" aria-current="page" href="#">
                <span>Cool Cats</span>
                <span class="fw-normal">49張相片和影片</span>
              </a>
            </li>
            <li class="collection-item nav-item rounded-4 mb-3 me-3">
              <a class="nav-link collection-link rounded-4 d-flex flex-column" aria-current="page" href="#">
                <span>Cool Cats</span>
                <span class="fw-normal">49張相片和影片</span>
              </a>
            </li>
          </ul>
        </div>
      </form>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end flex-grow-0" id="navbarSupportedContent">
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link pe-0" aria-current="page" href="#">我的收藏</a>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li> -->
          <!-- <li class="nav-item dropdown">
            <div id="searchDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">123</div>
            <ul class="dropdown-menu" aria-labelledby="searchDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    msg: String
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  mounted() {

  },
  
}
</script>

<style scoped lang="scss">
.navbar {
  z-index: 1;
}

.search-form {
  .form-control {
    background-color: transparent;

    &:focus + .search-form-dropdown{
      visibility: visible;
      opacity: 1;
    }
  }

  .search-form-dropdown {
    visibility: hidden;
    opacity: 0;
    transition: .3s ease;
  }

  .recent-search-item {
    .recent-search-link {
      background-color: rgba($color: #6c757d, $alpha: .1);
    }

    &:hover {
      .recent-search-link {
        background-color: rgba($color: #6c757d, $alpha: .3);
      }
    }
  }

  .collection-item {
    .collection-link {
      box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.1);
      background-color: white;
      transition: .3s ease;
    }

    &:hover {
      .collection-link {
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0);
        background-color: rgba($color: #6c757d, $alpha: .1);
      }
    }
  }

}
</style>

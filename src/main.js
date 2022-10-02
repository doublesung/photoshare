import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import store from './store'
import Loading from 'vue-loading-overlay' //component
import 'vue-loading-overlay/dist/vue-loading.css' //style
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(infiniteScroll)

Vue.config.productionTip = false

Vue.component('loading', Loading)

// 頁面跳轉時回到頂部
router.afterEach(() => {
	window.scrollTo(0, 0);
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

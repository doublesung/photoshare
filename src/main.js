import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import store from './store'
import Loading from 'vue-loading-overlay' //component
import 'vue-loading-overlay/dist/vue-loading.css' //style
import infiniteScroll from 'vue-infinite-scroll'
import { initializeApp } from 'firebase/app'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyBbUhwFunt876lfxo3pqV4WWlDBeBP1hGU',
  authDomain: 'photoshare-15d83.firebaseapp.com',
  databaseURL: 'https://photoshare-15d83-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'photoshare-15d83',
  storageBucket: 'photoshare-15d83.appspot.com',
  messagingSenderId: '93747106897',
  appId: '1:93747106897:web:7411a06d7d865904da1470'
}

initializeApp(firebaseConfig)

Vue.use(infiniteScroll)

Vue.component('loading', Loading)

// 頁面跳轉時回到頂部
router.afterEach(() => {
	window.scrollTo(0, 0)
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Photos from '../pages/Photos'
import Videos from '../pages/Videos'
import Search from '../pages/Search'
import Collections from '../pages/Collections'
import Collection from '../pages/Collection'

export default new VueRouter({
  routes:[
    {
      path: '/',
      redirect: '/photos'   
    },
    {
      path: '/photos',
      component: Photos,  
    },
    {
      path: '/videos',
      component: Videos
    },
    {
      path: '/search/:query',
      component: Search
    },
    {
      path: '/search/video/:query',
      component: Search
    },
    {
      path: '/collections',
      component: Collections,
    },
    {
      path: '/collections/:id',
      component: Collection
    },
    {
      path: '/collections/featured/:id',
      component: Collection,
      meta: { 
        isFeatured: true
      }
    }
  ]
})
import {createRouter , createWebHistory} from "vue-router"
import Home from "../views/Home.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/news/:encodedUrl',
    name: 'NewsDetail',
    component: () => import('@/views/NewsDetail.vue'),
    props: true
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  }
]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes,
//   scrollBehavior() {
//     return { x: 0, y: 0 }
//   }
// })

const router = createRouter({
    history : createWebHistory("/"), 
    routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'noVerify',
    component: () => import('../views/noVerify/index.vue'),
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import('../views/verify/index.vue'),
  },
  {
    path: '/result',
    name: 'result',  
    component: () => import('../views/examineResult/index.vue')
  },
  {
    path: '/progress',
    name: 'rprogress',  
    component: () => import('../views/reviewProgress/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

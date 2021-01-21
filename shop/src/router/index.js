import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import zhuanti from '../views/zhuanti.vue'
import fenlei from '../views/fenlei.vue'
import flxq from '../views/flxq.vue'
import xiangqing from '../views/xiangqing.vue'
import shopcar from '../views/shopCar.vue'
import mySelf from '../views/mySelf.vue'
import error from '../views/error.vue'
import submit from '../views/sumbit.vue'
import login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/zhuanti',
    component:zhuanti,
  },
  {
    path:'/fenlei',
    component:fenlei
  },
  {
  path:'/flxq/:id',
  component:flxq,  
  props:true
  },
  {
    path:'/xiangqing/:id',
    component:xiangqing,
    props:true
  },
  {
    path:'/shopcar',
    component:shopcar,
  },
  {
    path:'/mySelf',
    component:mySelf
  },
  {
    path:'/error',
    component:error
  },
  {
    path:'/submit',
    component:submit
  },
  {
    path:'/login',
    component:login
  }
]

const router = new VueRouter({
  routes
})

export default router

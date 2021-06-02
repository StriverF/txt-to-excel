import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

const TextToExcel = () => import(/* webpackChunkName: "tools" */ '../views/TextToExcel')
const UnitConversion = () => import(/* webpackChunkName: "tools" */ '../views/UnitConversion')
const TimeConversion = () => import(/* webpackChunkName: "tools" */ '../views/TimeConversion')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home
    redirect: '/text-to-excel'
  },
  {
    path: '/text-to-excel',
    name: 'TextToExcel',
    component: TextToExcel
  },
  {
    path: '/unit-conversion',
    name: 'UnitConversion',
    component: UnitConversion
  },
  {
    path: '/time-conversion',
    name: 'TimeConversion',
    component: TimeConversion
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

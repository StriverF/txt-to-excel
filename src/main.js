import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registAntd' // 按需引入Antd组件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

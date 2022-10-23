import Vue from 'vue'
import App from './App.vue'
import store from './store'
import "./assets/css/input.css"

// @ts-ignore
import Icons from '@/assets/svg/index'
Vue.component('g-icon', Icons)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

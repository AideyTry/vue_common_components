import Vue from 'vue'
import App from './App'
import router from './router'
// import 'src/assets/reset.css'
Vue.config.productionTip = false //阻止vue在启动时生成的生产提示
Vue.config.devtools = true // 开启Devtools工具

console.log('is ok')
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
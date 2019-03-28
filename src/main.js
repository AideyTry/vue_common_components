import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
// import 'src/assets/reset.css'
Vue.config.productionTip = false //阻止vue在启动时生成的生产提示
Vue.config.devtools = true // 开启Devtools工具
Vue.use(ElementUI, {
  size: 'medium' // set element-ui default size
})

console.log('is ok')
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
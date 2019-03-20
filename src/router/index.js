import Vue from 'vue'
import Router from 'vue-router'
import Layout from 'views/layout'
import Search from '@/components/search'
import Evaluate from '@/components/evaluate'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/search',
          name: 'search',
          component: Search
        },
        {
          path: '/evaluate',
          name: 'evaluate',
          component: Evaluate
        }
      ]
    }
  ]
})
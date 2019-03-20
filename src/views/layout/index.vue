<template>
  <div class="wraper">
    <header class="header">
      <h2>公共可复用组件1</h2>
    </header>
    <aside class="sidebar">
      <nav>
        <ul>
          <li
            v-for="(nav, index) in navs"
            :key="index"
          >
            <span>{{nav.title}}</span>
          </li>
        </ul>
      </nav>
    </aside>
    <section class="section">

    </section>
  </div>
</template>

<script>
import 'src/assets/reset.css'
export default {
  name: 'layout',
  data () {
    return {
      navs: [
        {
          name: 'search',
          title: '搜索'
        },
        {
          name: 'evaluate',
          title: '评价'
        }
      ]
    }
  }
}
</script>

<style>
    .header h2 {
        text-align: center;
    }
    .wraper .sidebar ul li {
        cursor: pointer;
        list-style: none;
    }
</style>

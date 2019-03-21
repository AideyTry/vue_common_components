<template>
  <div class="wraper">
    <header class="header">
      <h2>公共可复用组件</h2>
    </header>
    <div class="main">
      <aside class="sidebar">
        <nav>
          <ul>
            <li
              v-for="(nav, index) in navs"
              :key="index"
              :class="activeIndex === index ? 'active': ''"
              @click="checkedNav(index, nav.name)"
            >
              <span>{{nav.title}}</span>
            </li>
          </ul>
        </nav>
      </aside>
      <section class="section">
        <router-view></router-view>
      </section>
    </div>
  </div>
</template>

<script>
import 'src/assets/reset.css'
export default {
  name: 'layout',
  data () {
    return {
      activeIndex: '',
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
  },
  methods: {
    checkedNav (index, name) {
      this.activeIndex = index
      this.$router.push({ name: name })

    }
  }
}
</script>

<style lang="css">
.header h2 {
  text-align: center;
}
.wraper .sidebar ul li {
  cursor: pointer;
  padding: 10px 0 10px 20px;
}
.wraper .sidebar ul li:active {
  color: #1890ff;
}
.active {
  color: #1890ff;
}
.wraper {
}
</style>

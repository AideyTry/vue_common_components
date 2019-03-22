<template>
  <div class="wraper">
    <header class="header">
      <h2>公共可复用组件</h2>
    </header>
    <div class="main clearfix">
      <aside class="sidebar fl">
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
      <section class="section fr">
        <router-view></router-view>
      </section>
    </div>
  </div>
</template>

<script>
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

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
}
@import "@/assets/index.scss";

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
  .header {
    height: 60px;
    line-height: 60px;
    box-sizing: border-box;
  }
  .main {
    height: calc(100vh - 60px);
    .sidebar {
      width: 20%;
      height: inherit;
      border-right: 1px solid $border-color-base;
    }
    .section {
      width: 80%;
      position: absolute;
      left: 20%;
    }
  }
}
</style>

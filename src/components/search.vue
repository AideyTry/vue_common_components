<!--
 * @Author: DaiLinBo
 * @LastEditors: DaiLinBo
 * @Description: 搜索公共组件
 * @params 
 * @methods 
 * @Date: 2019-03-20 22:43:26
 * @LastEditTime: 2019-04-04 18:25:44
 -->
<template>
  <div class="search-wraper">
    <el-input
      :title="queryString"
      v-model="queryString"
      ref="input"
      @focus="handleFocus"
      @input="onChange"
      @keydown.up.native.prevent="highlight(currentIndex - 1)"
      @keydown.down.native.prevent="highlight(currentIndex + 1)"
      @keydown.enter.native="handleKeyEnter"
      v-clickoutside="close"
      v-enteroutside="close"
    >
    </el-input>
    <ul
      class="content"
      v-if="activated"
      ref="ul"
      @scroll="onScroll"
    >
      <li
        :class="{current:(currentIndex === index)}"
        v-for="(item, index) in options"
        :key="index"
        ref="lis"
        @mousedown="selectChange(item, options)"
        @mouseenter="mouseEnter(index)"
      >
        <div
          class="li-item"
          v-htmls="item"
        >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'search',
  props: {
    placeholder: {
      type: String,
      default: '请输入'
    },
    options: {
      type: Array,
      default: []
    },
    value: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  directives: {
    htmls: {
      bind: (el, binding) => {
        el.innerHTML = `<span>${binding.value.code || ''}</span>&nbsp;<span>${binding.value.phone || ''}</span>&nbsp;<span>${binding.value.name || ''}</span>`
      },
      update: (el, binding) => {
      },
      unbind: (el, binding) => {
      }
    },
    /**
     * @description 自定义指令v-clickoutside，点击弹框职位关闭弹框
     */
    clickoutside: {
      bind: (el, binding, vnode) => {
        const documentHandler = (e) => {
          console.log('e.target1=', e.target)
          console.log('binding.expression1=', binding.expression)
          if (el.contains(e.target)) {
            return false
          }
          if (binding.expression) {
            console.log('binding.expression1=', binding.expression)
            binding.value(e)
          }
        }
        el._vueClickOutside_ = documentHandler
        document.addEventListener('click', documentHandler)

        // if (this.activeFlag) {
        //   document.removeEventListener('click', el._vueClickOutside_)
        //   delete el._vueClickOutside_
        // }
      },
      unbind: (el, binding) => {
        document.removeEventListener('click', el._vueClickOutside_)
        delete el._vueClickOutside_
      }
    },
    /**
     * @description 自定义指令v-enteroutside，点击弹框职位关闭弹框
     */
    enteroutside: {
      bind: (el, binding, vnode) => {
        const documentHandlerEnter = (e) => {
          console.log('e22=', e)
          console.log('e.target22=', e.target)
          console.log('binding.expression22=', binding.expression)
          if (e.keyCode != 13) {
            return false
          }
          if (binding.expression) {
            console.log('binding.expression22=', binding.expression)
            binding.value(e)
          }
        }
        el._vueEnterOutside_ = documentHandlerEnter
        document.addEventListener('keydown', documentHandlerEnter)
      },
      inserted: (el, binding) => {
      },
      update: (el, binding) => {
      },
      unbind: (el, binding) => {
        document.removeEventListener('keydown', el._vueEnterOutside_)
        delete el._vueEnterOutside_
      }
    }
  },
  data () {
    return {
      queryString: this.value,
      flag: false,
      activeFlag: false,
      currentIndex: null,
      page: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  watch: {
    /**
     * @description 监听输入框输入的数据，对比新旧值，如果值发生改变了，则重新搜索回到初始状态
     */
    queryString (val, old) {
      if (val !== old) {
        this.page.pageNum = 1
        this.$refs.ul && (this.$refs.ul.scrollTop = 0)
      }
    }
  },
  computed: {
    activated () {
      if (this.flag && this.queryString) {
        return true
      } else {
        false
      }
    }
  },
  mounted () {
  },
  methods: {
    handleFocus () {
      this.flag = true
    },
    onChange (event) {
      if (event.keyCode === 40 || event.keyCode === 38 || event.keyCode === 13) {
        return
      }
      if (this.queryString.trim() === '') {
        this.$emit('text-changed', this.queryString)
        return
      }
      this.$emit('text-changed', this.queryString)
    },
    close (event) {
      console.log('event=', event)
      this.flag = false
    },
    mouseEnter (index) {
      this.currentIndex = index
    },
    selectChange (item, options) {
      this.$emit('change-input', { inputTitle: 'queryString', item: item })
    },
    highlight (index) {
      if (index < 0) {
        this.currentIndex = -1
        return
      }
      if (index >= this.options.length) {
        index = this.options.length - 1
      }
      let li = this.$refs.lis[index]
      let ul = this.$refs.ul
      let scrollTop = ul.scrollTop
      let offsetTop = li.offsetTop
      if (offsetTop + li.scrollHeight > (scrollTop + ul.clientHeight)) {
        ul.scrollTop += li.scrollHeight
      }
      if (offsetTop < scrollTop) {
        ul.scrollTop -= li.scrollHeight
      }
      this.currentIndex = index
    },
    handleKeyEnter (e) {
      if (this.flag && this.currentIndex >= 0 && this.currentIndex < this.options.length) {
        e.preventDefault()
        this.selectChange(this.options[this.currentIndex])
      } else {
        this.$emit('change-input', { inputTitle: 'queryString', item: {} })
        this.$nextTick(_ => {
          this.options = []
          this.currentIndex = -1
        })
      }
      // this.close()
      this.activeFlag = true
      console.log('this.$refs.input=', this.$refs.input.innerHTML)
      document.removeEventListener('click', this.$refs.input._vueClickOutside_)
      delete this.$refs.input._vueClickOutside_
    },
    /**
     * @description: 滚动加载页面
     */
    onScroll () {
      if (this.$refs.ul.scrollTop > (this.page.pageNum * this.page.pageSize - this.page.pageSize) * this.$refs.lis[0].offsetHeight) {
        this.page.pageNum++
        this.$emit('next-page', this.page.pageNum)
      }
    }
  }
}
</script>

<style>
div,
ul,
li,
input {
  margin: 0;
  padding: 0;
}
.search-wraper {
  position: relative;
  width: 100%;
}
.search-wraper .content {
  color: #363636;
  position: absolute;
  z-index: 99999 !important;
  width: calc(100% - 2px);
  max-height: 354px;
  list-style: none;
  border: solid 1px #e4e4e4;
  background-color: #ffffff;
  border-radius: 2px;
  text-align: left;
  overflow: hidden;
  overflow-y: scroll;
  padding: 10px 0;
}
.current {
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>

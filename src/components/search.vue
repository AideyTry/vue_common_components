<template>
  <div class="search-wraper">
    <el-input
      :title="queryString"
      v-model="queryString"
      v-clickoutside="close"
      @focus="handleFocus"
      @input="onChange"
    >
    </el-input>
    <ul
      class="content"
      v-if="activated"
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
    clickoutside: {
      bind: (el, binding, vnode) => {
        const documentHandler = (e) => {
          if (el.contains(e.target)) {
            return false
          }
          if (binding.expression) {
            binding.value(e)
          }
        }
        el._vueClickOutside_ = documentHandler
        document.addEventListener('click', documentHandler)
      },
      unbind: (el, binding) => {
        document.removeEventListener('click', el._vueClickOutside_)
        delete el._vueClickOutside_
      }
    }
  },
  data () {
    return {
      queryString: this.value,
      flag: false,
      currentIndex: null,
      page: {
        pageNum: 1,
        pageSize: 10
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
    close () {
      this.flag = false
    },
    mouseEnter (index) {
      this.currentIndex = index
    },
    selectChange (item, options) {
      if (this.options[this.currentIndex].code) {
        this.queryString = `${this.options[this.currentIndex].code || ''} ${this.options[this.currentIndex].name || ''} ${this.options[this.currentIndex].phone || ''}`
      }
      if (this.options[this.currentIndex].modelName && !this.options[this.currentIndex].code) {
        this.queryString = `${this.options[this.currentIndex].brandName || ''} ${this.options[this.currentIndex].lineName || ''} ${this.options[this.currentIndex].modelName || ''}`
      }
    },
    onScroll (event) {
      // console.log('event=', event)
      // console.log('this.$refs.lis=', this.$refs.lis)
      if(event.srcElement.scrollTop > (this.page.pageNum * this.page.pageSize - 10) * this.$refs.lis[0].offsetHeight){
        console.log(1111111)
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
  padding: 5px 0;
}
.current {
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>

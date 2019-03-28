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
    >
      <li
        v-for="(item, index) in options"
        :key="index"
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
        // console.log('1===', el, binding)
        el.innerHTML = `<span>${binding.value.code || ''}</span>&nbsp;<span>${binding.value.phone || ''}</span>&nbsp;<span>${binding.value.name || ''}</span>`
      },
      update: (el, binding) => {
        // console.log('2===', el, binding)
      },
      unbind: (el, binding) => {
        // console.log('3===', el, binding)
      }
    },
    clickoutside: {
      bind: (el, binding, vnode) => {
        const documentHandler = (e) => {
          console.log('e=', e)
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
      flag: false
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
}
</style>

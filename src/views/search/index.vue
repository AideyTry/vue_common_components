<template>
  <div class="search-wrap">
    <search
      class="search-input"
      placeholder="请输入车牌/车主姓名/车主电话"
      title="新建车辆"
      :options.sync="options"
      :loading="loading"
      @text-changed="onTextChanged"
    ></search>
  </div>
</template>

<script>
import search from '@/components/search'
import { getCar } from '@/api/vehicle'
export default {
  name: 'search-wrap',
  components: {
    search
  },
  data () {
    return {
      loading: false,
      options: []
    }
  },
  mounted () {
    // this.getCars()
  },
  methods: {
    getCars () {
      let page = {
        pageNum: 1,
        pageSize: 200
      }
      getCar(11, page).then(res => {
        console.log('res=', res)
      })
    },
    // 输入信息变化时 重新获取车辆列表
    onTextChanged (query) {
      console.log('query=', query)
      let likename = query
      let page = {
        pageNum: 1,
        pageSize: 200
      }
      this.loading = true
      getCar(page, likename).then((res) => {
        this.loading = false
        let { result, desc, data } = res.data
        if (result !== 0) {
          alert(desc)
          return
        }
        this.loading = false
        this.options = []
        let arr = data.carList
        let vm = this
        arr.forEach(function (val, index) {
          if (val.code) {
            vm.options.push(val)
          }
        })
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search-wrap {
  position: relative;
    .search-input{
      width: 320px !important;
      height: 36px;
      line-height: 36px;
  }
}
</style>

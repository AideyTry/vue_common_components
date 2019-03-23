<template>
  <div>搜索</div>
</template>

<script>
import {getCar} from '@/api/vehicle'
export default {
  name: 'search',
  data () {
    return {
      
    }
  },
  mounted () {
    this.getCars()
  },
  methods: {
    getCars () {
      let page = {
        pageNum: 1,
        pageSize: 200
      }
      getCar(11, page).then(res  => {
        console.log('res=', res)
      })
    }
  }
}
</script>

<style>

</style>

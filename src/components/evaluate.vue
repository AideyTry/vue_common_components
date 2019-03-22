<template>
  <div>评价</div>
</template>

<script>
import { reviewOptions } from 'api/order'
export default {
  name: 'evaluate',
  data () {
    return {
      reviewOptions: []
    }
  },
  mounted(){
    this.getReviewOptions()
  },
  methods: {
    getReviewOptions () {
      reviewOptions().then((res) => {
        console.log('res===', res)
      })
    }
  }
}
</script>

<style>

</style>

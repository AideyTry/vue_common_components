<template>
  <div class="evaluate-wraper">
    <evaluate :max="5" :starId="reviewOptions && reviewOptions.id" @review-changed="reviewChanged"></evaluate>
    <div class="evaluate-item" v-for="(item, index) in (reviewOptions && reviewOptions.children)" :key="index">
      <span class="item-name">{{item.name}}</span>
      <evaluate :light-star="require('assets/images/review-star-active.png')" :grey-star="require('assets/images/review-star-default.png')" @review-changed="reviewChanged"></evaluate>
    </div>
  </div>
</template>

<script>
import Evaluate from '@/components/evaluate'
import { reviewOptions } from 'api/order'
export default {
  name: 'evaluate-wraper',
  components: {
    Evaluate
  },
  data () {
    return {
      reviewOptions: null,
      reviews: {}
    }
  },
  mounted () {
    this.getReviewOptions()
  },
  methods: {
    getReviewOptions () {
      reviewOptions().then((res) => {
        console.log('res===', res)
        this.reviewOptions = res.data.data
        console.log('this.reviewOptions=', this.reviewOptions)
      })
    },
    reviewChanged (res) {
      this.reviews[res.starId] = res.activeIndex
      console.log('reviews=', this.reviews)
    }
  }
}
</script>

<style>
</style>

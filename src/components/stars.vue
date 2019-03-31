<template>
  <div class="stars">
    <img
      class="star"
      v-for="(item, index) in max"
      :key="index"
      :src="(index + 1) <= activeIndx ? lightStar : greyStar"
      @click="rank(index)"
      alt=""
    >
  </div>
</template>

<script>
export default {
  name: 'stars',
  props: {
    max: {
      type: Array,
      default: [1, 2, 3, 4, 5]
    },
    starId: {
      type: Number
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    score: {
      type: Number,
      default: 0
    },
    lightStar: {
      type: String,
      default: require('assets/images/star-big-active.png')
    },
    greyStar: {
      type: String,
      default: require('assets/images/star-big-default.png')
    }
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  computed: {
    activeIndx () {
      if (this.score) {
        return this.score
      } else {
        return this.activeIndex
      }
    }
  },
  mounted () {
  },
  methods: {
    rank (index) {
      if (this.readOnly) {
        return
      }
      this.activeIndex = index + 1
      this.$emit('review-changed', { starId: this.starId, activeIndex: this.activeIndex })
    }
  }
}
</script>

<style lang="scss" scoped>
.star {
  display: inline-block;
  width: 17px;
  height: 17px;
  margin-right: 6px;
}
</style>

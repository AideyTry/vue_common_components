<template>
  <div class="stars">
    <img
      class="star"
      v-for="(item, index) in max"
      :key="index"
      :src="(index + 1) <= activeIndex ? lightStar : greyStar"
      @click="rank(index)"
      alt=""
    >
  </div>
</template>

<script>
export default {
  name: 'evaluate',
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
    // currentSrc (index) {
    //     let src = (index + 1) <= this.activeIndex ? this.lightStar : this.greyStar
    //     console.log('src=', src)
    //     // let context = require.context('./src/assets/images', false, /\.png$/)
    //     // let keys = context.keys()
    //     return require(`${src}`)
    // }
  },
  mounted () {
  },
  methods: {
    rank (index) {
      this.activeIndex = index + 1
      this.$emit('review-changed', { starId: this.starId, activeIndex: this.activeIndex })
    }
  }
}
</script>

<style lang="scss" scoped>
.stars {
  display: flex;
  align-items: center;
  justify-content: center;
}

.star {
  display: inline-block;
  width: 27px;
  height: 25px;
  margin-right: 6px;
}
</style>

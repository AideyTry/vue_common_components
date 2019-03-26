<template>
  <div class="evaluate-wraper">
    <nav class="subnav">
      <div
        class="subnav-fl"
        @click="changeTab(0)"
      >
        <span>评价</span>
      </div>
      <div
        class="subnav-fr"
        @click="changeTab(1)"
      >
        <span>查看</span>
      </div>
    </nav>
    <section class="section">
      <div
        class="submit"
        v-if="!tabIndex"
      >
        <stars
          :max="5"
          :starId="reviewOptions && reviewOptions.id"
          @review-changed="reviewChanged"
        ></stars>
        <div
          class="evaluate-item"
          v-for="(item, index) in (reviewOptions && reviewOptions.children)"
          :key="index"
        >
          <span class="item-name">{{item.name}}</span>
          <stars
            :light-star="require('assets/images/review-star-active.png')"
            :grey-star="require('assets/images/review-star-default.png')"
            @review-changed="reviewChanged"
          ></stars>
        </div>
        <input
          type="textarea"
          v-model="comment"
        >
        <footer class="footer">
          <button
            class="default-btn"
            @click="submitReview"
          ><span>提交</span></button>
        </footer>
      </div>
      <div
        class="review-wraper"
        v-else
      >
        <div class="review">
          <h3>本次服务评价</h3>
          <stars
            :score="intValue(reviews[0])"
            :light-star="require('assets/images/star-big-active.png')"
            :grey-star="require('assets/images/star-big-default.png')"
            :readOnly="true"
          ></stars>
          <div
            v-for="(item, index) in newReviews"
            :key="index"
            class="review-item"
          >
            <span>{{item.evaluateName}}</span>
            <stars
              :score="intValue(item)"
              :light-star="require('assets/images/review-star-active.png')"
              :grey-star="require('assets/images/review-star-default.png')"
              :readOnly="true"
            ></stars>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import stars from '@/components/stars'
import { reviewOptions, submitReview, orderEvaluate } from 'api/order'
export default {
  name: 'evaluate-wraper',
  components: {
    stars
  },
  data () {
    return {
      reviewOptions: null,
      reviews: {},
      newReviews: [],
      comment: '',
      tabIndex: 0
    }
  },
  mounted () {
    this.getReviewOptions()
  },
  methods: {
    intValue (obj = {}) {
      return Math.round(obj.score)
    },
    getReviewOptions () {
      reviewOptions().then((res) => {
        this.reviewOptions = res.data.data
        console.log('this.reviewOptions=', this.reviewOptions)
      })
    },
    reviewChanged (res) {
      this.reviews[res.starId] = res.activeIndex
      console.log('reviews=', this.reviews)
    },
    changeTab (index) {
      this.tabIndex = index
      if (index) {
        this.getOrderEvaluate()
      }
    },
    submitReview () {
      let params = []
      for (let i = -1; i < this.reviewOptions.children.length; i++) {
        let id = i === -1 ? this.reviewOptions.id : this.reviewOptions.children[i].id
        let name = i === -1 ? this.reviewOptions.name : this.reviewOptions.children[i].name
        let comment = i === -1 ? this.comment : null
        params.push({
          companyId: 78,
          serviceId: 10445521,
          evaluateId: id,
          score: this.reviews[id] || 0,
          evaluateName: name,
          evaluateContent: comment
        })
      }
      submitReview(JSON.stringify(params)).then((res) => {
        console.log('res=', res)
        if (res.data.result !== 0) {
          alert(res.desc)
          return
        }
        alert('评价成功！')
      })
    },
    getOrderEvaluate () {
      let params = {
        id: 10441722
      }
      orderEvaluate(params).then((res) => {
        let { desc, data } = res
        if (data.result !== 0) {
          alert(desc)
          return
        }
        this.reviews = data.data.detailVOList.slice(0, 4)
        this.newReviews = data.data.detailVOList.slice(1, 4)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/index.scss";
.evaluate-wraper {
  .subnav {
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid $border-color-base;
    display: flex;
    justify-content: space-between;
    color: #fff;
    .subnav-fl,
    .subnav-fr {
      flex: 1;
      text-align: center;
      background-color: #7dbcea;
      cursor: pointer;
    }
    .subnav-fl {
      border-right: 1px solid $border-color-base;
    }
  }
  .section {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    .submit {
      margin-bottom: 10px;
      .evaluate-item {
        display: flex;
        justify-content: center;
      }
      .footer {
        height: 69px;
        line-height: 69px;
        text-align: center;
      }
    }
    .review-wraper {
      display: flex;
      justify-content: center;
      .review {
        .review-item {
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
</style>

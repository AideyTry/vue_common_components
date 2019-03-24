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
        <evaluate
          :max="5"
          :starId="reviewOptions && reviewOptions.id"
          @review-changed="reviewChanged"
        ></evaluate>
        <div
          class="evaluate-item"
          v-for="(item, index) in (reviewOptions && reviewOptions.children)"
          :key="index"
        >
          <span class="item-name">{{item.name}}</span>
          <evaluate
            :light-star="require('assets/images/review-star-active.png')"
            :grey-star="require('assets/images/review-star-default.png')"
            @review-changed="reviewChanged"
          ></evaluate>
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
      <!-- <div
        class="review"
        v-else
      >
        <div class="review-title">
          <span>本次服务评价</span>
        </div>
        <div class="dashed-line"></div>
        <div class="satisfied">
          <span>{{review.desc(reviews[0].score)}}</span>
          <stars
            :activeIndex="reviews[0].score"
            :read-only="true"
          ></stars>
        </div>
        <div
          class="item"
          v-for="(item, index) in reviews"
          :key="index"
        >
          <span class="item-name">{{reviews[index].evaluateName}}</span>
          <stars
            :activeIndex="reviews[index].score"
            :read-only="true"
            :light-star="require('assets/images/review-star-active.png')"
            :grey-star="require('assets/images/review-star-default.png')"
          ></stars>
          <span class="star-text">{{review.desc(reviews[index].score)}}</span>
        </div>
      </div> -->
    </section>
  </div>
</template>

<script>
import Evaluate from '@/components/evaluate'
import { reviewOptions, submitReview, getReviews } from 'api/order'
export default {
  name: 'evaluate-wraper',
  components: {
    Evaluate
  },
  data () {
    return {
      reviewOptions: null,
      reviews: {},
      comment: '',
      tabIndex: 0
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
    },
    changeTab (index) {
      this.tabIndex = index
      if (index) {
        this.getReviews(this.reviewOptions && this.reviewOptions.children.length)
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
    getReviews (length = 3) {
      let params = {
        companyId: 78,
        serviceId: 10445521
      }
      getReviews(params).then((res) => {
        // if (res.result !== 0) {
        //   // alert(res.desc)
        //   return
        // }

        this.reviews.slice(0, length + 1)
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
    .submit {
      margin-bottom: 10px;
      .footer {
        height: 69px;
        line-height: 69px;
        text-align: center;
      }
    }
    .review {
      .review-title {
      }
    }
  }
}
</style>

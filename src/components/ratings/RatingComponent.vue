<template>
<div id="ratings">
  <div id="scroll-wrap">
    <div class="evaluation" v-if="seller">
      <div class="evaluation-all">
        <p class="score">{{seller.score}}</p>
        <p class="evaluation-name">综合评价</p>
        <p class="level">高于周围商家{{seller.rankRate}}%</p>
      </div>
      <div class="evaluation-list">
        <div class="serviceScore scores">
          <p>服务态度
            <div class="star-wrap">
               <star-component :size="24" :star="4"></star-component>
            </div>
            <span class="score-text">{{seller.serviceScore}}</span> 
          </p>
        </div>
        <div class="foodScore scores">
           <p>商品分数
            <div class="star-wrap">
               <star-component :size="24" :star="4"></star-component>
            </div>
            <span class="score-text">{{seller.foodScore}}</span> 
          </p>
        </div>
        <div class="deliveryTime scores">
           <p>服务态度
            <div class="delivery">
               {{seller.deliveryTime}}分钟
            </div>
          </p>
        </div>
      </div>
    </div>
    <div class="cut-line"></div>
    <div class="evaluation-content" v-if="list.length">
      <rating-select :ratings="list"></rating-select>
      <div class="ratings-list">
        <ul>
         <li class="evaluation-item" v-for="rating in ratingList">
          <div class="rating-info clearfix">
            <span class="rateTime">
              {{rating.rateTime | date}}
            </span>
            <span class="username">
              {{rating.username}}<img :src="rating.avatar">    
            </span>
          </div>
          <div class="rating-content">
            <!-- 0:满意 1：不满意 -->
            <p><span :class="classMap[rating.rateType]"></span>{{rating.text}}</p>
          </div>
          </li> 
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import StarComponent from 'components/star/StarComponent'
import RatingSelect from 'components/rating-select/RatingSelect'
import { mapGetters } from 'vuex'

const ERR_OK = 0
export default {
  data () {
    return {
      ratings: null,
      seller: null,
      list: [],
      classMap: ['icon-thumb_up', 'icon-thumb_down'],
      scroll: null
    }
  },
  mounted () {
    this.fetchRatingsData()
    this.fetchSellerData()
  },
  methods: {
    fetchSellerData () {
      this.$http('/api/seller')
      .then((data) => {
        if (data.data.errno === ERR_OK) {
          this.seller = data.data.data
        }
      })
    },
    fetchRatingsData () {
      this.$http('/api/ratings')
      .then((data) => {
        if (data.data.errno === ERR_OK) {
          this.list = data.data.data
          if (!this.scroll) {
            this.$nextTick(() => {
              this._initScroll()
            })
          } else {
            this.scroll.refresh()
          }
        }
      })
    },
    _initScroll () {
      this.scroll = new BScroll(this.$el, {
        click: true
      })
    }
  },
  computed: {
    ...mapGetters({
      _rateType: 'getSelectedType',
      isOnlyContent: 'isOnlyContent'
    }),
    ratingList () {
      let ratingsArr = []
      // 如果只看内容
      if (this.isOnlyContent) {
        ratingsArr = this.list.filter(rating => rating.text !== '')
      } else {
        ratingsArr = this.list
      }
      if (this._rateType === 2) {
        return ratingsArr
      } else {
        return ratingsArr.filter(rating => rating.rateType === this._rateType)
      }
    }
  },
  components: {
    StarComponent,
    RatingSelect
  },
  watch: {
    // 刷新视图
    _rateType: function (n) {
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    // 刷新视图
    isOnlyContent: function () {
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../common/scss/utils.scss';

#ratings {
  position: absolute;
  width: 100%;
  top: rem(348);
  bottom: rem(96);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .evaluation {
    display: flex;
    height: rem(160);
    padding-bottom: rem(72);
    .evaluation-all {
      flex: 0 0 rem(275);
      margin: rem(36) 0;
      height: 100%;
      text-align: center;
      border-right: 1px solid rgba(7,17,27,.5);
      .score {
        margin-bottom: rem(12);
        @include font-dpr(48px);
        color: rgb(255,153,0);
        line-height: rem(56);
      }
      .evaluation-name {
        margin-bottom: rem(16);
        @include font-dpr(24px);
        color: rgb(7,17,27);
        line-height: rem(24);
      }
      .level {
        margin-bottom: rem(12);
        color: rgba(7,17,27,.6);
        @include font-dpr(24px);
        line-height: rem(20);
      }
    }
    .evaluation-list {
      flex: 1;
      height: 100%;
      margin: rem(36) 0;
      box-sizing: border-box;
      padding: 0 rem(48);
      .scores {
        display: flex;
        align-items: center;
        height: 33.3333%;
        .delivery {
          @include font-dpr(24px);
          color: rgb(147,153,159);
          line-height: rem(36);
        }
        p {
          @include font-dpr(24px);
          line-height: rem(24);
          color: rgb(7,17,27);
          padding-right: rem(24);

        }
        .score-text {
          display: inline-block;
          margin-left: rem(16);
          color: #ff9900
        }
      }
    }
  }
  .cut-line {
    height: rem(36);
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    background: #f3f5f7;
  }
  .ratings-list {
    box-sizing: border-box;
    padding: rem(36);
    padding-top: 0;
    margin-top: rem(-36);
    overflow: hidden; 
    .evaluation-item {
      @include font-dpr(20px);
      @extend %borderOne;
      line-height: rem(24);
      color: rgb(147,153,159);
      padding-bottom: rem(24);
      &:last-child {
        @extend %noBorder;
      };
      .rateTime {
        float: left;
      }
      .username {
        float: right;
        margin-right: rem(36);
        img {
          margin-left: rem(12);
          vertical-align: top;
          width: rem(24);
          border-radius: 50%;
        }
      }
      .rating-content {
        p {
          @include font-dpr(24px);
          line-height: rem(48);
          span {
            margin-right: rem(10);
            &.icon-thumb_up {
              color: rgb(0,160,220);
            }
          }
        }
      }
    }
  }
  
}
</style>
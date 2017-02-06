<template>
  <transition name="slide">
    <div id="food" v-if="selected">
      <div id="scroll">
        <div class="header">
          <img :src="selectedFood.image">
          <span @click="back" class="back icon-arrow_lift"></span>
        </div>
        <div class="content">
          <div class="food-title">
            <h1>{{selectedFood.name}}</h1>
            <span>月售{{selectedFood.sellCount}}份</span><span>好评率{{selectedFood.rating}}%</span>
            <p>
              <i class="nowPrice"><small>￥</small>{{selectedFood.price}}</i>
              <i class="oldPrice" v-if="selectedFood.oldPrice">{{'￥'+selectedFood.oldPrice}}</i>
            </p>
            <transition name="fade">
              <div class="cartControlWrap shop" v-show="foodCount">
                <cart-controller :food="selectedFood"></cart-controller>
              </div>
            </transition>
            <transition name="fade">
              <!-- 有问题，添加次数等于点开商品详情的次数 -->
              <div class="addCart shop" @click="addCart(selectedFood)" v-show="!foodCount">加入购物车</div>
            </transition>
          </div>
          <!-- 商品简介 -->
          <div v-if="selectedFood.info">
            <div class="cut-line"></div>
            <div class="introduce">
              <h1 class="common">商品介绍</h1>
              <p>
                {{selectedFood.info}}
              </p>
            </div>
          </div>
          <!-- 买家评论 -->
          <div v-if="selectedFood.ratings">
            <div class="cut-line"></div>
            <div class="food-ratings">
              <h1 class="common">商品评价</h1>
              <div class="evaluation-content">
                <!-- 查看评论组件 -->
                 <rating-select
                  :ratings="selectedFood.ratings" 
                  :desc="desc" 
                  :onlyContent="onlyContent" 
                  :rateType="rateType">
                <rating-select>
              </div>
              <!-- 评论区 -->
              <div class="evaluation-list">
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
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import CartController from 'components/cart-controller/CartController'
import RatingSelect from 'components/rating-select/RatingSelect'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      selected: false,
      recommends: [],
      classMap: ['icon-thumb_up', 'icon-thumb_down'],
      desc: {
        all: '全部',
        satisfied: '推荐',
        dissatisfied: '吐槽'
      },
      onlyContent: true,
      rateType: 2
    }
  },
  props: ['selectedFood'],
  watch: {
    selected: function (n) {
      if (n === true) {
        this.$nextTick(() => {
          /* eslint-disable no-new */
          new BScroll(this.$el, {
            click: true
          })
        })
      }
    }
  },
  computed: {
    ...mapGetters({
      foods: 'allFoods',
      _rateType: 'getSelectedType',
      isOnlyContent: 'isOnlyContent'
    }),
    foodCount () {
      // 返回当前选中食物在购物车的数量
      return this.foods.find(food => {
        if (food.food.name === this.selectedFood.name) {
          return food.quantity
        }
      })
    },
    ratingList () {
      let ratingsArr = []
      // 如果只看内容
      if (this.isOnlyContent) {
        ratingsArr = this.selectedFood.ratings.filter(rating => rating.text !== '')
      } else {
        ratingsArr = this.selectedFood.ratings
      }
      if (this._rateType === 2) {
        return ratingsArr
      } else {
        return ratingsArr.filter(rating => rating.rateType === this._rateType)
      }
    }
  },
  methods: {
    ...mapActions([
      'addCart'
    ]),
    back () { // 返回主界面
      this.selected = false
    }
  },
  components: {
    CartController,
    RatingSelect
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/scss/utils.scss';

#food {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 3;
  bottom: rem(96);
  background: #fff;
  overflow: hidden;
  .header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .back {
      position: absolute;
      top: rem(50);
      left: rem(25);
      width: rem(50);
      height: rem(50);
      padding: rem(25);
      text-align: center;
      @include font-dpr(40px);
      line-height: rem(50);
      color: #fff
    }
  }
  .content {
    .food-title {
      position: relative;
      box-sizing: border-box;
      padding: rem(36);
      font-size: 0px;
      h1 {
        margin-bottom: rem(16);
        @include font-dpr(28px);
        color: rgb(7,17,27);
        font-weight: 700;
        line-height: rem(28)
      }
      span {
        display: inline-block;
        @include font-dpr(20px);
        color: rgb(147,153,159);
        line-height: rem(20);
        margin-right: rem(24);
      }
      p {
        margin-top: rem(36);
        line-height: rem(48);
        .nowPrice {
          @include font-dpr(30px);
          color: rgb(255,0,0);
          small {
            @include font-dpr(24px);
          }
        }
        .oldPrice {
          @include font-dpr(20px);
          margin-left: rem(10);
          text-decoration:line-through;
          color: #93999F;
        }
      }
      .shop {
        position: absolute;
        right: rem(36);
        bottom: rem(36);
      }
      .addCart {
        width: rem(148);
        height: rem(48);
        text-align: center;
        background: rgb(0,160,220);
        border-radius: 24px;
        @include font-dpr(20px);
        color: #fff;
        line-height: rem(48);
      }
    }
    .cut-line {
      height: rem(32);
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      background: #f3f5f7;
    }
    h1.common {
      @include font-dpr(28px);
      font-weight: 600;
      color: rgb(7,17,27);  
    }
    .introduce {
      padding: rem(36);
      p {
        text-indent: rem(16);
        @include font-dpr(24px);
        color: rgb(77,85,93);line-height: rem(48);
      }
    }
    .food-ratings {
      box-sizing: border-box;
      padding: rem(36) 0;
      h1.common {
        padding-left: rem(36);
      }
      .evaluation-list {
        box-sizing: border-box;
        padding-left: rem(36); 
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
 }
}
.slide-enter-active, .slide-leave-active {
  transform: translate3d(0,0,0);
  transition: all 0.25s linear
}
.slide-enter, .slide-leave-active {
  transform: translate3d(100%,0,0);
}
.fade-enter-active, .fade-leave-active {
  opacity: 1;
  transition: all 0.35s linear
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
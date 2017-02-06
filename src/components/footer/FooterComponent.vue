<template>
  <div id="foot">
    <div class="shop-cart" @click="toggleList">
      <div class="cart-wrapper">
        <div class="cart" :class="{hasFoods: totalCount > 0}">
          <span class="icon-shopping_cart"></span>
          <span class="foods-count" v-show="totalCount > 0"><i>{{totalCount}}</i></span>
        </div>
      </div>
    </div>
    <div class="price" @click="toggleList">
      <span class="count-price">￥{{totalPrice}}</span>
      <span class="exra-price">另需配送费￥{{deliveryPrice}}元 </span>
    </div>
    <div class="send" :class="{sendActive: !notAllowBuy}">{{delivery}}</div>
    <transition name="slide">
      <div class="cart-list" v-show="showCartList">
        <div class="list-title">
          <span class="title-name">购物车</span>
          <span class="clearAll" @click="clearCart">清空</span>
        </div>
        <div class="list-content">
          <ul v-if="totalCount>0">
            <li v-for="food in foods" class="account-item" v-show="food.quantity">
              <span class="food-name">{{food.food.name}}</span>
              <span class="food-price">￥{{food.food.price*food.quantity}}</span>
              <div class="cart-controller-wrap">
                <cart-controller :food="food.food"></cart-controller>
              </div>
            </li>
          </ul>
          <div class="empty" v-else>
            <span>购物车空空如也,去买点什么</span>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="bg" v-show="showCartList"></div>
    </transition>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { mapGetters, mapActions } from 'vuex'
import CartController from 'components/cart-controller/CartController'

export default {
  data () {
    return {
      notAllowBuy: true,
      showCartList: false
    }
  },
  props: ['minPrice', 'deliveryPrice'],
  methods: {
    ...mapActions([
      'clearCart'
    ]),
    toggleList () {
      this.showCartList = !this.showCartList
      if (this.showCartList === true) {
        let cartScroll = null
        // open cartList
        if (!cartScroll) {
          this.$nextTick(() => {
            cartScroll = new BScroll(this.$el.querySelector('.list-content'), {
              click: true
            })
          })
        } else {
          cartScroll.refresh()
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      foods: 'allFoods',
      totalCount: 'getTotal'
    }),
    totalPrice () {
      if (this.foods[0]) {
        // console.log(this.foods[0].quantity)
      }
      return this.foods.reduce((total, item) => {
        return total + item.food.price * item.quantity
      }, 0)
    },
    delivery () {
      // 如果没有商品
      if (!this.totalPrice) {
        this.notAllowBuy = true
        return `${this.minPrice}元起送`
      }
      // 购物车有东西,但是不满足起送要求
      if (this.totalPrice && this.totalPrice < this.minPrice) {
        this.notAllowBuy = true
        return `还差${this.minPrice - this.totalPrice}元`
      }
      // 如果满足起送要求
      if (this.totalPrice >= this.minPrice) {
        this.notAllowBuy = false
        return '去付款'
      }
    }
  },
  components: {
    CartController
  }
}
</script>
<style lang="scss" scoped>
@import '../../common/scss/utils.scss';

#foot {
  display: flex;
  position: fixed;
  z-index: 5;
  bottom: 0;
  left: 0;
  width: 100%;
  height: rem(96);
  background: #141d27;
  line-height: rem(112);
  color: rgba(255,255,255,.4);
  .shop-cart {
    position: relative;
    flex: 0 0 rem(160);
    .cart-wrapper {
      position: absolute;
      width: rem(116);
      height: rem(116);
      border-radius: 50%;
      left: rem(24);
      bottom: 0;
      background: #141d27;
      .cart {
        position: absolute;
        width: rem(88);
        height: rem(88);
        background: #2B343C;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        .icon-shopping_cart {
          @include font-dpr(48px);
          line-height: rem(48);
        }
        &.hasFoods {
          background: rgb(0,160,220);
          .icon-shopping_cart {
            color: #fff
          }
        }
        .foods-count {
          position: absolute;
          height: rem(36);
          width: rem(48);
          border-radius: rem(24);
          right: rem(-15);
          top: rem(-10);
          background: rgb(240,20,20);
          color: #fff;
          line-height: rem(36);
          text-align: center;
        }
      }
    }
  }
  .price {
    flex: 1;
    .count-price {
      display: inline-block;
      margin-right: rem(48);
      @include font-dpr(32px);
      font-weight: 700;
    }
    .current-price {
       @include font-dpr(28px)
    }
  }
  .send {
    flex: 0 0 rem(210);
    @include font-dpr(28px);
    font-weight: 700;
    text-align: center;
    background: #2B333B;
    color: rgba(255,255,255,.4)
  }
  .sendActive {
    color: #fff;
    background: rgb(240,20,20);
  }
  .ball-container {
    .ball {
      position: fixed;
      left: rem(32);
      bottom: rem(22);
      /*z-index: 99;*/
      &.drop-enter-active {
        transition: all 0.5s
      }
      .inner {
        width: rem(16);
        height: rem(16);
        border-radius: 50%;
        background: rgb(0,160,220)
      }
    }
  }
  .cart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0,-100%,0);
    opacity: 1;
    .list-title {
      width: 100%;
      height: rem(80);
      background: #f3f5f7;
      box-sizing: border-box;
      padding: 0 rem(36);
      line-height: rem(80);
      border-bottom: 1px solid rgba(7,17,27,0.1);
      .title-name {
        float: left;
        @include font-dpr(28px);
        font-weight: 200;
        color: rgb(1,17,27);
      }
      .clearAll {
        float: right;
        @include font-dpr(24px);
        color: rgb(240,20,20);
      }
    }
    .list-content {
      position: relative;
      width: 100%;
      max-height: rem(280);
      overflow: hidden;
      background: #fff;
      padding: 0 rem(36);
      .account-item {
        width: 100%;
        height: rem(96);
        @extend %borderOne;
        .food-name {
          @include font-dpr(28px);
          color:rgb(7,17,27);
          line-height: rem(48);
        }
        .food-price {
          position: absolute;
          top: rem(26);
          right: rem(240);
          color: rgb(240,20,20);
          @include font-dpr(26px);
          line-height: rem(48);
        }
        .cart-controller-wrap {
          position: absolute;
          right: rem(66);
          top: rem(26);
          line-height: 1
        }
      }
    }
    .empty {
      text-align: center;
      span {
        color: rgb(7,17,27);
        line-height: rem(30);
        @include font-dpr(26px)
      }
    }
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s;
  }
  .slide-enter, .slide-leave-active {
    transform: translate3d(0,0,0);
    opacity: 0
  }
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -3;
    width: 100%;
    height: 100%;
    background: rgba(7,17,27,.6);
    backtop: blur(10px);
  }
   .fade-enter-active, .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter, .fade-leave-active {
    background: rgba(7,17,27,0);
  }
}
</style>
<template>
  <div class="header">
    <div class="wrapper">
      <div class="avatar">
        <img width="64" height="64" :src='seller.avatar' alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="support-icon" :class="classMap[seller.supports[0].type]"></span>
          {{seller.supports[0].description}}
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showMore = true">
        <span class="count-number">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="details"  @click="showMore = true">
      <span class="bulletin-icon"></span>
      <span class="bulletin-content" v-if="seller.supports">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>   
    <div class="background">
      <img :src="seller.avatar" width="100%">
    </div>
    <transition name="fade">
      <div class="more" v-show="showMore">
        <div class="more-wrapper clearfix">
        <div class="more-main">
          <!-- 商家名称/star数 -->
          <div class="more-title" v-if="seller.supports">
            <h2>{{seller.name}}</h2>
            <div class="scores">
              <star-component :star="seller.score" :size="48"></star-component>
            </div>
          </div>
          <!-- 优惠信息 -->
          <div class="discount-info">
            <line-title :content="'优惠信息'"></line-title>
            <ul class="supports-list">
              <li class="support-item" v-for="(item, index) in seller.supports">
                <i class="support-icon" :class="classMap[seller.supports[index].type]"></i>
                <span class="support-desc">{{item.description}}</span>
              </li>
            </ul>
          </div>
          <!-- 商家公告 -->
          <div class="invoice-info">
            <line-title :content="'商家公告'"></line-title>
            <div class="invoice-content">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        </div>
        <div class="more-close" @click="showMore = false">
          <span class="icon-close"></span>
        </div>
      </div> 
    </transition>
  </div>
</template>

<script>
import StarComponent from '../star/StarComponent'
import LineTitle from '../line-title/LineTitle'

export default {
  // name: 'headerComponent',
  data () {
    return {
      supports: '',
      classMap: [],
      showMore: false
    }
  },
  props: ['seller'],
  mounted () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    StarComponent,
    LineTitle
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/scss/utils.scss';

.header{
  position: relative;
  width: 100%;
  height: rem(268);
  background: rgba(7,17,27,.5);
  overflow: hidden;
  .wrapper {
    width: 100%;
    height: rem(212);
    position: relative;
    .avatar {
      float: left;
      margin: rem(48);
      img {
        width: rem(128);
        height: rem(128);
      }
    }
    .content {
      float: left;
      margin-top: rem(52);
      font-size: 0;
      .title {
        .name {
          display: inline-block;
          @include font-dpr(32px);
          color: #fff;
          font-weight: bold;
          line-height: rem(32);
        }
        .brand {
          display: inline-block;
          vertical-align: top;
          margin-right: rem(12);
          height: rem(36);
          width: rem(60);
          background-size: rem(60) rem(36);
          @include bg-image('brand');
          background-repeat: no-repeat;
        }
      }
      .description {
        @include font-dpr(24px);
        margin: rem(16) 0 rem(20) 0;
        color: #fff;
        font-weight: 200;
        line-height: rem(24);
      }
    }
    .support-count {
      position: absolute;
      right: rem(24);
      bottom: rem(36);
      background: rgba(0,0,0,.1);
      height: rem(48);
      width: rem(80);
      padding: 0 rem(8);
      line-height: rem(48);
      border-radius: 16px;
      text-align: center;
      color: #fff;
      .count-number {
        @include font-dpr(10)
      }
      .icon-keyboard_arrow_right {
        @include font-dpr(10);
        line-height: rem(48);
        vertical-align: top;
      }
    }
  }
  .details {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: rem(56);
    line-height: rem(56);
    box-sizing: border-box;
    padding: 0 rem(44) 0 rem(24);
    background: rgba(7,17,27,0.2);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #fff;
    .bulletin-icon {
      display: inline-block;
      vertical-align: middle;
      width: rem(44);
      height: rem(24);
      @include bg-image('bulletin');
      background-size: rem(44) rem(24);
    }
    .bulletin-content {
      @include font-dpr(20);
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      right: rem(24);
      bottom: rem(18);
      @include font-dpr(20);
      line-height: rem(20);
    }
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px); 
  }
  .more {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    overflow: auto;
    text-align: center;
    opacity: 1;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: rgba(7,17,27,.85);
      /*filter: blur(10px);*/
    }
    .more-wrapper {
      height: auto;
      min-height: 100%;
      .more-main {
        padding: rem(128) 0;
      }
    }
    .more-close {
      position: relative;
      margin: rem(-128) auto 0 auto;
      width: rem(64);
      height: rem(64);
      clear: both;
      @include font-dpr(64px);
      color: #fff;
    }
    .more-title {
      @include font-dpr(32px);
      line-height: 32px;
      h2 {
        color: #fff;
        font-weight: 700;
      }
      .scores {
        margin-top: rem(32);
      }
    }
    .discount-info {
      margin-top: rem(56);
      .supports-list {
        margin-top: rem(48);
        margin-left: 10%;
        text-align: left;
        li {
          margin-bottom: rem(24);
          i {
            display: inline-block;
            width: rem(24);
            height: rem(24);
            background-size: rem(24) rem(24);
            vertical-align: top;
            &.decrease {
              @include bg-image('decrease_2'); 
            }
            &.discount {
              @include bg-image('discount_2'); 
            }
            &.special {
              @include bg-image('special_2'); 
            }
            &.invoice {
              @include bg-image('invoice_2'); 
            }
            &.guarantee {
              @include bg-image('guarantee_2'); 
            }
          }
          .support-desc {
           color: #fff;
           @include font-dpr(24px);
           line-height: rem(24);
         }
        }
      }
    }
    .invoice-info {
      margin-top: rem(56);
      .invoice-content {
         margin: 0 10%;
         padding: rem(48) rem(24);
         text-align: left;
         p {
           line-height: rem(48);
           color: #fff;
           @include font-dpr(24px);
         }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
}
</style>

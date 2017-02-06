<template>
	<div id="seller">
    <div class="scroll">
      <div class="seller-head" v-if="seller">
        <div class="head-info clearfix">
          <h1 class="seller-name">{{seller.name}}</h1>
          <div class="star-wrap">
            <star :star="seller.score" :size="36"></star>
          </div>
          <span class="rating-count count">({{seller.sellCount}})</span>
          <span class="sell-count count">月售{{seller.sellCount}}单</span>
        </div>
        <div class="add-like" @click="toggleLike">
          <span class="icon-favorite" :class="{active: isLike}"></span>
          <i class="save" v-if="!isLike">加入收藏</i>
          <i class="save" v-else="isLike">已收藏</i>
        </div>
      </div>
      <div class="level">
        <div class="minPrice item">
          <h1 class="title">起送价</h1>
          <span><i>{{seller.minPrice}}</i>元</span>
        </div>
        <div class="deliveryPrice item">
          <h1 class="title">配送费</h1>
          <span><i>{{seller.deliveryPrice}}</i>元</span>
        </div>
        <div class="deliveryTime item">
          <h1 class="title">配送时间</h1>
          <span><i>{{seller.deliveryTime}}</i>分钟</span>
        </div>
      </div>
      <div class="cut-line"></div>
      <!-- 商家活动 -->
      <div class="activity">
        <h1>公告与活动</h1>
        <p>{{seller.bulletin}}</p>
        <ul>
          <li class="support-item" v-for="support in seller.supports">
            <span class="icon" :class="classMap[support.type]"></span><span class="support-text">{{support.description}}</span>
          </li>
        </ul>
      </div>
      <div class="cut-line"></div>
      <!-- 商家实景 -->
      <div class="seller-view">
        <h1>商家实景</h1>
        <div class="view-list"></div>
      </div>
      <div class="cut-line"></div>
      <!-- 商家具体情况 -->
      <div class="seller-detail">
        <h1>商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">
            <p>{{info}}</p>
          </li>
        </ul>
      </div>
    </div>
	</div>
</template>
<style lang="scss" scoped>
@import '../../common/scss/utils.scss';

%title {
  margin-bottom: rem(16);
  @include font-dpr(28px);
  color: rgb(7,17,27);
  line-height: rem(28);
}
%liContent {
  @include font-dpr(24px);
  line-height: rem(36);
  color: rgb(7,17,27);
}
#seller {
  position: absolute;
  width: 100%;
  top: rem(348);
  bottom: rem(96);
  overflow: hidden;
  .scroll {
    padding-bottom: rem(40);
  }
  /* 头部 */
  .seller-head {
    width: 100%;
    height: rem(116);
    margin: rem(36);
    @extend %borderOne;
    .head-info {
      float: left;
      .seller-name {
        @extend %title;
      }
      .star-wrap {
        display: inline-block;
      }
      .count {
        vertical-align: bottom;
        @include font-dpr(20px);
        line-height: rem(36);
        color: rgb(77,85,93);
        &.rating-count {
          margin-left: rem(16);
        }
        &.sell-count {
          margin-left: rem(24);
        }
      }
    }
    .add-like {
      float: right;
      margin-right: rem(36);
      text-align: center;
      width: rem(100);
      .icon-favorite {
        display: inline-block;
        color: rgb(77,85,93);
        @include font-dpr(48px);
        line-height: rem(48);
        &.active {
          color: rgb(240,20,20);
        }
      }
      .save {
        display: block;
        @include font-dpr(20px);
        line-height: rem(36);
        color: rgb(77,85,93);
      }
    }
  }
  .level {
    display: flex;
    padding: rem(36);
    .item {
      flex: 1;
      text-align: center;
      border-right: 1px solid #ccc;
      &:last-child {
        border-right: none;
      };
      .title {
        margin-bottom: rem(8);
        @include font-dpr(20px);
        color: rgb(147,153,159);
        line-height: rem(20);
      }
      i {
        @include font-dpr(48px);
        color: rgb(7,17,27);
        line-height: rem(48);
      }
    }
  }
  .cut-line {
    height: rem(36);
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    background: #f3f5f7;
  }
  /* 公告与活动 */
  .activity {
    box-sizing: border-box;
    padding: rem(36);
    h1 {
      @extend %title;
    }
    p {
      padding-left: rem(24);
      padding-bottom: rem(32);
      @include font-dpr(24px);
      color: rgb(240,20,20);
      line-height: rem(48);
    }
    .support-item {
      border-top: 1px solid #ccc;
      box-sizing: border-box;
      padding: rem(32) rem(24);
      .support-text {
        @extend %liContent;
      }
      .icon {
        display: inline-block;
        margin-right: rem(12);
        width: rem(36);
        height: rem(36);
        background-size: rem(36) rem(36);
        vertical-align: top;
      }
      .decrease {
        @include bg-image('decrease_3'); 
      }
      .discount {
        @include bg-image('discount_3'); 
      }
      .special {
        @include bg-image('special_3'); 
      }
      .invoice {
        @include bg-image('invoice_3'); 
      }
      .guarantee {
        @include bg-image('guarantee_3'); 
      }
      &:last-child {
        padding-bottom: 0;
      };
    }
  }
  .seller-view {
    box-sizing: border-box;
    padding: rem(36);
    h1 {
      @extend %title;
    }
    .view-list {
      background: #f0f;
    }
  }
  .seller-detail {
    box-sizing: border-box;
    padding: rem(36);
    h1 {
      @extend %title;
    }
    .info-item {
      box-sizing: border-box;
      padding: rem(32) rem(24);
       border-top: 1px solid #ccc;
      p {
        @extend %liContent;
      }
    }
  }
}
</style>

<script>
import Star from 'components/star/StarComponent'
import BScroll from 'better-scroll'

const ERR_OK = 0
export default {
  data () {
    return {
      seller: {},
      isLike: false,
      classMap: [],
      scroll: null
    }
  },
  mounted () {
    this.fetchData()
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    fetchData () {
      this.$http('/api/seller')
      .then((data) => {
        if (data.data.errno === ERR_OK) {
          this.seller = data.data.data
          if (!this.scroll) {
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$el, {
                click: true
              })
            })
          } else {
            this.scroll.refresh()
          }
        }
      })
    },
    toggleLike () {
      this.isLike = !this.isLike
    }
  },
  components: {
    Star
  }
}
</script>
<template>
  <div id="goods">
    <!-- 左侧菜单栏 -->
    <div class="menus">
      <ul class="menu-list">
        <li v-for="(item, index) in goods" 
            class="menu-item" 
            :class="{current: currentIndex === index}"
            @click="clickMenu(index)"
        >
          <div class="menu-name">
            <p>{{item.name}}</p>
          </div>
        </li>
      </ul>  
    </div>
    <!-- 右侧具体餐饮 -->
    <div class="good-list">
      <ul class="foods">
        <li v-for="good in goods" class="singleKind">
          <ul>
            <div class="food-head">
              <h3>{{good.name}}</h3>
            </div>
            <li @click="selectFood(food)" v-for="food in good.foods" class="food-desc">
               <!-- 餐饮图片 -->
              <div class="img">
                <img :src='food.icon' alt="">
              </div>
              <!-- 餐饮描述 -->
              <div class="food-content">
                <h4>{{food.name}}</h4>
                <div class="kind">{{food.description}}</div>
                <div class="sort">
                  <span class="sort-info">月售{{food.sellCount}}</span><span class="sort-rating">好评率{{food.rating}}%</span>
                </div>
                <!-- 销售价格 -->
                <p>
                  <i class="nowPrice"><small>￥</small>{{food.price}}</i>
                  <i class="oldPrice" v-if="food.oldPrice">{{'￥'+food.oldPrice}}</i>
                </p>
               
              </div>
               <!-- 添加/减少商品 -->
              <div class="cart-controller">
                <cart-controller :food="food"></cart-controller>
              </div>
            </li>
          </ul>  
        </li>
      </ul>
    </div>
    <!-- 商品详情 -->
    <food-component :selectedFood="selectedFood" ref="foodInfo"></food-component>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import CartController from 'components/cart-controller/CartController'
import FoodComponent from 'components/food/FoodComponent'

const ERR_OK = 0
export default {
  data () {
    return {
      goods: {},
      scrollY: 0,
      listHeight: [],
      menuScroll: null,
      foodScroll: null,
      selectedFood: {}
    }
  },
  mounted () {
    this.fetchData()
  },
  computed: {
    currentIndex () {
      for (let i = 0, len = this.listHeight.length; i < len; i++) {
        let H1 = this.listHeight[i]
        let H2 = this.listHeight[i + 1]
        if (!H2 || (this.scrollY >= H1 && this.scrollY < H2)) {
          return i
        }
      }
      return 0
    }
  },
  methods: {
    fetchData () {
      this.$http('/api/goods')
        .then((data) => {
          if (data.data.errno === ERR_OK) {
            this.goods = data.data.data
            this.$nextTick(() => {
              this._initMenuScroll()
              this._initFoodScroll()
              this._computedHeigth()
            })
          }
        })
    },
    _initMenuScroll () {
      this.menuScroll = new BScroll(this.$el.querySelector('.menus'), {
        click: true
      })
    },
    _initFoodScroll () {
      // probeType滚动条滚动时派发scroll事件
      this.foodScroll = new BScroll(this.$el.querySelector('.good-list'), {
        probeType: 3,
        click: true
      })
      this.foodScroll.on('scroll', (pos) => { // 设置滚动的Y值
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _computedHeigth () { // 计算每类餐饮所占的高度
      let height = 0
      this.listHeight.push(height)
      let list = this.$el.querySelectorAll('.singleKind')
      for (var i = 0, len = list.length; i < len; i++) {
        height += parseInt(list[i].clientHeight)
        this.listHeight.push(height)
      }
    },
    clickMenu (index) {
      let list = this.$el.querySelectorAll('.singleKind')
      this.foodScroll.scrollToElement(list[index], 350)
    },
    selectFood (food) {
      this.selectedFood = food
      // ref获取子组件实例
      this.$refs.foodInfo.selected = true
      // 获取当前评论数据
      this.fetchRatingsData()
    }
  },
  components: {
    CartController,
    FoodComponent
  }
}
</script>
<style lang="scss" scoped>
  @import '../../common/scss/utils.scss';

  #goods {
    position: absolute;
    width: 100%;
    top: rem(348);
    bottom: rem(96);
    display: flex;
    overflow: hidden;
    .menus {
      flex: 0 0 rem(160);
      background: #F3F5F7;
      .menu-item {
        display: table;
        vertical-align:middle; 
        text-align:center;
        height: rem(108);
        width: rem(200);
        text-align: center;
        box-sizing: border-box;
        padding: 0 rem(20);
        &.current {
          background: #fff;
          color: rgb(240,20,20);
          @include font-dpr(28px);
          line-height: rem(28);
          font-weight: 700;
        }
        .menu-name {
          display: table-cell;
          text-align: center;
          vertical-align: middle;
          height: 100%;
          margin: 0 rem(24);
          width: rem(112);
          @extend %borderOne;
          word-wrap: normal;
        }
      }
    }
    .good-list {
      flex: 1;
      .food-head {
        height: rem(52);
        background: #F3F5F7;
        h3 {
          @include font-dpr(24px);
          color: rgb(147,153,159);
          line-height: rem(52);
          border-left: 3px solid #d9dde1;
          padding-left: rem(28)
        }
      }
      .food-desc {
        display: flex;
        position: relative;
        margin: rem(36);
        margin-bottom: 0;
        padding-bottom: rem(36);
        @extend %borderOne;
        &:last-child {
          @extend %noBorder;
        };
        .img {
          flex: 0 0 rem(114);
          img {
            width: rem(114)
          }
        }
        .food-content {
          flex: 1;
          padding: 0 rem(20);
          position: relative;
          h4 {
            margin: rem(4) 0 rem(16) 0;
            @include font-dpr(30px);
            color: rgb(7,17,27);
            line-height: rem(28);
            font-weight: 700;
          }
          .kind {
            @include font-dpr(20px);
            line-height: rem(20);
            margin: rem(16) 0;
          }
          .sort {
            line-height: rem(36);
          }
          p{
            .nowPrice {
              @include font-dpr(30px);
              color: rgb(255,0,0);
              small {
                @include font-dpr(24px);
              }
            }
            .oldPrice {
              text-decoration:line-through;
              color: #93999F;
            }
          }
        }
        .cart-controller {
          position: absolute;
          bottom: rem(22);
          right: 0;
        }
      }
    }
}
</style>
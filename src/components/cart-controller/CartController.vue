<template>
  <div id="cart-controller">
    <transition name="fade">
      <div v-show="count">
        <span 
          class="icon-remove_circle_outline action" 
          @click.stop="decreaseCart(food.name)">
        </span>
      </div>
    </transition>
    <div class="count" v-show="count">{{count}}</div>
    <div class="icon-add_circle action" @click.stop="addCart(food)"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      counts: 0
    }
  },
  props: ['food'],
  computed: {
    ...mapGetters({
      foods: 'allFoods',
      getTotal: 'getTotal'
    }),
    count () {
      for (let i = 0, len = this.foods.length; i < len; i++) {
        if (this.foods[i].food.name === this.food.name) {
          return this.foods[i].quantity
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'addCart',
      'decreaseCart'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/scss/utils.scss';

#cart-controller {
  text-align: center;
  div {
    display: inline-block;
    padding: rem(3);
    &.count {
      color: rgb(147,153,159);
      @include font-dpr(30px);
      line-height: rem(48);
      vertical-align: top;
    }
  }
  .action {
    @include font-dpr(48px);
    color: rgb(0, 160, 220);
  }
}
  .fade-enter-active, .fade-leave-active {
    transition: all 0.35s linear;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: translate3d(rem(48),0,0) rotate(360deg);
  }
</style>
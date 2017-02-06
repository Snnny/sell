<template>
  <div class="rating-select clearfix">
    <div class="evaluation-title">
      <div class="evaluation-menu">
        <button class="all" :class="{active: _rateType === 2}" @click="selected(2)">
          {{desc.all}}
          <i class="count">{{allList.length}}</i>
        </button>
        <button class="satisfied-hook" :class="{active: _rateType === 0}" @click="selected(0)">
          {{desc.satisfied}}
          <i class="count">{{satisfiedList.length}}</i>
        </button>
        <button class="dissatisfied-hook" :class="{active: _rateType === 1}"  @click="selected(1)">
          {{desc.dissatisfied}}
          <i class="count">{{dissatisfiedList.length}}</i>
        </button>
      </div>
      <div class="title2" :class="{active: isOnlyContent}" @click="toggleContent">
        <h2><span class="icon-check_circle"></span>只看有內容的评价</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

const ALL = 2
const SATISFIED = 0
const DISSATISFIED = 1

export default {
  props: {
    ratings: {
      type: Array,
      required: true
    },
    rateType: {
      type: Number,
      default: ALL
    },
    desc: {
      type: Object,
      default: function () {
        return {
          all: '全部',
          satisfied: '满意',
          dissatisfied: '不满意'
        }
      }
    },
    onlyContent: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions([
      'selected',
      'toggleContent'
    ])
  },
  computed: {
    ...mapGetters({
      _rateType: 'getSelectedType',
      isOnlyContent: 'isOnlyContent'
    }),
    allList () {
      if (this.isOnlyContent) {
        return this.ratings.filter(rating => {
          return rating.text !== ''
        })
      } else {
        return this.ratings
      }
    },
    satisfiedList () {
      if (this.isOnlyContent) {
        let arr = []
        arr = this.ratings.filter(rating => {
          return rating.text !== ''
        })
        return arr.filter(rating => {
          return rating.rateType === SATISFIED
        })
      } else {
        return this.ratings.filter(rating => {
          return rating.rateType === SATISFIED
        })
      }
    },
    dissatisfiedList () {
      if (this.isOnlyContent) {
        let arr = []
        arr = this.ratings.filter(rating => {
          return rating.text !== ''
        })
        return arr.filter(rating => {
          return rating.rateType === DISSATISFIED
        })
      } else {
        return this.ratings.filter(rating => {
          return rating.rateType === DISSATISFIED
        })
      }
    },
    ratingsType (rateType) {
      return this.crateType = rateType
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/scss/utils.scss';

.rating-select {
  width: 100%;
  /*height: rem(250);*/
  box-sizing: border-box;
  padding: rem(36);
  .evaluation-title {
      /*margin-top: rem(36);*/
      box-sizing: border-box;
      .evaluation-menu {
        @extend %borderOne;
        button {
          padding: rem(18) rem(22);
          margin-left: rem(16);
          border: none;
          background: #CCECF8;
          @include font-dpr(30px);
          color: #637078;
          border-radius: 2px;
          &:first-child{
            margin-left:0;
          };
          &.active {
            background: #00A0DC;
            color: #fff;
          }
          .count {
            @include font-dpr(24px);
            line-height: rem(36);
            vertical-align: middle;
          }
        }
      }
      .title2 {
        box-sizing:border-box;
        height: rem(98);
        padding-top: rem(36);
        &.active {
          h2 {
            color: rgb(0,160,220);
          }
        }
        h2 {
          @include font-dpr(30px);
          font-weight: 700;
          color: #B7BBBF;
          span {
           @include font-dpr(36px);
           line-height: rem(36);
           vertical-align: text-bottom;
         }
       }
     }
   }
}
</style>
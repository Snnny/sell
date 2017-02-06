<template>
<div id="star" :class="starSize">
	<i v-for="item in itemClass" :class="item"></i>
</div>
</template>
<script>
const LENGTH = 5
const STARON = 'on'
const STARHALF = 'half'
const STAROFF = 'off'
export default {
  data () {
    return {
      count: 0,
      classMap: []
    }
  },
  props: {
    star: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      default: 24
    }
  },
  computed: {
    starSize () {
      return 'star_' + this.size
    },
    newCount () {
      return Math.floor((this.star * 2)) / 2
    },
    itemClass () {
      let result = []
      let integer = parseInt(this.newCount)
      for (let i = 0; i < integer; i++) {
        result.push(STARON)
      }
      if (this.newCount % 1 !== 0) {
        result.push(STARHALF)
      }
      while (result.length < LENGTH) {
        result.push(STAROFF)
      }
      return result
    }
  }

}
</script>
<style lang="scss" scoped>
@import '../../common/scss/utils.scss';

.star_48 {
	i {
		display: inline-block;
		background-repeat: no-repeat;
		width: rem(40);
		height: rem(40);
		margin-right: rem(44);
		background-size: rem(40) rem(40);
		&:last-child {
			margin-right: 0;
		};
		&.on {
			@include bg-image('star48_on');
		}
		&.half {
			@include bg-image('star48_half');
		}
		&.off {
			@include bg-image('star48_off');
		}
	}
}
.star_36 {
	i {
		display: inline-block;
		background-repeat: no-repeat;
		width: rem(30);
		height: rem(30);
		margin-right: rem(32);
		background-size: rem(30) rem(30);
		&:last-child {
			margin-right: 0;
		};
		&.on {
			@include bg-image('star36_on');
		}
		&.half {
			@include bg-image('star36_half');
		}
		&.off {
			@include bg-image('star36_off');
		}
	}
} 
.star_24 {
	i {
		display: inline-block;
		background-repeat: no-repeat;
		width: rem(20);
		height: rem(20);
		margin-right: rem(6);
		background-size: rem(20) rem(20);
		&:last-child {
			margin-right: 0;
		};
		&.on {
			@include bg-image('star24_on');
		}
		&.half {
			@include bg-image('star24_half');
		}
		&.off {
			@include bg-image('star24_off');
		}
	}
}  	
</style>
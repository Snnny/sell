<template>
	<div id="line-title">
		<div class="info-title">
			<div class="line"></div>
			<div class="info-text">
				<h3>{{content}}</h3>
			</div>
			<div class="line"></div>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/scss/utils.scss';

.info-title {
      display: flex;
      width: 80%;
      margin: 0 auto; 
      .line {
        flex: 1;
        position: relative;
        top: rem(-12);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      };
      .info-text {
        padding: 0 rem(24);
        color: #fff;
        @include font-dpr(28px);
      }
    }
</style>
<template>
	<div id="navbar">
		<router-link to="/goods" tag="li" class="nav">
			<a href="javascript:;">商品</a>
		</router-link>
		<router-link to="/ratings" tag="li" class="nav">
			<a href="javascript:;">评价</a>
		</router-link>
		<router-link to="/seller" tag="li" class="nav">
			<a href="javascript:;">商家</a>
		</router-link>
	</div>
</template>
<script>
</script>
<style lang="scss" scoped>
@import '../../common/scss/utils.scss';

#navbar {
	display: flex;
	height: rem(80);
	@extend %borderOne;
	.nav {
		flex: 1;
		text-align: center;
		line-height: rem(80);
		@include font-dpr(28);
		color: rgb(77,85,93);
		a {
			font-weight: 700;
		}
		&.router-link-active {
			a {
				color: rgb(240,20,20)
			}
		}
	} 
}
</style>
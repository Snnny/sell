<template>
  <div id="app">
    <header-component :seller="seller"></header-component>
    <nav-component></nav-component>
    <!-- 配合scrollBehavior实现记录滚动条位置 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>  
    <footer-component :minPrice='seller.minPrice' :deliveryPrice='seller.deliveryPrice'></footer-component>
  </div>
</template>

<script>
import HeaderComponent from 'components/header/HeaderComponent'
import NavComponent from 'components/navbar/NavComponent'
import FooterComponent from 'components/footer/FooterComponent'
const ERR_OK = 0
export default {
  name: 'app',
  data () {
    return {
      seller: {},
      minPrice: 0,
      deliveryPrice: 0
    }
  },
  components: {
    HeaderComponent,
    NavComponent,
    FooterComponent
  },
  methods: {
    fetchData () {
      this.$http('/api/seller')
        .then((data) => {
          if (data.data.errno === ERR_OK) {
            this.seller = data.data.data
          }
        })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="scss">
html, body {
  /*min-width: 640px;*/
  width: 100%;
  #app {
    width: 100%;
    margin: 0 auto
  }
}
</style>


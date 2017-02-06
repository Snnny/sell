import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Product from 'components/home/ProductComponent'
import Rating from 'components/ratings/RatingComponent'
import Seller from 'components/seller/SellerComponent'

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    } else {
      position.x = 0
      position.y = 0
    }
    return position
  }
}

export default new VueRouter({
  mode: 'history',
  scrollBehavior,
  routes: [
    {
      path: '/goods',
      component: Product
    },
    {
      path: '/ratings',
      component: Rating
    },
    {
      path: '/seller',
      component: Seller
    },
    {
      path: '*',
      redirect: '/goods'
    }
  ]
})

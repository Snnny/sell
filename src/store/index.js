import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  foods: [],
  total: 0,
  selectType: 2,
  onlyContent: false
}

const getters = {
  allFoods: state => state.foods,
  getTotal: state => state.total,
  getSelectedType: state => state.selectType,
  isOnlyContent: state => state.onlyContent
}

const mutations = {
  addCart: (state, {food}) => {
    const record = state.foods.find(item => item.food.name === food.name)
    if (!record) {
      state.foods.push({
        food,
        quantity: 1
      })
    } else {
      record.quantity++
    }
    state.total++
  },
  decreaseCart: ({commit}, name) => {
    state.foods.forEach((item) => {
      if (item.food.name === name) {
        item.quantity--
        state.total--
      }
    })
  },
  clearCart: state => {
    state.foods.splice(0)
    state.total = 0
  },
  selected: (state, type) => {
    state.selectType = type
  },
  toggleContent: state => {
    state.onlyContent = !state.onlyContent
  }
}

const actions = {
  addCart: ({commit}, food) => {
    commit('addCart', { food })
  },
  decreaseCart: ({commit}, name) => {
    commit('decreaseCart', name)
  },
  clearCart: ({commit}) => {
    commit('clearCart')
  },
  selected: ({commit}, type) => {
    commit('selected', type)
  },
  toggleContent: ({commit}) => {
    commit('toggleContent')
  }
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})


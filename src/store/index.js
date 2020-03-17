import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currency: 'Грн',
    loading: false,
    faceValues: [
      {
        amount: 10,
        left: 20
      },
      {
        amount: 20,
        left: 20
      },
      {
        amount: 50,
        left: 20
      },
      {
        amount: 100,
        left: 20
      },
      {
        amount: 200,
        left: 20
      },
      {
        amount: 500,
        left: 20
      }
    ],
    cashOutHistory: []
  },
  getters: {
    currency (state) {
      return state.currency
    },
    loading (state) {
      return state.loading
    },
    faceValues (state) {
      return state.faceValues
    },
    atmTotal (state) {
      return state.faceValues.reduce((acc, current) => {
        return acc + (current.amount * current.left)
      }, 0)
    },
    cashOutHistory (state) {
      return state.cashOutHistory
    },
    receiptMap (state) {
      const receiptMap = {}

      for (let i = 0; i < state.cashOutHistory.length; i++) {
        const receipt = state.cashOutHistory[i]
        receiptMap[receipt.id] = receipt
      }
      return receiptMap
    },
    getReceipt: (state, getters) => (id) => {
      return getters.receiptMap[id]
    }
  },
  mutations: {
    cashOut (state, { faceValue, sum }) {
      const faceValueFound = state.faceValues.find(item => item.amount === faceValue)
      faceValueFound.left -= sum / faceValue
    },
    addCashOutHistory (state, payload) {
      state.cashOutHistory.push(payload)
    }
  },
  actions: {
    cashOut ({ state, commit }, payload) {
      state.loading = true
      setTimeout(() => {
        commit('cashOut', payload)
        commit('addCashOutHistory', payload)
        state.loading = false
        router.push(`/receipt/${payload.id}`)
      }, 1000)
    }
  }
})

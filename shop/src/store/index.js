import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import api from '../assets/config/api'
import axios from 'axios'
export default new Vuex.Store({
  state: {
    cartTotal:{
      checkedGoodsAmount: 0,
      checkedGoodsCount: 0,
      goodsAmount: 0,
      goodsCount: 0,
    },
    cartList:[]
  },
  mutations: {
    setCartList:function(state,cartList){
      state.cartList = cartList
    },
    setCartTotal:function(state,cartTotal){
      state.cartTotal = cartTotal
    }
  },
  actions: {
    AjaxCart:async function(content){
      let res = await axios.get(api.CartList)
      // console.log(res);
      // console.log(res.data.data.cartList);
      content.commit('setCartList',res.data.data.cartList)
      content.commit('setCartTotal',res.data.data.cartTotal)
    }
  },
  modules: {
  }
})

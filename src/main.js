import Vue from 'vue'
import App from './App'

import state from "./utils/state/state";

Vue.prototype.route = function (url) {
  uni.navigateTo({
    url: url,
    success: function () {
      console.log('Welcome to ' + url)
    }
  })
}

Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
  ...App,
  state
})

app.$mount()

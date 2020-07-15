import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$url="http://192.168.1.4:4444"
App.mpType = 'app'
import store from "./store"

const app = new Vue({
	store,
    ...App
})
app.$mount()

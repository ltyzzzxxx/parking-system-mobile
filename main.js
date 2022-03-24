
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import api from '@/api/api.js'
Vue.prototype.$api = api
import store from '@/store/index.js'
Vue.prototype.$store = store
Vue.prototype.$toast = function(msg) {
	uni.showToast({
		title: msg,
		icon:'none'
	});
}

Vue.prototype.navigateTo = function(url) {
	uni.navigateTo({
		url
	});
}

Vue.prototype.authJump = function(url) {
	if(!store.state.token) {
		return uni.navigateTo({
			url: '/pages/login/login'
		})
	}
	if(!store.state.user.phone) {
		return uni.navigateTo({
			url: '/pages/bind-phone/bind-phone'
		})
	}
	uni.navigateTo({
		url,
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
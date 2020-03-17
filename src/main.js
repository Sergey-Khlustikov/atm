import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'

Vue.use(Vuelidate)
Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

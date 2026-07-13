import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import posthog from 'posthog-js'

posthog.init(process.env.VUE_APP_POSTHOG_KEY, {
  api_host: process.env.VUE_APP_POSTHOG_HOST,
  defaults: '2026-05-30'
})

router.afterEach((to) => {
  posthog.capture('$pageview', { $current_url: window.location.href })
})

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

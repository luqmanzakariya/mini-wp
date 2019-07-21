import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//src/main.js
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '856972871018-68r0643cq34dg3iir070das6vd0419qt.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)

Vue.use(BootstrapVue)
new Vue (App).$mount('#app')


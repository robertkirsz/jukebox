import Vue from 'vue'
import { store } from './store/store'
import App from './App'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App />',
  components: { App }
})

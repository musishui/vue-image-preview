import Vue from "vue"
import Preview from '../src/main'
import app from "./App"

Vue.use(Preview)
new Vue({
  render: h => h(app)
}).$mount("#app")

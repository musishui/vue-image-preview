import imagePreview from './components/imagePreview'
import './assets/font/iconfont.css'

const install = Vue => {
  if (install.installed) return
  Vue.component('imagePreview', imagePreview)
}

if (window && window.Vue) {
  install(window.Vue)
}

export default {
  install
}

export {
  imagePreview
}

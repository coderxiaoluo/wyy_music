import { createApp } from 'vue'
import App from './App.vue'

// css样式
import "normalize.css"
import "./assets/css/index.css"

import 'element-plus/theme-chalk/el-message.css'
// import "//at.alicdn.com/t/c/font_4040832_507svd6byqs.js ";
import "./assets/data/icon"

// animate.css
import 'animate.css'
// wowjs
import 'animate.css/animate.compat.css'

// theme
import "@/theme/index.css"


// 状态管理
import store from './stores'

// 路由
import router from './routers'

// import "@/hooks/click"

const app = createApp(App)

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store).use(router).mount('#app')

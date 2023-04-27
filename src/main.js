import { createApp } from 'vue'
import App from './App.vue'

// css样式
import "normalize.css"
import "./assets/css/index.css"

import 'element-plus/theme-chalk/el-message.css'
import "//at.alicdn.com/t/c/font_4040832_f3e8re5h57o.js";

// 状态管理
import store from './stores'

// 路由
import router from './routers'

const app = createApp(App)

app.use(store).use(router).mount('#app')

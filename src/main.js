import { createApp } from 'vue'
import App from './App.vue'

// css样式
import "normalize.css"
import "./assets/css/index.css"

import 'element-plus/theme-chalk/el-message.css'

// 状态管理
import store from './stores'

// 路由
import router from './routers'

const app = createApp(App)

app.use(store).use(router).mount('#app')

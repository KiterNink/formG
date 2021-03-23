import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index';
import elementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import './assets/style/CommonStyle.less';
createApp(App)
.use(router)
.use(elementPlus)
.mount('#app')

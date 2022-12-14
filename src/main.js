import App from './App'
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import './assets/iconfront/iconfont.css'

Vue.config.productionTip = false
Vue.use(ElementUI,{size:'mini'})

const router = new VueRouter({
  mode:   'history',
  routes: [
    {
      path:      '/topology/page/edit',
      component: () => import('./routes/editor.vue'),
    },
    {
      path:      '/topology/page/view',
      component: () => import('./routes/view.vue'),
    },
  ],
});
Vue.use(VueRouter);


new Vue({
  render: h => h(App),
  router
}).$mount('#app')

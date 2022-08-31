import Vue from 'vue'
import Router from 'vue-router'
import test from '@/views/test'
import inputTest from '@/views/inputTest'
import batter from '@/views/batter_scroll'
import Pdf from '@/views/pdf'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'inputTest',
      component: inputTest
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path:'/batter',
      name:'batter',
      component: batter
    },
    {
      path:'/pdf',
      name:'pdf',
      component: Pdf
    }
  ]
})

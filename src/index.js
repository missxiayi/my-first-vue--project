//入口文件

import Vue from 'vue'
import App from './app.vue'

import './assets/images/logo.png'
import './assets/styles/test.css'
import './assets/styles/test.styl'

import './assets/styles/global.styl'

const root = document.createElement('div')  //创建节点
document.body.appendChild(root)  //将root插进去

new Vue({
    render:(h)=>h(App)
}).$mount(root)  //挂载api，插入root
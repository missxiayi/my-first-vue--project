<!--这是一个父组件，可引用子组件-->
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <header msg='dd'></header>  
    <h1 v-text="title"></h1> <!--==>{{title}}-->
    <h1 v-html="title2"></h1>
    
    <input v-model="newItem" v-on:keyup.enter="addNew"/>  <!-- keyup.enter表示点击enter键后将新文本追加到列表里-->
    <ul>
    	<li v-for="item in items" v-bind:class="{finished:item.isFinished}" v-on:click="togglefinish(item)">  <!--根据isFinished属性判断该item是否有finished的class-->
    		{{item.label}}
    	</li>
    </ul>
    
     <components-a msgfromfather='you die' v-on:child-tell-me-something='listentomychild'></components-a> <!--html注重大小写，大写A要转成-a格式-->
     <p> child tell me:{{childmsg}}</p>
     <p> child tell me-dispatch:{{childmsgdispatch}}</p>
     
     
  </div>
  
</template>

<script>
//import HelloWorld from './components/HelloWorld'

import Store from'./store'  /*调用store.js*/

//import Header from'./components/header' /*引用header.vue文件*/

import componentsA from'./components/componentsA'   /*引用子组件*/


export default {
  data:function(){
  	return{
  		title:'this is a todo list',
  		title2:'<span>this is a html list</span>',
  		items:Store.fetch(),
  		newItem:'',
  		childmsg:'', //需要在data里声明
  		childmsgdispatch:''
  	}
  },
  components:{ componentsA },   //需要components注册才能使用引用文件，形成自定义组件
  	 
  watch:{
  	items:{
  		handler:function(items){  //该回调将会在侦听之后被立即调用
  			Store.save(items)  //实现将输入的item存储到localstorage中
  		},
  		deep:true   
  	}
  },
  events:{  //注册events,dispatch方法,从里往外派发
			'child-tell-me-something':function(msg){
				this.childmsgdispatch=msg;
			}
		},
  methods:{
  	togglefinish:function(item){
  		console.log(item.isFinished=!item.isFinished)  //将状态置反
  	},
  	addNew:function(){ //将input输入的文本追加到items列表里，并定义状态为未完成
  	this.items.push({
  		label:this.newItem,
  		isFinished:false
  	});
  	this.newItem='' //追加后将input置为空
  	//Store.save()  //每次添加的时候save
  	this.$broadcast('onAddnew',this.items)  //父组件向子组件传值
  },
  listentomychild:function(msg){
  	this.childmsg=msg;
  }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.finished{
	text-decoration: line-through;
}
</style>

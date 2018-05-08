const STORAGE_KEY='todos-vuejs'   /*定义常量*/
export default{  /*导出两个方法*/
	fetch () {
		return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
	},
	save (items) { /*相当于save:function(items){},es6语言*/
		window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
	}
}

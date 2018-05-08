<template>
<section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去做什么"
      @keyup.enter="addtodo">

      <Item
       :todo="todo"
        v-for="todo in filteredtodos"
        :key="todo.id"
        @del="deletetodo" 
        />
      <Tabs :filter="filter"
        :todos="todos"
        @toggle="togglefilter"
        @clearAllcompleted="clearAllcompleted"
        />
</section>

</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'

let id=0
export default{
    data() {
        return {     //声明，数据在哪个地方声明，就在哪个地方操作
        todos:[],
            filter:'all'
        }
    },
    components:{
        Item,
        Tabs
    },
    computed:{
        filteredtodos(){
            if(this.filter === 'all'){
                return this.todos
            }
            //如果filter等于completed，completed就等于true，如果不等于，completed就等于false
            const completed=this.filter ==='completed'  

            //筛选。如果todo完成就显示，不完成就不显示
            return this.todos.filter(todo => completed === todo.completed)            

        }
    },
    methods:{   //声明方法
        addtodo(e){
            this.todos.unshift({
                id:id+1,
                content:e.target.value.trim(),
                completed:false   //初始状态是未结束
            })
            e.target.value=''
        },
        deletetodo(id){  //删除节点
            this.todos.splice(this.todos.findIndex(todo => todo.id === id),1)
        },
        togglefilter(state){   //状态选择切换
            this.filter=state
        },
        clearAllcompleted(){
            this.todos = this. todos.filter(todo => !todo.completed)
        }
    }
}

</script>

<style lang="stylus" scoped>
.real-app{
    width 600px
    margin 0 auto 
    box-shadow 0 0 5px #666
    }
    .add-input{
        position relative
        margin 0 
        border 1px solid #999
        background #ffffff
        height 100px
        width 100%
        font-size 24px
        font-family inherit 
        font-weight inherit 
        line-height 1.4em
        border 0
        outline none 
        color inherit 
        padding 6px
        box-shadow inset 0 -2px 1px rgba(0,0,0,0.8)
        border-radius 10px
        }
</style>

<template>
  <div class="helper">
      <span class="left">{{unFinishedTodoLength}} items left</span>
      <span class="tabs">
          <!-- v-for循环，指定key可以复用节点，动态的class -->
          <span
            v-for="state in states"
            :key="state"
             :class="[state,filter === state ? 'actived':'']"
             @click="toggleFilter(state)">
              {{state}}
          </span>
      </span>

      <!-- 将已经完成的item清除掉 -->
      <span class="clear" @click="clearAllCompleted">clear completed</span>
  </div>
</template>

<script>
export default {
    props:{   //声明
        filter:{
            type:String,
            require:true,
        },
        todos:{
            type:Array,
            require:true
        }
    },
    computed:{  //计算属性
        unFinishedTodoLength(){   //控制完成的item个数
            return this.todos.filter(todos=>todos.completed).length
        }

    },
  data(){
      return{
          states:['all','active','completed']
      }
  },
  methods:{
      clearAllCompleted(){
          this.$emit('clearAllcompleted')
      },
      toggleFilter(state){
          this.$emit('toggle',state)
      }
  }
}
</script>
<style lang="stylus" scoped>
.helper{
    font-weight 100
    display flex
    justify-content space-between
    padding 5px 0
    line-height 30px
    background-color #ffffff
    font-size 14px
    font-smoothing antialiased 
}
.left, .clear, .tabs{
    padding 0 10px
    box-sizing border-box
}
.left, .clear {
    width 150px
}
.left {
    text-align left 
}
.clear {
    text-align right 
    cursor pointer
}
.tabs{
    width 200px
    display flex
    justify-content space-around
    *{
        display inline-block
        padding 0 10px
        cursor pointer
        border 1px solid rgba(175,47,47,0)
        &.actived{
            border-color rgba(175,47,47,0.4)
            border-radius 5px
        }
    }
}
</style>

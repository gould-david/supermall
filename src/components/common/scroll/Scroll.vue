<template>
  <div class="wrapper" ref="wrapper">
    <!--   必须再封装一层 ，因为scroll要求外部有一层，内部的第一层能实现滚动，如果直接只用插槽，那只有第一个组件才能生效   -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data(){
      return {
        scroll:null
      }
    },
    mounted() {
      //通过dom操作，不能确定是否拿到的是本组件内的div标签
      /*  document.querySelector('.wrapper')
      *   在vue中一般给标签绑定 ref属性 ，ref一般绑定给子组件
      *
      *   ref如果绑定的是组件，那么通过this.$refs.refname获取到的是一个组件对象
      *   ref如果绑定在元素中，那么通过this.$refs.refname获取到的是一个元素对象
      * */
      this.scroll = new BScroll(this.$refs.wrapper,{

      })
    }

  }
</script>

<style scoped>

</style>

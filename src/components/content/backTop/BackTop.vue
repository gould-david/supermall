<template>
  <div class="back-top">
  <!--  <div class="back-top" @click="backClick">-->
    <img src="~assets/img/common/top.png">
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    methods:{
      /* 通过子组件发射点击的监听事件，父组件绑定发射的事件名
      backClick(){
        this.$emit('backTopClick')
      }*/
    }
  }
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
  .back-top img {
    width: 43px;
    height: 43px;
  }

</style>

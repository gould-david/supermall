<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name='item-icon-active'></slot>
    </div>
    <!--<div :class="{active:isActive}">-->
    <div :style="tabbarolorActive">
      <slot name="item-text"></slot>
    </div>
  </div>
  <!--<div class="tab-bar-item">
    <img src="../../assets/img/tabbar/category.svg"/>
    分类
  </div>
  <div class="tab-bar-item">
    <img src="../../assets/img/tabbar/cart.svg"/>
    购物车
  </div>
  <div class="tab-bar-item">
    <img src="../../assets/img/tabbar/profile.svg"/>
    我的
  </div>-->
</template>

<script>
  export default {
    name: "TabBarItem",
    data(){
      return {
        /*isActive:false*/
      }
    },
    computed:{
      isActive(){
        console.log(this.path)
        return this.$route.path.indexOf(this.path) !== -1
      },
      tabbarolorActive(){
        console.log(this.tabbarolor)
        return this.isActive ? {color:this.tabbarolor}: {}
      }
    },
    props:{
      path:String,
      tabbarolor:{
        type:String,
        default:'red'
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path)
        console.log('父传子的Path值：'+this.path)
      }
    }
  }
</script>

<style scoped>

  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .active {
    color: red;
  }

</style>

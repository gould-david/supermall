<template>
  <div class="cart-list">
    <scroll class="content" :pull-up-load="false" ref="scroll">
      <cart-list-item
        v-for="(item,index) in cartList"
        :product="item"
        :key="index"/>
    </scroll>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";
  export default {
    name: "CartList",
    components:{
      Scroll,
      CartListItem
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated() {
      console.log('调用refresh()');
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>

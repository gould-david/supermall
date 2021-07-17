<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list class="cart-list"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import {mapGetters} from 'vuex';
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList
    },
    computed:{
     /*
     将Vuex中的getters，通过XXX方式，直接在组件中通过计算属性进行调用。
      注：这里的调用，并不是在组件的计算属性（computed）中通过this.$store.getters.xxx 进行调用，而是类似于将store中的getters直接转换成计算属性
     cartLength(){
       return this.$store.getters.cartLength
     }*/
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .cart {
    height: calc(100vh - 49px);
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: white;
    font-weight: 700;
  }
  .cart-list {
    height: calc(100% - 44px);
  }
</style>

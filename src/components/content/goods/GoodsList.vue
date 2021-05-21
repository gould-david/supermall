<template>
  <div class="goods">
    <goods-list-item  v-for="item in goods" :goodsItem="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";

  export default {
    name: "GoodsList",
    components:{
      GoodsListItem
    },
    props:{
      goods: {
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    /* 让item两个为一行，其实是让弹性盒元素在必要时才换行 */
    flex-wrap: wrap ;
    /* 均等分 */
    justify-content: space-evenly;
  }
</style>

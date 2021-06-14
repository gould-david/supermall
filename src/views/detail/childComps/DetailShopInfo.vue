<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo">
      <div class="shop-top-name">{{shop.name}}</div>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shop.sells | sellCountFilter}}
          </div>
          <div class="sells-text">
            总销量
          </div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodCount }}
          </div>
          <div class="goods-text">
            全部宝贝
          </div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td >{{item.name}}</td>
            <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more':item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    props:{
      shop:{
        type:Object,
        default(){
          return null
        }
      }
    },
    filters:{
      sellCountFilter(value){
        if(value < 10000) return value;
        return (value/10000).toFixed(1) + '万'
      }
    }
  }
</script>

<style scoped>

  .shop-top {
    display: flex;
    margin-top: 30px;
    margin-left: 20px;
  }
  .shop-top img {
    border-radius: 100%;
    width: 50px;
    height: 50px;
  }
  .shop-top-name {
    margin-left: 15px;
    margin-top: 15px;
    vertical-align: middle;
  }
  .shop-middle {
    margin-top: 20px;
  }
  .shop-middle-left {
    display: flex;
    justify-content: space-evenly;
    padding: 10px;
    border-right: 2px solid rgba(100,100,100,.1);
  }
  .sells-count , .goods-count{
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 5px;
  }
  .sells-text , .goods-text {
    font-size: 10px;
    text-align: center;
  }
  .shop-middle-right {
    margin-top: 0px;
    padding-left: 20px;
    font-size: 10px;
  }
  .shop-middle-right tr {
    line-height: 20px;
  }
  .shop-middle-right tr td{
    padding-left: 10px;;
  }
  .score {
    color: lightgreen;
  }
  .score-better{
    color: var(--color-high-text)
  }
  .better span{
    color: white;
    background-color: lightgreen;
  }
  .better-more span{
    background-color: var(--color-high-text);
  }
  .shop-middle {
    display: flex;
  }
  .shop-middle-item {
    flex: 1;
  }
  .shop-bottom {
    text-align: center;
  }
  .enter-shop {
    display: inline-block;
    width: 200px;
    margin-top: 15px;
    background-color: #f2f2f2;
    border-radius: 100px;
    font-size: 20px;
  }
</style>

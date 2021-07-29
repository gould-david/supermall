<template>
  <div id="shop-item">
    <div class="item-selector">
      <!-- 勾选组件 -->
      <!-- 监听按钮组件的点击事件，可以在父组件中增加@click.native 进行实现，这样就省去了在子组件内部再通过$emit发射事件来监听了 -->
      <check-button :isChecked="product.checked" @click.native="checkClick"/>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{product.price}}</div>
        <div class="item-count right">X {{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {UPDATECHECK} from "store/mutations-types";

  export default {
    name: "CartListItem",
    props:{
      product:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    components:{
      CheckButton
    },
    methods:{
      checkClick(){
        //this.product.checked = !this.product.checked
        this.$store.commit(UPDATECHECK,this.product)
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .item-selector {
    display: flex;
    width: 20px;
    justify-content: center;
    align-items: center;
  }
  .item-title , .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-img {
    padding: 5px;
  }
  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 12px;
    left: 18px;
    right: 10px;
    /*position: absolute;
    bottom: 10px;
    left: 35px;
    right: 10px;*/
  }
  .info-bottom .item-price {
    color: orangered;
  }

</style>

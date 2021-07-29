<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button :isChecked="isSelectAll" class="check-btn"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计：￥{{totalPrice}}
    </div>

    <div class="calculate">
      去计算 ({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      totalPrice(){
        return this.$store.getters.cartList.filter(item => {
          return item.checked == true
        }).reduce((previousValue,item) => {
          return item.price * item.count + previousValue
        },0).toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartList.filter(item => {
          return item.checked == true
        }).length
      },
      isSelectAll(){

      }
    }
  }
</script>

<style scoped>

  .bottom-bar {
    display: flex;
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
  }
  .check-all {
    display: flex;
    align-items: center;
    margin-left: 15px;
    width: 60px;
  }
  .check-btn {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 30px;
    flex: 1;
  }

  .calculate {
    width: 80px;
    text-align: center;
    color: white;
    background-color: red;
  }

</style>

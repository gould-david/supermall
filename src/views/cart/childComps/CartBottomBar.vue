<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button :isChecked="isSelectAll" class="check-btn" @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计：￥{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算 ({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from "vuex";
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return this.$store.getters.cartList.filter(item => {
          return item.checked == true
        }).reduce((previousValue,item) => {
          return item.price * item.count + previousValue
        },0).toFixed(2)
      },
      checkLength(){
        return this.cartList.filter(item => {
          return item.checked == true
        }).length
      },
      isSelectAll(){
        /*   通过filter找出有不选中的，返回false。但这个方式性能较低，需要每一个都要遍历
        return !(this.cartList.filter( item => {
          return !item.checked
        }).length)*/
        // 通过find函数，找到不选中的一条数据，就直接返回。
        if(this.cartList.length === 0) {return false}
        return !this.cartList.find( item => !item.checked)
      }
    },

    methods:{
      checkClick(){
        if(this.isSelectAll){ //全选，将所有变成全部不选中
          this.cartList.forEach(item => {item.checked = false})
          /*this.cartList.map(item => {
            item.checked = false
            return item
          })*/
        }
        else{
          this.cartList.forEach(item => {item.checked = true})
        }
        //        console.log('全选点击事件');
      },
      calcClick(){
        //console.log('去计算');
        if(!this.isSelectAll){
          this.$toast.show('请选择需要购买的商品',3000)
        }
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

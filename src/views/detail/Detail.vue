<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>

  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import {getDetail,Goods,Shop} from "network/detail";

  export default {
    name: "Detail",
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{}
      }
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
    },
    created() {
      // 1. 保存传入的iid
      this.iid = this.$route.params.iid

      // 2. 根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages
        //2. 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //3. 获取商家信息
        this.shop = new Shop(data.shopInfo)
      })

    }
  }
</script>

<style scoped>

</style>

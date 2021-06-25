<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad">
    </div>
  </div>

</template>

<script>
  export default {
    name: "",
    data(){
      return {
        counter:0,
        imageLength:0
      }
    },
    props:{
      detailInfo:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    watch:{
      detailInfo(){
        this.imageLength = this.detailInfo.detailImage[0].list.length
      }
    },
    methods:{
      imgLoad(){
        /*
        方法1：
        防止运行多次refresh函数，这里利用了计数器，只让最后一次图片load后，发射自定义函数。
        if(++this.counter === this.imageLength){
          console.log('imageLoad');
          this.$emit('imageLoad')
        }*/
        this.$emit('imageLoad')
      }
    }
  }
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
  }
  .info-key {
    padding: 10px;
    font-size: 16px;
    color: gray;
  }
  .info-list img {
    width: 100%;
  }
  .desc {
    font-size: 14px;
    color: gray;
  }
</style>

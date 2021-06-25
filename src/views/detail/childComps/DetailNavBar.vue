<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @titleClick="titleClick">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             class="titleItem"
             @click="titleClick(index)"
             :class="{isSelect: index == currentTitle}">
          {{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    data(){
      return {
        titles:['商品','参数','评论','推荐'],
        currentTitle: 0
      }
    },
    methods:{
      titleClick(index){
        this.currentTitle = index,
        this.$emit('titleClick',index)
      },
      backClick(){
        this.$router.back()
        // this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }
  .titleItem {
    flex: 1
  }
  .isSelect {
    color: var(--color-high-text)
  }
  .back img {
    margin-top: 12px;
  }
</style>

<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
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
    /*

    通过父传子将Detail中滚动后，所处于的主题（商品、参数、评论、推荐）传递至本组件中.
    这是一种方法，但是也可以使用另外一种方法，通过父调用子组件的refs中属性的方式，直接将currentTitle改成Detail监听到的index值。
    其实这种方法更为规矩
    但为了和教学 视频同步，还是使用refs调用子组件属性的方法

    props:{
      currentIndex:{
        type:Number,
        default:0
      }
    },*/
    data(){
      return {
        titles:['商品','参数','评论','推荐'],
        currentTitle: 0
      }
    },
    methods:{
      titleClick(index){
        //this.currentTitle = index,
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

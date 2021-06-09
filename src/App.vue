<template>
  <div id="app">
    <!--不销毁组件（不执行生命周期函数destory() ）
      满足用户在切换路由之后，组件仍显示在原来滑动到的位置

      exclude 排除详情组件，否则从home中点击商品后，进入的详情页都是同一个iid的，导致数据显示重复。
      exclude 属性内写的名称为组件内export的name属性
    -->

    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar'

export default {
  name: 'app',
  components:{
    MainTabBar
  }
}
</script>


<style>
  @import "assets/css/basecss.css";
</style>

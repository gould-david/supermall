<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-controll ref="tabControll1" :titles="['流行','新款','精选']" @tabClick="tabClick" class="tabControll" v-show="isTabFixed"/> <!--//v-show="isTabFixed"-->
    <scroll class="content"
            ref="home_scroll"
            :probeType="3"
            @contentScroll="contentScroll"
            :pull-up-load="true"
            @contentPullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-controll ref="tabControll2" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
      <goods-list :goods="showGoods" />
    </scroll>


    <!--  通过子组件进行监听事件
    <back-top @backTopClick="backTopClick"/>-->
    <!--  直接监听组件的原生事件。
      组件默认是不能监听点击事件的，只有增加.native修饰符，才能完成监听
    -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>

</template>

<script>

  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  import TabControll from "components/content/tabControll/TabControll";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backTop/BackTop";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {debounce} from "common/util";


  export default {
    name: "Home",
    components: {
      NavBar,TabControll,GoodsList,Scroll,BackTop,
      HomeSwiper,
      RecommendView,
      FeatureView,

    },
    computed:{
      showGoods(){
        console.log('showGoods');
        return this.goods[this.currentType].list
      }
    },
    data(){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop':{page: 0, list:[]},
          'new':{page: 0, list:[]},
          'sell':{page: 0, list:[]}
        },
        currentType:'pop',
        isShowBackTop: true,
        tabOffsetTop : 0,
        isTabFixed: false,
        userScrollHeight:0
      }
    },
    created() {
      //1. 请求多个数据
      this.getHomeMultidata();
      //2. 请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');


    },
    mounted(){

      // 如果监听是放到created中，那么有时是在created中取不this.$refs.home的对象的。
      //监听事件总线中的GoodListItem中图片加载完成后发射出来的事件
      /*console.log(this.$refs.home_scroll.refresh); 有返回值
      console.log(this.$refs.home_scroll.refresh()); 无返回值，直接调用方法内部了*/
      //使用防抖函数调用scroll.refresh
      const refresh = debounce(this.$refs.home_scroll.refresh,200)
      this.$bus.$on('itemImageLoad',() => {
        /*this.$refs.home_scroll && this.$refs.home_scroll.refresh()*/
        console.log('图片加载完成');
        refresh()
      })
    },
    activated() {
      console.log(this.userScrollHeight);
      this.$refs.home_scroll.scrollTo(0 , this.userScrollHeight , 0 )
      this.$refs.home_scroll.refresh()
    },
    deactivated() {
      //记录上次滑动到的位置
      this.userScrollHeight = this.$refs.home_scroll.getScrollHeight();
      console.log(this.userScrollHeight);
    },
    methods:{
      /*
        事件监听相关方法
      */

      tabClick(index){

        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControll1.currentIntex = index
        this.$refs.tabControll2.currentIntex = index
      },

      swiperImageLoad(){
        //tab-controll实现吸顶效果
        //要获取到tabControll2在父组件中的位置，需要考虑到图片加载需要时间，因此在轮播图加载完成后，在这里取组件内元素的offsetTop属性
        console.log(this.$refs.tabControll2.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControll2.$el.offsetTop;
      },

      /*// 一键到顶，接收子组件发射$emit过来的方法
      backTopClick(){
        //取得子组件的对象
        console.log(this.$refs.home_scroll.scroll);
        this.$refs.home_scroll.scroll.scrollTo(0,0)
      }*/
      backClick(){
        // 调用Scroll组件中封装好的方法。
        this.$refs.home_scroll.scrollTo(0 , 0 , 1000)
      },
      contentScroll(position){
        //判断BackTop是否显示
        this.isShowBackTop = Math.abs(position.y) > 1000
        //决定TabControll2是否吸顶(position:fixed)
        this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
      },
      loadMore(){
        console.log('上拉加载，重新调用getHomeGoods');
        this.getHomeGoods(this.currentType)
        this.$refs.home_scroll.finishPullingUp();
      },


      /*
      网络请求相关
      */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          //下面的代码等同于 将res.data.list 遍历后 分别 push进 data对应的属性中
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      },

    }
  }
</script>

<style scoped>
  #home {
    position: relative;

    /* 相当于满窗口 */
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    /*position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }
  .tabControll {
    position: relative;
    /*position: absolute;
    top:44px;
    left: 0;
    right: 0;*/
    z-index: 9;
  }
  .content {
    /*
      子绝父相
      即这里是绝对定位，他的父组件一定要设置成相对定位
    */
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*
  .content {
    height: calc(100% - 49px - 44px);
    margin-top: 44px;
    overflow: hidden;
  }*/
</style>

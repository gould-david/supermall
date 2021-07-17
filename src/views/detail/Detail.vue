<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav"
                    @titleClick="titleClick" ref="nav" />
    <!--通过父传子将Detail中滚动后，所处于的主题（商品、参数、评论、推荐）传递至本组件中(详见DetailNavBar组件中的注释说明)
        :currentIndex="currentIndex"-->

    <scroll class="content"
            ref="scroll"
            :probeType="3"
            :pull-up-load="false"
            @contentScroll="contentScroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :paramInfo="paramInfo" ref="param" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>

    <detail-bottom-bar @addCart="addToCart"/>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>

  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import {getDetail,Goods,Shop,GoodParam,getRecomend} from "network/detail";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  //import {debounce} from "common/util";
  import {itemListenerMixin,backTopMixin} from "common/mixin";
  import {BACK_POSITION} from "common/const";
  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  import {debounce} from "../../common/util";

  export default {
    name: "Detail",
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
      }
    },
    components:{
      GoodsList,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll
    },
    mixins: [
      itemListenerMixin,backTopMixin
    ],
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
        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo;
        //5.获取参数信息
        this.paramInfo = new GoodParam(data.itemParams.info, data.itemParams.rule)
        //6.去除评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }

        /*
         第一次获取，值不对
         原因：this.$refs.params.$el 压根没有渲染
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs);*/

        //记录各个组件的offsetTop数据
        /*this.$nextTick(() => {
          // 第二次获取，值不对
          // 根据最新的数据，对应的dom是已经被渲染出来的，
          // 但图片依然是没有加载完成的（目前获取到的offsetTop不包含其中的图片
          // offset值不对的时候，都是因为图片的问题
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          console.log(this.themeTopYs);
        })*/


      })
      // 3 请求推荐数据
      getRecomend().then(res => {
        this.recommends = res.data.list;
      })

      //给getThemeTopY赋值,对给this.themeTopYs 进行防抖操作
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs);
      },500)

    },
    mounted() {
      //通过混入增加了 全局事件总线的监听
    },
    deactivated() {
      //因为没有设置keep-live，因此这个钩子函数不执行
    },
    destroyed() {
      //离开页面时，停止监听全局事件(即$bus.itemImageLoad)
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    methods:{
      imageLoad(){
        /* 搭配第一种方法使用
        this.$refs.scroll.refresh()*/
        ///混入中封装了newRefresh()的防抖方法
        this.newRefresh()

        //给getThemeTopY赋值
        this.getThemeTopY()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index] ,500)
      },
      contentScroll(position){
        //1. 获取y值
        const positionY = -position.y
        //2. positionY和主题中值进行对比
        for(let i in this.themeTopYs){
          /*console.log(i);
          console.log(this.themeTopYs[parseInt(i)]);
          console.log(positionY);*/
          if(this.currentIndex !== i
            &&
            ((parseInt(i) < this.themeTopYs.length - 1 && this.themeTopYs[parseInt(i)] <= positionY && positionY < this.themeTopYs[parseInt(i)+1])
            ||
            (parseInt(i) === this.themeTopYs.length - 1 && positionY >= this.themeTopYs[parseInt(i)]))){
            this.currentIndex = parseInt(i);
            this.$refs.nav.currentTitle = this.currentIndex
          }
        }
        //3 .滚动到一定位置，显示返回顶部按钮
        this.isShowBackTop = Math.abs(position.y) > BACK_POSITION
      },
      addToCart(){
        //console.log('加入购物车'+ this.iid);
        //1. 获取购物车需要展示的信息
        const product = {};
        product.iid = this.iid
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.lowNowPrice;
        console.log(product);
        // 2. 将商品添加到购物车中,添加到Vuex中
        this.$store.dispatch('addCart', product)
      }
    }
  }
</script>

<style scoped>

  #detail {
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 9;
  }

  .detail-nav {
    position: relative;
    z-index: 2;
    background-color: #fff;
  }
  .content {
    /*
    使用betterScroll必须要给scroll组件一个高度
    1.这里可以使用计算方式，完成高度的确定 */
    height: calc(100% - 44px - 49px);
    /*
    2.使用绝对定位
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden; */

  }
</style>

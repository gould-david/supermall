//混入
import {debounce} from "./util";
import BackTop from "components/content/backTop/BackTop";
export const itemListenerMixin = {

/*  // 如果监听是放到created中，那么有时是在created中取不this.$refs.home的对象的。
  //监听事件总线中的GoodListItem中图片加载完成后发射出来的事件
  /!*console.log(this.$refs.home_scroll.refresh); 有返回值
  console.log(this.$refs.home_scroll.refresh()); 无返回值，直接调用方法内部了*!/
  //使用防抖函数调用scroll.refresh*/
  data(){
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    //封装了一个滚动刷新函数（防抖），且存于data内，方便在其他方法内直接调用
    this.newRefresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImgListener = () => {
      this.newRefresh()
    };
    this.$bus.$on('itemImageLoad',this.itemImgListener)
    console.log('混入的内容');
  }
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return {
      isShowBackTop: false
    }
  },
  methods:{
    backClick(){
      // 调用Scroll组件中封装好的方法。
      this.$refs.scroll.scrollTo(0 , 0 , 1000)
    }
  }
}





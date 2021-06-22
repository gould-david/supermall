//混入
import {debounce} from "./util";

export const itemListenerMixin = {

/*  // 如果监听是放到created中，那么有时是在created中取不this.$refs.home的对象的。
  //监听事件总线中的GoodListItem中图片加载完成后发射出来的事件
  /!*console.log(this.$refs.home_scroll.refresh); 有返回值
  console.log(this.$refs.home_scroll.refresh()); 无返回值，直接调用方法内部了*!/
  //使用防抖函数调用scroll.refresh*/
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImgListener = () => {
      refresh()
    };
    this.$bus.$on('itemImageLoad',this.itemImgListener)
    console.log('混入的内容');
  }
}

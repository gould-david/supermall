<template>
  <div class="wrapper" ref="wrapper">
    <!--   必须再封装一层 ，因为scroll要求外部有一层，内部的第一层能实现滚动，如果直接只用插槽，那只有第一个组件才能生效   -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default(){
          return 0
        }
      },
      pullUpLoad:{
        type:Boolean,
        default(){
          return true
        }
      }
    },
    data(){
      return {
        scroll:null
      }
    },
    mounted() {
      //通过dom操作，不能确定是否拿到的是本组件内的div标签
      /*  document.querySelector('.wrapper')
      *   在vue中一般给标签绑定 ref属性 ，ref一般绑定给子组件
      *
      *   ref如果绑定的是组件，那么通过this.$refs.refname获取到的是一个组件对象
      *   ref如果绑定在元素中，那么通过this.$refs.refname获取到的是一个元素对象
      * */
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //监听滚动的位置
      this.scroll.on('scroll',position => {
        this.$emit('contentScroll',position)
      })

      ///上拉加载更多
      this.scroll.on('pullingUp',() => {
        console.log('上拉加载更多');
        this.$emit('contentPullingUp')
      })
    },
    methods:{
      // 参数可以提供滚动的毫秒数
      scrollTo(x, y ,time=300){
        this.scroll.scrollTo(x,y,time)
      },
      finishPullingUp(){
        this.scroll.finishPullUp();
      },
      refresh(){
        this.scroll.refresh()
      }
    }

  }
</script>

<style scoped>

</style>

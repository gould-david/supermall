<template>
  <div class="tab-controll">
    <div v-for="(item,index) in titles" class="tab-controll-item" :class="{active: index === currentIntex}" @click="itemClick(index)">
      <span>{{item }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControll",
    props: {
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentIntex:0
      }
    },
    mounted() {
      //console.log(this.titles);
    },
    methods:{
      itemClick(index){
        //console.log(index);
        this.currentIntex = index;
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-controll {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-controll-item {
    flex: 1;
    border-bottom: 4px ;
  }
  .tab-controll-item span {
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-high-text);
  }
</style>

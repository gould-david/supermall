//工具类

//导出防抖函数
export function debounce(func, delay){
  let timer = null;
  //console.log('debounce'+ timer);
  return function(...args){
    //只要是执行到这，会清空上一次的setInterval
    if(timer) clearTimeout(timer)
    //console.log('延时器未执行');
    timer = setTimeout(() => {
      console.log('延时器被执行');
      func.apply(this, args)
    },delay)
  }
}

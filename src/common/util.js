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
export function formatDate(date, fmt){
  if (/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1 ,(date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+':date.getMonth() + 1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  };
  for(let k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str){
  return ('00'+ str).substr(str.length)
}

import {request} from "./request";

export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}
//获取首页的数据
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params: {
      type:type,
      page:page
    }
  })
}
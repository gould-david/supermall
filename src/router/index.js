import vue from 'vue'
import vuerouter from 'vue-router'

const Cart = () => import('views/cart/Cart')
const Catagory = () => import('views/catagory/Catagory')
const Home = () => import('views/home/Home')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

vue.use(vuerouter)

const routes = [
  {
    path:'',
    redirect: '/home'
  },
  {
    path:'/home',
    component: Home
  },
  {
    path:'/catagory',
    component:Catagory
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]
const router = new vuerouter({
  routes,
  mode:'history'
})

export default router

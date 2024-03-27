import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue"
import MainBox from "../views/MainBox.vue"
import routesConfig from './config.js'
import { useStore } from '../stores/index.js'
//import { Pinia } from 'pinia'

//const store = useStore()

const rs = [
  {
    path:"/login",
    name: "login",
    component: Login
  },
  {
    path:"/mainbox",
    name: "mainbox",
    component: MainBox
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: rs
})

export default router

//console.log(useStore)
const checkPermission = (item) => {
  if (item.requireAdmin) {
    const store = useStore()
    return store.userInfo.role === 1
  }
  return true
}

//封装？
const ConfigRouter = () => {
  routesConfig.forEach(item => {
    checkPermission(item) && router.addRoute("mainbox",item)
  })
}


//路由守卫（需要优化）
router.beforeEach((to, from, next) => {
  const store = useStore()
  if(to.name === "login"){
    next()
  }else{
    if(!localStorage.getItem("token")){
      next({
        path:"/login"
      })
    }else{
      //next()
      if(!store.isGetterRouter){
        ConfigRouter()
        //保存登录信息
        store.changeGetterRouter(true)
        next({
          path:to.fullPath
        })
      }
      else{
        next()
      }
    }
  }
})
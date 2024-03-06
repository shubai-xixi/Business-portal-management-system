import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue"
import MainBox from "../views/MainBox.vue"
import routesConfig from './config.js'
import { useStore } from '../stores/index.js'
//import { Pinia } from 'pinia'

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

//封装？
const ConfigRouter = () => {
  routesConfig.forEach(item => {
    router.addRoute("mainbox",item)
  })
}

ConfigRouter()

//路由守卫（需要优化）
router.beforeEach((to,from,next) => {
  const store = useStore()
  if(to.name === "login"){
    next()
  }else{
    if(!localStorage.getItem("token")){
      next({
        path:"/login"
      })
    }else{
      next()
      // if(!store.localStorage){
      //   ConfigRouter()
      //   //保存登录信息
      //   store.changeGetterRouter(true)
      //   next({
      //     path:to.fullPath
      //   })
      // }
      // else{
      //   next()
      // }
    }
  }
})
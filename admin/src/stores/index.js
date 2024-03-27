import { defineStore } from 'pinia'

export const useStore = defineStore('c', {
  state: () => ({
    isGetterRouter: false,
    isCollapsed: false,
    userInfo: {}
  }),
  actions: {
    changeGetterRouter(value) {
      this.isGetterRouter = value
    },
    changeCollapsed() {
      this.isCollapsed = !this.isCollapsed
    },
    changeUserInfo(value) {
      this.userInfo = {
        ...this.userInfo,
        ...value
      }
      //console.log(this.userInfo)
    },
    clearUserInfo() {
      this.userInfo = {}
    }
  },
  persist: {
    paths: ["isCollapsed", "userInfo"],
  },
})

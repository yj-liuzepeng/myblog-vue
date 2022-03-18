// store/index.ts
import { defineStore } from "pinia";
import {styleone} from '../styles/skinstyles/styles'
// interface MainState {
//   counter: number
//   name: string
// }

export const useMainStore = defineStore("main", {

  state: () => {
    return {
      userInfo: {}, // 用户信息
      token:'',
      ...styleone
    };
  },
  getters: {
 
  },
  actions: {
    changeStyle(style) {
      this.headerstyle = {...style.headerstyle}
      this.authorstyle = {...style.authorstyle}
     },
    saveUserInfo(data) {
      this.userInfo = {...data}
      localStorage.setItem("BLOGUSERINFO", JSON.stringify(this.userInfo));
    },
    saveToken(token) {
      this.token = token
      localStorage.setItem("BLOGTOKEN", JSON.stringify(this.token));
    }
  },
});


/*
 * @Author: lzp
 * @Date: 2022-03-18 11:36:06
 * @Description: pinia全局状态管理
 */
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
    },
    clearUserInfo() {
      this.userInfo = {}
      localStorage.removeItem('BLOGUSERINFO')
    },
    clearToken() {
      this.token = ''
      localStorage.removeItem('BLOGTOKEN')
    }
  },
});


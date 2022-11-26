/*
 * @Author: lzp
 * @Date: 2022-03-18 11:36:06
 * @Description: pinia全局状态管理
 */
import { defineStore } from "pinia";
import { styleone } from "../styles/skinstyles/styles";
// interface MainState {
//   counter: number
//   name: string
// }
interface POSITION {
  ip: string;
  city: string;
}
export const useMainStore = defineStore("main", {
  state: () => {
    return {
      position: {} as POSITION, // 定位信息
      userInfo: {}, // 用户信息
      token: "",
      ...styleone,
    };
  },
  getters: {},
  actions: {
    // 切换主题
    changeStyle(style) {
      this.headerstyle = { ...style.headerstyle };
      this.authorstyle = { ...style.authorstyle };
    },
    savePosition(data) {
      this.position = { ...data };
      localStorage.setItem("BLOGUSERPOSITION", JSON.stringify(this.position));
    },
    saveUserInfo(data) {
      this.userInfo = { ...data };
      localStorage.setItem("BLOGUSERINFO", JSON.stringify(this.userInfo));
    },
    saveToken(token) {
      this.token = token;
      localStorage.setItem("BLOGTOKEN", JSON.stringify(this.token));
    },
    clearUserInfo() {
      this.userInfo = {};
      localStorage.removeItem("BLOGUSERINFO");
    },
    clearToken() {
      this.token = "";
      localStorage.removeItem("BLOGTOKEN");
    },
  },
});

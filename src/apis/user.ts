/*
 * @Author: lzp
 * @Date: 2022-03-18 11:36:06
 * @Description: 用户相关接口
 */

import axios from "../utils/axios";

// 注册
export const register = (params: any) => {
  return axios.post("/api/register", params);
};
// 登录
export const login = (params) => {
  return axios.post("/api/login", params);
};
// qq登录
export const qqLogin = (params) => {
  return axios.post("/api/qqLogin", params);
};

// 用户访问
export const addVist = (params: any) => {
  return axios.post("/api/addVist", params);
};
// 添加邮箱
export const updateUserEmail = (params: any) => {
  return axios.post("/api/updateUserEmail", params);
};

// 用户管理接口

import axios from '../utils/axios'

// 注册
export const register = (params: any) => {
  return axios.post('/api/register', params)
}
// 登录
export const login = (params) => {
  return axios.post('/api/login', params)
}


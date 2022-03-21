// 实战管理接口

import axios from '../utils/axios'

// 查询实战列表
export const queryWorkList = (params: any) => {
  return axios.post('/api/queryWorkList', params)
}
// 实战模糊查询
export const likeQueryWork = (params: any) => {
  return axios.post('/api/likeQueryWork', params)
}




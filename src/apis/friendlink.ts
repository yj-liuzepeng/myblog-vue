/*
 * @Author: lzp
 * @Date: 2022-04-14 11:48:45
 * @Description: 友情链接接口
 */

import axios from '../utils/axios'

// 申请友情链接
export const addLink = (params: any) => {
  return axios.post('/api/addLink', params)
}
// 友情链接列表
export const queryLinkList = (params: any) => {
  return axios.post('/api/queryLinkList', params)
}


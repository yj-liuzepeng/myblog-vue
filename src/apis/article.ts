/*
 * @Author: lzp
 * @Date: 2022-03-18 11:36:06
 * @Description: 活动管理接口
 */


import axios from '../utils/axios'

// 活动列表查询
export const queryArticleList = (params: any) => {
  return axios.post('/api/queryArticleList', params)
}
// 查询标签
export const queryTagList = (params) => {
  return axios.post('/api/queryTagList', params)
}
// 模糊查询
export const likeQueryArticle = (params) => {
  return axios.post('/api/likeQueryArticle', params)
}
// 根据标签查询文章
export const queryArticleByTag = (params) => {
  return axios.post('/api/queryArticleByTag', params)
}
// 根据id查询文章
export const queryArticleById = (params) => {
  return axios.post('/api/queryArticleById', params)
}
// 文章热度+1
export const addArticleHot = (params) => {
  return axios.post('/api/addArticleHot', params)
}
// 文章热度排行
export const queryArticleByHot = (params) => {
  return axios.post('/api/queryArticleByHot', params)
}


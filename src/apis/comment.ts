/*
 * @Author: lzp
 * @Date: 2022-04-02 09:53:34
 * @Description: 评论相关接口
 */
import axios from '../utils/axios'

// 评价列表查询
export const queryCommentList = (params: any) => {
  return axios.post('/api/queryCommentList', params)
}
// 增加评论
export const addComment = (params: any) => {
  return axios.post('/api/addComment', params)
}
// 删除评论
export const deleteComment = (params: any) => {
  return axios.post('/api/deleteComment', params)
}
// 点赞或取消
export const addorDelLikeNum = (params: any) => {
  return axios.post('/api/addorDelLikeNum', params)
}
// 更新用户评论点赞
export const rfhUserCommentLike = (params: any) => {
  return axios.post('/api/rfhUserCommentLike', params)
}
// 评论热度排行
export const queryCommentByHot = (params) => {
  return axios.post('/api/queryCommentByHot', params)
}
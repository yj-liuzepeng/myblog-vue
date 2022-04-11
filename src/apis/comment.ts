/*
 * @Author: lzp
 * @Date: 2022-04-02 09:53:34
 * @Description: file content
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
// 点赞评论
export const addLikeNum = (params: any) => {
  return axios.post('/api/addLikeNum', params)
}

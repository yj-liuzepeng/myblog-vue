/*
 * @Author: lzp
 * @Date: 2022-04-19 18:05:36
 * @Description: 音乐接口
 */
import axios from '../utils/axios'

// 获取歌词
export const getWords = (params: any) => {
  return axios.post('/api/getWords', params)
}
// 获取歌曲详情
export const getMusicInfo = (params: any) => {
  return axios.post('/api/getMusicInfo', params)
}
// 获取歌曲url
export const getMusicUrl = (params: any) => {
  return axios.post('/api/getMusicUrl', params)
}
// 获取热门歌曲
export const getHotMusic = (params: any) => {
  return axios.post('/api/getHotMusic', params)
}
// 获取搜索建议
export const getSearchSuggest = (params: any) => {
  return axios.post('/api/getSearchSuggest', params)
}
// 获取热门评论
export const getHotTalk = (params: any) => {
  return axios.post('/api/getHotTalk', params)
}


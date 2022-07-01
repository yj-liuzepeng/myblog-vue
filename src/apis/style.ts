/*
 * @Author: lzp
 * @Date: 2022-07-01 16:15:38
 * @Description: 获取自定义主题
 */
import axios from '../utils/axios'

// 查询主题
export const getCurStyle = () => {
  return axios.get('/api/getCurStyle',{})
}
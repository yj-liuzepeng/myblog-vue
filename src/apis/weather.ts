/*
 * @Author: lzp
 * @Date: 2022-04-19 18:05:36
 * @Description: 天气接口
 */
import axios from '../utils/axios'

// 获取天气
export const getWeatherData = (params: any) => {
  return axios.post('/api/getWeatherData', params)
}

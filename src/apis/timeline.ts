/*
 * @Author: lzp
 * @Date: 2022-03-18 11:36:06
 * @Description: 时间线管理接口
 */

import axios from '../utils/axios'

// 查询时间线列表
export const queryTimelineList = (params: any) => {
  return axios.post('/api/queryTimelineList', params)
}



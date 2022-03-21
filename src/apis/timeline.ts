// 时间线管理接口

import axios from '../utils/axios'

// 查询时间线列表
export const queryTimelineList = (params: any) => {
  return axios.post('/api/queryTimelineList', params)
}



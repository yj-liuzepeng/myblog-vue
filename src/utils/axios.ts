import axios from 'axios'
import qs from 'qs'
import {
  ElMessageBox
} from 'element-plus'

axios.defaults.baseURL = 'https://www.liuzepeng.com/api' // 线上
// axios.defaults.baseURL = 'http://localhost:8088' // 本地



// post请求头  formdata 方式
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// post请求头  json    方式
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// 设置超时
axios.defaults.timeout = 30000

// axios.interceptors.request.use(
//   (config) => {
//     config.headers["X-Requested-With"] = "XMLHttpRequest";
//     config.headers.post["Content-Type"] = "application/json";
//     // 设置token
//     if (localGet("ADMINBLOGTOKEN")) {
//       config.headers["authorization"] = localGet("ADMINBLOGTOKEN");
//     }

//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    console.log(error)
    ElMessageBox.alert(JSON.stringify(error), '请求异常', {
      confirmButtonText: '确定'
      // callback: action => {}
    })
  }
)
export default {
  post(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: qs.stringify(data)
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  postjson(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        headers: { 'Content-Type': 'application/json' },
        data: data
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  get(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: data
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

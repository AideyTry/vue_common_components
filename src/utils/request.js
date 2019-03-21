import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: 'https://api.phc-dow.com/',
  timeout: 60 * 1000, //请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

export default service
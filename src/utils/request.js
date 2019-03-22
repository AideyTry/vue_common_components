import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: 'https://api.phc-dow.com/',
  timeout: 60 * 1000, //请求超时时间
  headers: {
    'Content-Type': 'application/json',
    'token': 'faa29d6b1eb31acaa5848eec78a43c9add32e143'
  }
})

export default service
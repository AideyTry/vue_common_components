import request from '@/utils/request'

// 车主评价选项
export function reviewOptions () {
  return request({
    url: `/order/evaluate/all`,
    method: 'get'
  })
}

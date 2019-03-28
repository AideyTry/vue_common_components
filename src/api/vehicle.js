import request from '@/utils/request'

export function getCar (page, likename) {
  return request({
    url: `/user/car/list?pageNum=${page.pageNum}&pageSize=${page.pageSize}&likename=${likename}`,
    method: 'get'
  })
}
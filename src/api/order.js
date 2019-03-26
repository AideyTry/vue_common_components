import request from '@/utils/request'

// 车主评价选项
export function reviewOptions () {
  return request({
    url: `/order/evaluate/all`,
    method: 'get'
  })
}

// 评价
export function submitReview (params) {
  return request({
    url: `/order/evaluate/service/add`,
    method: 'post',
    data: params
  })
}

//评价列表
export function getReviews (params) {
  return request({
    url: `/order/evaluate/service/list?companyId=${params.companyId}&serviceId=${params.serviceId}`,
    method: 'get',
  })
}

// 工单评价
export function orderEvaluate (params) {
  return request({
    url: `/order/service/evaluate/detail/${params.id}`,
    method: 'get'
  })
}

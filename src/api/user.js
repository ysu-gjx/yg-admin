import request from '@/utils/request'

export const feature = () => {
  return request.get('/user/feature')
}

export const chapter = () => {
  return request.get('/user/chapter')
}

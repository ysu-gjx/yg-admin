import request from '@/utils/request'

export const login = (data) => {
  const url = '/sys/login'
  return request.post(url, data)
}

export const getUserInfo = () => {
  return request.get('/sys/profile')
}

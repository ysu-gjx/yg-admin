import request from '@/utils/request'

export const getUserManageList = (params) => {
  return request.get('/user-manage/list', { params })
}

/**
 * 批量导入
 */
export const userBatchImport = (params) => {
  return request.post('/user-manage/batch/import', params)
}

/**
 * 删除指定数据
 */
export const deleteUser = (id) => {
  return request.get(`/user-manage/detele/${id}`)
}

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

/**
 * 获取所有用户列表数据
 */
export const getUserManageAllList = () => {
  return request.get('/user-manage/all-list')
}

/**
 * 获取用户详情
 */
export const userDetail = (id) => {
  return request.get(`/user-manage/detail/${id}`)
}

/**
 * 获取指定用户角色
 */
export const userRoles = (id) => {
  return request.get(`/user-manage/role/${id}`)
}

/**
 * 给用户分配角色
 */
export const updateRole = (id, roles) => {
  return request.post(`/user-manage/update-role/${id}`, { roles })
}

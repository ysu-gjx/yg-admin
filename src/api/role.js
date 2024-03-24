import request from '@/utils/request'

export default {
  /**
   * 获取所有角色
   */
  roleList: () => {
    return request.get('/role/list')
  },
  /**
   * 获取指定角色的权限
   */
  rolePermission: (roleId) => {
    return request.get(`/role/permission/${roleId}`)
  },
  /**
   * 为角色修改权限
   */
  distributePermission: (params) => {
    return request.post('/role/distribute-permission', params)
  }
}

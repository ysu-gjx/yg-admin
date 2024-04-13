import request from '@/utils/request'

export default {
  /**
   * 获取所有权限
   */
  permissionList: () => {
    return request.get('/permission/list')
  }
}

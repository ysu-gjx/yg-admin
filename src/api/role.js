import request from '@/utils/request'

export default {
  /**
   * 获取所有角色
   */
  roleList: () => {
    return request.get('/role/list')
  }
}

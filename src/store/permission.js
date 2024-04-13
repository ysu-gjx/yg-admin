import { defineStore } from 'pinia'
import { publicRoutes, privateRoutes } from '@/router'
import { ref } from 'vue'

export const usePermissionStore = defineStore('permission', () => {
  // state 最终的路由表
  const routes = ref(publicRoutes)

  // action
  /**
   * 根据权限筛选路由
   */
  const filterRoutes = (menus) => {
    const matchedRoutes = []
    // 路由权限匹配
    menus.forEach((menu) => {
      matchedRoutes.push(...privateRoutes.filter((item) => item.name === menu))
    })

    matchedRoutes.push({
      path: '/:catchAll(.*)',
      redirect: '/404'
    })

    routes.value = [...publicRoutes, ...matchedRoutes]

    return matchedRoutes
  }

  return {
    routes,
    filterRoutes
  }
})

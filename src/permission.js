import router from '@/router'
import { useUserStore, usePermissionStore } from '@/store'
import { storeToRefs } from 'pinia'

let userStore = null
let permissionStore = null

// 白名单
const whiteList = ['/login']

/**
 *  路由前置守卫
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
const beforeEach = async (to, from, next) => {
  if (!userStore) {
    userStore = useUserStore()
    permissionStore = usePermissionStore()
  }
  const { token, hasUserInfo } = storeToRefs(userStore)
  // 1. 如果已经登陆 不允许访问 登录页
  if (token.value) {
    // 存在 token ，进入主页
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断是否有用户信息
      if (!hasUserInfo.value) {
        // 触发获取用户信息的 action，并获取用户当前权限
        const { permission } = await userStore.getUserInfoAction()
        // 处理用户权限，筛选出需要添加的权限
        const filterRoutes = await permissionStore.filterRoutes(
          permission.menus
        )
        // 利用 addRoute 循环添加
        filterRoutes.forEach((route) => {
          router.addRoute(route)
        })

        // 添加完动态路由之后，需要在进行一次主动跳转
        return next(to.path)
      }
      next()
    }
  } else {
    // 2. // 没有token的情况下，可以进入白名单
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
}

// router.beforeEach(beforeEach)
export default beforeEach

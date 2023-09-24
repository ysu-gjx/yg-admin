import router from '@/router'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'

let userStore = null

// 白名单
const whiteList = ['/login']

/**
 *  路由前置守卫
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
router.beforeEach(async (to, from, next) => {
  if (!userStore) {
    userStore = useUserStore()
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
        await userStore.getUserInfoAction()
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
})

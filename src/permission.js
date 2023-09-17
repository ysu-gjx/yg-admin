import router from '@/router'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'

// 白名单
const whiteList = ['/login']

/**
 *
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  // 1. 如果已经登陆 不允许访问 登录页
  if (token.value) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 2. 未登录则跳转到登录页
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

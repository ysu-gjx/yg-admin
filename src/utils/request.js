import axios from 'axios'
import { ElMessage } from 'element-plus'
import md5 from 'md5'
import { useUserStore } from '@/store'
import { isCheckTimeout } from './auth'

let userStore = null

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (userStore === null) {
      userStore = useUserStore()
    }
    const { icode, time } = getTestICode()
    config.headers.icode = icode
    // config.headers.icode = 'helloqianduanxunlianying'
    config.headers.codeType = time
    // 在这个位置需要统一的去注入token
    if (userStore.token) {
      if (isCheckTimeout()) {
        // 登出操作
        userStore.logoutAction()
        return Promise.reject(new Error('token 失效'))
      }

      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    // 配置接口国际化
    // config.headers['Accept-Language'] = store.getters.language
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // 业务错误
      ElMessage.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // *处理 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      userStore.logoutAction()
    }
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

/**
 * 返回 Icode 的实现
 */
function getTestICode() {
  const now = parseInt(Date.now() / 1000)
  const code = now + 'LGD_Sunday-1991-12-30'
  return {
    icode: md5(code),
    time: now
  }
}

export default instance

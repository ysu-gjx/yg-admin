// 用户相关  store
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'

export const useUserStore = defineStore(
  'user',
  () => {
    // state
    const userInfo = ref({})
    const token = ref('')
    // getters
    const hasUserInfo = computed(() => {
      return JSON.stringify(userInfo.value) !== '{}'
    })

    // actions
    const loginAction = (userInfo) => {
      return new Promise((resolve, reject) => {
        const data = {
          username: userInfo.username,
          password: md5(userInfo.password)
        }
        login(data)
          .then((res) => {
            // 获取token
            setToken(res.token)
            // 登录成功后 跳转页面
            // router.push('/')
            // 登录后记录时间戳
            setTimeStamp()
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
    // 获取用户信息
    const getUserInfoAction = async () => {
      const res = await getUserInfo()
      userInfo.value = res
    }

    const setToken = (val) => {
      token.value = val
    }

    const logoutAction = () => {
      userInfo.value = {}
      setToken('')
      // TODO 清除权限

      router.push('/login')
    }

    return {
      userInfo,
      hasUserInfo,
      token,
      loginAction,
      setToken,
      getUserInfoAction,
      logoutAction
    }
  },
  {
    persist: true
  }
)

// 用户相关  store
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login } from '@/api/sys'
import md5 from 'md5'
// import router from '@/router'

export const useUserStore = defineStore(
  'user',
  () => {
    // state
    const loginInfo = ref({})
    const token = ref('')
    // getters

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
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }

    const setToken = (val) => {
      token.value = val
    }

    return {
      loginInfo,
      token,
      loginAction,
      setToken
    }
  },
  {
    persist: true
  }
)

import i18n from '@/i18n'
import { watch } from 'vue'
import { useCommonStore } from '@/store'
export const generateTitle = (title) => {
  return i18n.global.t(`msg.route.${title}`)
}

/**
 * 监听语言切换
 * @param  {...any} cbs 所有的回调
 */

export const switchLanguage = (...cbs) => {
  const commonStore = useCommonStore()
  watch(
    () => commonStore.language,
    () => {
      cbs.forEach((cb) => cb(commonStore.language))
    }
  )
}

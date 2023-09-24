import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { getItem, setItem } from './storage'

/**
 * 获取时间戳
 */
export const getTimeStamp = () => {
  return getItem(TIME_STAMP)
}
/**
 * 设置时间戳
 */
export const setTimeStamp = () => {
  setItem(TIME_STAMP, Date.now())
}

/**
 * 是否超时
 */
export const isCheckTimeout = () => {
  // 获取当前时间
  const currentTimeStamp = Date.now()
  // 获取缓存的时间戳
  const timeStamp = getTimeStamp()

  return currentTimeStamp - timeStamp > TOKEN_TIMEOUT_VALUE
}

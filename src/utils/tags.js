const whiteList = ['/login', '401', '404']
/**
 * path 是否需要被缓存
 * @param {*} path
 * @returns
 */
export const isTags = (path) => {
  return !whiteList.includes(path)
}

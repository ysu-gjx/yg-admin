/**
 * 判断是为为外部资源
 * @param {string} path
 * @returns
 */
export const isExternal = (path) => {
  return /^(https?:|mailto|tel:)/.test(path)
}

import path from 'path'
import i18n from '@/i18n'
/**
 * 筛选出可供搜索的路由对象
 * @param routes 路由表
 * @param basePath 基础路径，默认为 /
 * @param prefixTitle
 */
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  // 创建 result 数据
  const res = []
  // 循环 routes 路由
  for (const route of routes) {
    // 创建包含 path 和 title 属性的对象
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }
    // 当前存在 meta 时，使用 i18n 解析国际化数据，组合成新的 title 内容
    // 动态路由不允许被搜索
    // 匹配动态路由的正则
    const reg = /.*\/:.*/
    if (
      route.meta &&
      route.meta.title &&
      !reg.exec(route.path) &&
      !res.find((item) => item.path === data.path)
    ) {
      data.title = [
        ...data.title,
        i18n.global.t(`msg.route.${route.meta.title}`)
      ]

      res.push(data)
    }

    // 递归子路由
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res.push(...tempRoutes)
      }
    }
  }

  return res
}

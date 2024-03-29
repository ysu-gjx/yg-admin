import path from 'path'
/**
 * 返回所有子路由
 */
const getChildrenRoutes = (routes) => {
  const res = []

  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      res.push(...route.children)
    }
  })

  return res
}

/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
const filterRoutes = (routes) => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter((route) => {
    return !childrenRoutes.find((item) => item.path === route.path)
  })
}

/**
 * 判断数据是否为空值
 */
function isNull(data) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

/**
 * 根据 routes(filterRoutes) 数据，返回对应 menu 规则数组
 */
const generateMenu = (routes, basePath = '') => {
  const res = []

  routes.forEach((item) => {
    // 没有meta 并且没有children，return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在children 但是不存在 meta， 进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      res.push(...generateMenu(item.children))
      return
    }

    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = res.find((t) => t.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }

      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        res.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenu(item.children, item.path))
    }
  })

  return res
}

export { filterRoutes, generateMenu }

import layout from '@/layout'

export default {
  path: '/user',
  component: layout,
  redirect: '/user/manage',
  name: 'permissionList',
  meta: { title: 'user', icon: 'personnel' },
  children: [
    {
      path: 'permission',
      component: () =>
        import(
          /* webpackChunkName: "permission-list" */ '@/views/permission-list/index'
        ),
      meta: {
        title: 'permissionList',
        icon: 'permission'
      }
    }
  ]
}

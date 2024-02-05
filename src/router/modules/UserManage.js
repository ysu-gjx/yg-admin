import Layout from '@/layout'

export default {
  path: '/user',
  name: 'user',
  redirect: '/user/manage',
  component: Layout,
  meta: {
    title: 'user',
    icon: 'personnel'
  },
  children: [
    {
      path: 'manage',
      name: 'userManage',
      component: () =>
        import(/* webpackChunkName: "user-manage" */ '@/views/user-manage'),
      meta: {
        title: 'userManage',
        icon: 'personnel-manage'
      }
    },
    {
      path: 'info/:id',
      name: 'userInfo',
      component: () =>
        import(/* webpackChunkName: "user-manage" */ '@/views/user-info/index'),
      props: true,
      meta: {
        title: 'userInfo'
      }
    },
    {
      path: 'import',
      name: 'import',
      component: () =>
        import(/* webpackChunkName: "user-manage" */ '@/views/import/index'),
      meta: {
        title: 'excelImport'
      }
    }
  ]
}

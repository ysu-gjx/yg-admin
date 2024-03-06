import layout from '@/layout'

export default {
  path: '/article',
  component: layout,
  redirect: '/article/ranking',
  name: 'articleCreate',
  meta: { title: 'article', icon: 'article' },
  children: [
    {
      path: '/article/create',
      component: () =>
        import(
          /* webpackChunkName: "article-create" */ '@/views/article-create/index'
        ),
      meta: {
        title: 'articleCreate',
        icon: 'article-create'
      }
    },
    {
      path: '/article/editor/:id',
      component: () =>
        import(
          /* webpackChunkName: "article-create" */ '@/views/article-create/index'
        ),
      meta: {
        title: 'articleEditor'
      }
    },
    {
      path: '/article/json2Ts',
      component: () =>
        import(
          /* webpackChunkName: "article-create" */ '@/views/editors/CodeEditor'
        ),
      meta: {
        title: 'jsonToTs'
      }
    },
    {
      path: '/article/code',
      component: () =>
        import(
          /* webpackChunkName: "article-create" */ '@/views/editors/CodeEditor2'
        ),
      meta: {
        title: 'codeEditor'
      }
    },
    {
      path: '/article/byteMd',
      component: () =>
        import(
          /* webpackChunkName: "article-create" */ '@/views/editors/MdEditorView'
        ),
      meta: {
        title: 'byteMd'
      }
    }
  ]
}

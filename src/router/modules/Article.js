import layout from '@/layout'

export default {
  path: '/article',
  component: layout,
  redirect: '/article/ranking',
  name: 'articleRanking',
  meta: { title: 'article', icon: 'article' },
  children: [
    {
      path: 'ranking',
      component: () =>
        import(
          /* webpackChunkName: "article-ranking" */ '@/views/article-ranking/index'
        ),
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking'
      }
    },
    {
      path: ':id',
      component: () =>
        import(
          /* webpackChunkName: "article-ranking" */ '@/views/article-detail/index'
        ),
      meta: {
        title: 'articleDetail'
      }
    }
  ]
}

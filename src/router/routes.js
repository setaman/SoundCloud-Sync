
const routes = [
  {
    path: '/',
    component: () => import('layouts/Home.vue'),
    name: 'home',
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

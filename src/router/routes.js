
const routes = [
  {
    path: '/',
    component: () => import('layouts/Home.vue'),
    name: 'home',
    redirect: {
      name: 'likes'
    },
    children: [
      { path: 'likes',
        name: 'likes',
        component: () => import('pages/Likes.vue')
      },
      { path: 'followings',
        name: 'followings',
        component: () => import('pages/Followings.vue')
      },
      { path: 'playlists',
        name: 'playlists',
        component: () => import('pages/Playlists.vue')
      }
    ]
  },
  {
    path: '/settings',
    component: () => import('layouts/Settings.vue'),
    name: 'settings'
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

import store from '../store/index'

const requireUsersData = (to, from, next) => {
  if (store.state.users.userOne.userId && store.state.users.userTwo.userId) {
    next()
    return
  }
  // redirect to settings form
  next('/settings')
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/Welcome.vue'),
    name: 'welcome',
    beforeEnter: requireUsersData
  },
  {
    path: '/home',
    component: () => import('layouts/Home.vue'),
    name: 'home',
    // beforeEnter: requireUsersData,
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

import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },


  {
    path: '/users',
    component: () => import('../views/Users.vue'),
    children: [
      {
        path: '',
        name: 'users',
        component: () => import('../views/UsersList.vue'),
      },
      {
        path: 'edit/:id',
        name: 'users-edit',
        component: () => import('../views/UsersEdit.vue'),
      },
      {
        path: 'create',
        name: 'users-create',
        component: () => import('../views/UsersEdit.vue'),
      },
    ],
  },


  {
    path: '/items',
    component: () => import('../views/Items.vue'),
    children: [
      {
        path: '',
        name: 'items',
        component: () => import('../views/ItemsList.vue'),
      },
      {
        path: 'edit/:id',
        name: 'items-edit',
        component: () => import('../views/ItemsEdit.vue'),
      },
      {
        path: 'create',
        name: 'items-create',
        component: () => import('../views/ItemsEdit.vue'),
      },
    ],
  },


  {
    path: '/store',
    name: 'store',
    component: () => import('../views/Store.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
  },
  {
    path: "/:catchAll(.*)",
    component: () => import('../views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


export default router

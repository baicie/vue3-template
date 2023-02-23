import { RouteRecordRaw, RouterView } from 'vue-router';
import { HOME, HOMEINDEX } from './route-name';

export default [
  {
    path: '/',
    redirect: '/home'
  },

  {
    path: '/home',
    name: HOME,
    meta: { requiresAuth: true },
    component: RouterView,
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        name: HOMEINDEX,
        meta: { requiresAuth: true, authtype: 'all', title: '首页' },
        component: () => import('@/pages/home-page.vue')
      }
    ]
  }
] as readonly RouteRecordRaw[];

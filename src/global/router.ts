import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/form.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Form',
    component: Home
  },
  {
    path: '/table',
    name: 'Table',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/table.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

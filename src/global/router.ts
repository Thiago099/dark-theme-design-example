import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  
  // {
  //   path: '/',
  //   name: 'Table',
  //   component: () => import('@/views/table-test.vue')
  // },
  // {
  //   path: '/form/:id',
  //   name: 'Form',
  //   component:  () => import('@/views/form-test.vue')
  // }
]
import cruds from './cruds'
for(const {name, data, table_fields, form_fields, title} of cruds)
{
  routes.push({
    path: '/'+name,
    name: name,
    component: () => import('@/components/crud/list.vue'),
    props: {
      name,
      data,
      table_fields,
      title
    }
  })
  routes.push({
    path: '/'+name+'/edit/:id',
    name: name+"-edit",
    component: () => import('@/components/crud/edit.vue'),
    props: {
      name,
      data,
      form_fields,
      title
    }
  })
}

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

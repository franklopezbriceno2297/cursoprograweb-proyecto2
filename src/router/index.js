import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Categories from '@/views/Categories.vue'
import Pages from '@/views/Pages.vue'
import CategoryForm from '@/views/CategoryForm.vue'

const routes = [
  {
    path: '/categoria/:windowMode/:path',
    name: 'CategoryForm',
    component: CategoryForm
  },
  {
    path: '/categorias/:categoryPath',
    name: 'Pages',
    component: Pages
  },
  {
    path: '/categorias',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

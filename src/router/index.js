import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Categories from '@/views/Categories.vue'
import Pages from '@/views/Pages.vue'

const routes = [
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
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

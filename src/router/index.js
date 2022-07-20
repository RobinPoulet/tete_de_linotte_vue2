import AboutViewVue from '@/views/AboutView.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsViewVue from '../views/ProductsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutViewVue
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsViewVue
  }
]

const router = new VueRouter({
  routes
})

export default router

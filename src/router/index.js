import About from '@/views/About.vue'
import Admin from '@/views/admin/Admin.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Product from '../views/Product.vue'
import ProductList from '../views/admin/product/List.vue'
import ProductEdit from '../views/admin/product/Edit.vue'
import CategoryList from '../views/admin/category/List.vue'
import CategoryEdit from '../views/admin/category/Edit.vue'
import CategoryShow from '../views/admin/category/Show.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/products/:id',
    name: 'product',
    component: Product,
    props: true
  },
  {
    path: '/admin/products/list',
    name: 'productList',
    component: ProductList
  },
  {
    path: '/admin/products/edit',
    name: 'productEdit',
    component: ProductEdit,
    props: true
  },
  {
    path: '/admin/category/list',
    name: 'categoryList',
    component: CategoryList
  },
  {
    path: '/admin/category/edit',
    name: 'categoryEdit',
    component: CategoryEdit,
    props: true
  },
  {
    path: '/admin/category/:id',
    name: 'categoryShow',
    component: CategoryShow,
    props: true
  },
]

const router = new VueRouter({
  routes
})

export default router

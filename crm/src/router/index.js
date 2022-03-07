import Vue from 'vue'
import VueRouter from 'vue-router'
import Styles from '../views/Styles.vue'
import Brands from '../views/Brands.vue'
import Category from '../views/Category.vue'
import Emails from '../views/Emails.vue'
import SubCategory from '../views/SubCategory.vue'
import BrandsEdit from '../views/BrandsEdit.vue'
import BrandsAdd from '../views/BrandsAdd.vue'
import Articles from '../views/Articles.vue'
import ArticlesEdit from '../views/ArticlesEdit.vue'
import ArticlesAdd from '../views/ArticlesAdd.vue'
import Products from '../views/Products.vue'
import ProductsEdit from '../views/ProductsEdit.vue'
import ProductsAdd from '../views/ProductsAdd.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/styles',
    name: 'Styles',
    component: Styles
  },
  {
    path: '/brands',
    name: 'Brands',
    component: Brands
  },
  {
    path: '/brands/:id',
    name: 'BrandsEdit',
    component: BrandsEdit
  },
  {
    path: '/add-brands',
    name: 'BrandsAdd',
    component: BrandsAdd
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/emails',
    name: 'Emails',
    component: Emails
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles
  },
  {
    path: '/articles/:id',
    name: 'ArticlesEdit',
    component: ArticlesEdit
  },
  {
    path: '/add-articles',
    name: 'ArticlesAdd',
    component: ArticlesAdd
  },
  {
    path: '/sub-category',
    name: 'SubCategory',
    component: SubCategory
  },
  {
    path: '/products/:id',
    name: 'ProductsEdit',
    component: ProductsEdit
  },
  {
    path: '/add-products',
    name: 'ProductsAdd',
    component: ProductsAdd
  },
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

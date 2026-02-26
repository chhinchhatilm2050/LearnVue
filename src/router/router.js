import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import PostList from '@/views/PostList.vue'
import ProductsView from '@/views/ProductsView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import BlogView from '@/views/BlogView.vue'
import BlogPostView from '@/views/BlogPostView.vue'
import ShopView from '@/views/ShopView.vue'
import LoginView from '@/views/LoginView.vue'
import UnauthorizedView from '@/views/UnauthorizedView.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import OverviewView from '@/views/dashboard/OverviewView.vue'
import UsersView from '@/views/dashboard/UsersView.vue'
import NotFount from '@/views/NotFount.vue'
import ViewShop from '@/views/pinia/ViewShop.vue'
import CartView from '@/views/pinia/CartView.vue'
import SittingPage from '@/views/dashboard/SittingPage.vue'
import ProductPage from '@/views/dashboard/ProductPage.vue'
import BlogViewState from '@/views/BlogViewState.vue'
import { useAuthStore } from '@/stores/auth'
import MovieSearch from '@/views/MovieSearch.vue'
import FormPost from '@/views/FormPost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/moviesearch',
      name: 'moviesearch',
      component: MovieSearch
    },
    {
      path: '/viewshop',
      name: 'viewshop',
      component: ViewShop
    },
    {
      path: '/cartview',
      name: 'cartview',
      component: CartView
    },
    {
      path: '/aboutpage',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/postlist',
      name: 'postlist',
      component: PostList
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetailView
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView
    },
    {
      path: '/formpost',
      name: 'formpost',
      component: FormPost
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: BlogPostView
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: UnauthorizedView
    },
    {
      path: '/blogviewstate',
      name: 'blogviewstate',
      component: BlogViewState
    },

    {
      path: '/dashboard',
      component: DashboardLayout,
      meta: { requiresAuth: true},

      children: [
        {
          path: '',
          redirect: '/dashboard/overview',
        },
        {
          path: 'overview',
          name: 'dashboard-overview',
          component: OverviewView,
        },
        {
          path: 'users',
          name: 'dashboard-users',
          component: UsersView,
          meta: { requiresAdmin: true }
        },
        {
          path: 'sitting',
          name: 'sitting',
          component: SittingPage
        },
        {
          path: 'products',
          name: 'product',
          component: ProductPage
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFount
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
  const requiresAdmin = to.matched.some(r => r.meta.requiresAdmin)

  if (requiresAuth && !auth.isLoggedIn) {
    return next({ name: 'login' })
  }

  if (requiresAdmin && auth.userRole !== 'admin') {
    return next({ name: 'unauthorized' })
  }

  next()
});

export default router

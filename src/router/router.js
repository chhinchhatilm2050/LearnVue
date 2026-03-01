import { createRouter, createWebHistory } from 'vue-router'
const HomePage = () => import ('@/views/HomePage.vue');
const AboutPage = () => import('@/views/AboutPage.vue')
const PostList = () => import('@/views/PostList.vue')
const ProductsView = () => import('@/views/ProductsView.vue')
const ProductDetailView = () => import('@/views/ProductDetailView.vue')
const BlogView = () => import('@/views/BlogView.vue')
const BlogPostView = () => import('@/views/BlogPostView.vue')
const ShopView = () => import('@/views/ShopView.vue')
const LoginView = () => import('@/views/LoginView.vue')
const UnauthorizedView = () => import('@/views/UnauthorizedView.vue')
const DashboardLayout = () => import('@/layouts/DashboardLayout.vue')
const OverviewView = () => import('@/views/dashboard/OverviewView.vue')
const UsersView = () => import('@/views/dashboard/UsersView.vue')
const NotFount = () => import('@/views/NotFount.vue')
const ViewShop = () => import('@/views/pinia/ViewShop.vue')
const CartView = () => import('@/views/pinia/CartView.vue')
const SittingPage = () => import('@/views/dashboard/SittingPage.vue')
const ProductPage = () => import('@/views/dashboard/ProductPage.vue')
const BlogViewState = () => import('@/views/BlogViewState.vue')
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

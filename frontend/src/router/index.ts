import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/learn/HomeView.vue'
import LearningView from '@/views/learn/LearningView.vue'
import LoginView from '@/views/admin/LoginView.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
import CategoriesView from '@/views/admin/CategoriesView.vue'
import WordsView from '@/views/admin/WordsView.vue'
import StatsView from '@/views/admin/StatsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/learn/:categoryId',
      name: 'learn',
      component: LearningView,
      props: true,
    },
    {
      path: '/admin/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true },
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/categories',
      name: 'categories',
      component: CategoriesView,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/words',
      name: 'words',
      component: WordsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/stats',
      name: 'stats',
      component: StatsView,
      meta: { requiresAuth: true },
    },
  ],
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
    next({ name: 'login' })
  } else if (to.meta.requiresGuest && authStore.isAuthenticated()) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router

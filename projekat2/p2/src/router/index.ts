import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Gallery from '@/views/Gallery.vue'
import Crtanje from '@/views/Crtanje.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'home',
      component : Home
    },
    {
      path:'/login',
      name:'login',
      component : Login
    },
    {
      path:'/register',
      name:'register',
      component : Register
    },
    {
      path:'/gallery',
      name:'gallery',
      component : Gallery
    },
    
    {
      path:'/new',
      name:'crtanje',
      component : Crtanje
    },
    
    
  ]
})

export default router

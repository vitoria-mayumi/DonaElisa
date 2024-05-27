import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/about',
            component: () => import('../views/About.vue')
        },
        {
            path: '/pratos',
            component: () => import('../views/Pratos.vue')
        },
        {
            path: '/form',
            name: 'Form',
            component: () => import('../components/Pratos_form.vue')
          }
    ]
})

export default router
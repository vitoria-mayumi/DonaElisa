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
            path: '/clientes',
            component: () => import('../views/Clientes.vue')
        },
        {
            path: '/pratos',
            component: () => import('../views/Pratos.vue')
        },
        {
            path: '/categorias_pratos',
            component: () => import('../views/Categorias_Pratos.vue')
        },
        {
            path: '/relatorios',
            component: () => import('../views/Relatorios.vue')
        },
        {
            path: '/usuarios',
            component: () => import('../views/Usuarios.vue')
        }
    ]
})

export default router
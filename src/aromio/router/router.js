import { createRouter, createWebHashHistory } from 'vue-router';
import { userStore } from '../stores/userStore';


//router con rutas protegidas (private y public)
const routes = [
    { 
        path: '/',
        redirect: '/public'
    },
    { 
        path: '/public',
        name: 'public',
        component: () => import('../layouts/PublicLayout.vue'),
        children: [
            {
                path: '',
                name: 'public-home',
                component: () => import('../pages/Home.vue'),
            },
            {
                path: 'shop',
                name: 'public-shop',
                component: () => import('../pages/shop/Shop.vue'),
            },
            {
                path: 'wishlist',
                name: 'public-wishlist',
                component: () => import('../pages/Wishlist.vue'),
            },
            {
                path: 'contact',
                name: 'public-contact',
                component: () => import('../pages/user/forms/Contact.vue'),
            },
            {
                path: 'login',
                name: 'public-login',
                component: () => import('../pages/user/forms/Login.vue'),
            },
            {
                path: 'signup',
                name: 'public-signup',
                component: () => import('../pages/user/forms/Signup.vue'),
            },
            {
                path: ':id',
                name: 'public-id',
                component: () => import('../pages/shop/IndividualProduct.vue'),
                beforeEnter: (to, from, next) => {
                    const id = Number(to.params.id)
                    if (!isNaN(id) && id >= 1 && id <= 20) {
                        next()
                    } else {
                        next({name: 'NotFound404'})
                    }
                }
            },
            {
                path: 'cart',
                name: 'public-cart',
                component: () => import('../pages/shop/CartPage.vue'),
            },
            {
                path: 'FAQ',
                name: 'public-FAQ',
                component: () => import('../pages/FAQ.vue'),
            },
            {
                path: 'ordersHistory',
                name: 'public-ordersHistory',
                component: () => import('../pages/user/userPage/OrdersHistory.vue'),
            },
            {
                path: 'giftCenter',
                name: 'public-giftCenter',
                component: () => import('../pages/GiftCenter.vue'),
            },
        ]
    },
    { 
        path: '/private',
        name: 'private',
        component: () => import('../layouts/PrivateLayout.vue'),
        children: [
            {
                path: 'profile',
                name: 'private-profile',
                component: () => import('../pages/user/userPage/Profile.vue'),
                beforeEnter: (to, from, next) => {
                    const user = userStore()
                    if (user.loggedIn) {
                        next()
                    } else {
                        next({name: 'public-home'})
                    }
                }
            },
            
        ]
    },
    { 
        path: '/:pathMatch(.*)*',
        name: 'NotFound404',
        component: () => import('../shared/NotFound404.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;

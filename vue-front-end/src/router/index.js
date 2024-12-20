import { createRouter, createWebHistory } from 'vue-router';

import UserList from '@/views/UserList.vue';
import UserDetails from '@/views/UserDetails.vue';
import UserCreate from '@/views/UserCreate.vue';

// définition des routes de l'application
const routes = [
    {
        path: '/users',
        name: 'UserList',
        component: UserList
    },
    {
        path: '/users/:id',
        name: 'UserDetails',
        component: UserDetails,
        props: true
    },
    {
        path: '/users/create',
        name: 'UserCreate',
        component: UserCreate
    },
    // {
    //     path: 'users/update/:id',
    //     name: 'UserUpdate',
    //     component: UserUpdate,
    //     props: true
    // }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;
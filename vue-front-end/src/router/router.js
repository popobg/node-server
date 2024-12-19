import { createRouter, createWebHistory } from 'vue-router';
import UserList from './components/UserList.vue'; // Main page
import UserDetails from './components/UserDetails.vue'; // Details page

const routes = [
    {
        path: '/users',
        name: 'UserList',
        component: UserList,
    },
    {
        path: '/users/:id',
        name: 'UserDetails',
        component: UserDetails,
        props: true, // Pass route params as props
    },
    {
        path: '/users/'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
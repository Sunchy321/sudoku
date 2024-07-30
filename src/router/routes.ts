import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path:      '/',
        component: async () => import('layouts/Main.vue'),
        children:  [{ path: '', component: async () => import('pages/Index.vue') }],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path:      '/:catchAll(.*)*',
        component: async () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    // Make sure the server can handle the history mode
    // If not, set it to hash (or delete the mode)
    // More info here: https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
    mode: "hash",
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import(/* webpackChunkName: "home" */ '@/pages/home'),
            meta: {index: 1}
        },
        {
          path: "/home",
          name: "home",
          component: () => import(/* webpackChunkName: "home" */ '@/pages/home'),
          meta: {index: 1}
        },
        {
            path: "/farm",
            name: "farm",
            component: () => import(/* webpackChunkName: "Farm" */ '@/pages/farm'),
            meta: {index: 2}
        },
        {
            path: "/swap",
            name: "swap",
            component: () => import(/* webpackChunkName: "home" */ '@/pages/swap'),
            meta: {index: 3}
        },
        {
            path: "/market",
            name: "market",
            component: () => import(/* webpackChunkName: "market" */ '@/pages/market'),
            meta: {index: 4}
        },
        {
            path: "/mine",
            name: "mine",
            component: () => import(/* webpackChunkName: "mine" */ '@/pages/mine'),
            meta: {index: 5}
        },
        {
            path: "/deposit-detail",
            name: "DepositDetail",
            component: () => import(/* webpackChunkName: "DepoDetail" */ '@/pages/depositDetail'),
            meta: {index: 5}
        },
        {
            path: "/withdrawel-detail",
            name: "WithdrawelDetail",
            component: () => import(/* webpackChunkName: "WithDetail" */ '@/pages/withdrawelDetail'),
            meta: {index: 5}
        },
        {
            path: "/swap-detail",
            name: "SwapDetail",
            component: () => import(/* webpackChunkName: "SwapDetail" */ '@/pages/swapDetail'),
            meta: {index: 5}
        },
        {
            path: "/income-detail",
            name: "IncomeDetail",
            component: () => import(/* webpackChunkName: "IncomeDetail" */ '@/pages/incomeDetail'),
            meta: {index: 5}
        },
        {
          path: "/dao",
          name: "dao",
          component: () => import(/* webpackChunkName: "dao" */ '@/pages/dao'),
          meta: {index: 6}
        },
        {
          path: "/vault",
          name: "vault",
          component: () => import(/* webpackChunkName: "vault" */ '@/pages/vault'),
          meta: {index: 6}
        },
        {
          path: "/*",
          redirect: { path: '/home' },
        },
    ],
    linkActiveClass: "active"
});
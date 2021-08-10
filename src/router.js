import Vue from "vue";
import Router from "vue-router";
import Home from './pages/home'
import Farm from './pages/farm'
import Swap from './pages/swap'
import Dao from './pages/dao'
import Vault from './pages/vault'

Vue.use(Router);

export default new Router({
    // Make sure the server can handle the history mode
    // If not, set it to hash (or delete the mode)
    // More info here: https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
            meta: {index: 1}
        },
        {
          path: "/home",
          name: "home",
          component: Home,
          meta: {index: 1}
        },
        {
            path: "/swap",
            name: "swap",
            component: Swap,
            meta: {index: 5}
        },
        {
            path: "/farm",
            name: "farm",
            component: Farm,
            meta: {index: 3}
        },
        {
          path: "/dao",
          name: "dao",
          component: Dao,
          meta: {index: 4}
        },
        {
          path: "/vault",
          name: "vault",
          component: Vault,
          meta: {index: 4}
        },
        {
          path: "/*",
          redirect: { path: '/home' },
        },
    ],
    linkActiveClass: "active"
});
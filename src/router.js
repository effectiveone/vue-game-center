import { createRouter, createWebHistory } from 'vue-router';

import GamesList from './pages/games/GamesList.vue';
import Snake from './pages/games/Snake.vue';
import Tetris from './pages/games/Tetris.vue';
import Memory from './pages/games/Memory.vue';
import BreakBrics from './pages/games/BreakBrics.vue';
import Ranking from './pages/games/Ranking.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/games' },
    { path: '/ranking', component: Ranking },
    { path: '/games', component: GamesList },
    { path: '/snake', component: Snake },
    { path: '/breakbrics', component: BreakBrics },
    { path: '/tetris', component: Tetris },
    { path: '/memory', component: Memory },
    { path: '/auth', component: UserAuth },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
    // } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    //   next('/games');
  } else {
    next();
  }
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';

import GamesList from './pages/games/GamesList.vue';
import Snake from './pages/games/Snake.vue';
import Racing from './pages/games/Racing.vue';
import Memory from './pages/games/Memory.vue';
import Hangover from './pages/games/Hangover.vue';
import Rubic from './pages/games/Rubic.vue';
import SolarSystem from './pages/games/SolarSystem.vue';

import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/games' },
    { path: '/games', component: GamesList },
    { path: '/snake', component: Snake },
    { path: '/hangman', component: Hangover },

    { path: '/solarsystem', component: SolarSystem },

    { path: '/rubic', component: Rubic },
    { path: '/racing', component: Racing },
    { path: '/memory', component: Memory },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/jobs');
  } else {
    next();
  }
});

export default router;

import { createStore } from 'vuex';

import scoreModule from './modules/score/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  modules: {
    score: scoreModule,
    auth: authModule,
  },
});

export default store;

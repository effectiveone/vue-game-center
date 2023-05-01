import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state: {
    token: null,
    userId: null,
    username: null,
    didAutoLogout: false,
  },
  mutations,
  actions,
  getters,
};

export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.username = payload.username;
    state.didAutoLogout = false;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
};

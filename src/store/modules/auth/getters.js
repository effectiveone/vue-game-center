export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  username(state) {
    return state.username;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};

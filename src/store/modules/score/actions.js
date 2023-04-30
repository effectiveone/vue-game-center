import axios from 'axios';

const actions = {
  async getRanking({ commit, state }) {
    try {
      const response = await axios.get('/api/scoreRoutes/', {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      if (response.status === 200 || response.status === 300) {
        commit('SET_RANKING', response.data);
      }
    } catch (error) {
      console.error(error);
    }
  },
  async getScoreByPlayerId({ commit, state }, playerId) {
    try {
      const response = await axios.get('/api/scoreRoutes/selectedPlayer', {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
        params: {
          playerId,
        },
      });
      if (response.status === 200 || response.status === 300) {
        commit('SET_SELECTED_PLAYER_SCORE', response.data);
      }
    } catch (error) {
      console.error(error);
    }
  },
  async addScore({ dispatch, state }, score) {
    try {
      const response = await axios.post('/api/scoreRoutes/', score, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      if (response.status === 200 || response.status === 300) {
        dispatch('score/getRanking', null, { root: true });
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export default actions;

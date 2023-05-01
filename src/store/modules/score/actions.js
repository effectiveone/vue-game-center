import axios from 'axios';
import store from '../../index.js';

const actions = {
  async getRanking({ commit, state }) {
    try {
      const response = await axios.get('http://localhost:5002/api/score', {
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
      const response = await axios.get(
        'http://localhost:5002/api/score/selectedPlayer',
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
          params: {
            playerId,
          },
        }
      );
      if (response.status === 200 || response.status === 300) {
        commit('SET_SELECTED_PLAYER_SCORE', response.data);
      }
    } catch (error) {
      console.error(error);
    }
  },
  async addScore({ dispatch, rootState }, score) {
    try {
      const token = store.getters.token;

      console.log('token', token);
      const response = await axios.post(
        'http://localhost:5002/api/score',
        score,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 300) {
        dispatch('score/getRanking', null, { root: true });
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export default actions;

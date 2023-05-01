import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import TetrisRankingTable from './TetrisRankingTable.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('TetrisRankingTable.vue', () => {
  let store;
  let scoreModule;

  beforeEach(() => {
    scoreModule = {
      namespaced: true,
      state: {
        ranking: {
          tetris: []
        },
        selectedPlayerScore: null
      },
      actions: {
        getRanking: jest.fn(),
        getScoreByPlayerId: jest.fn()
      }
    };

    store = new Vuex.Store({
      modules: {
        score: scoreModule
      }
    });
  });

  it('renders the ranking table', () => {
    const wrapper = shallowMount(TetrisRankingTable, { store, localVue });
    expect(wrapper.find('.ranking-table').exists()).toBe(true);
  });

  it('renders the table rows with data from the store', () => {
    scoreModule.state.ranking.tetris = [
      { _id: '1', playerId: 'player1', playerName: 'Player 1', time: 12.5, score: 200 },
      { _id: '2', playerId: 'player2', playerName: 'Player 2', time: 17.7, score: 150 }
    ];
    
    const wrapper = shallowMount(TetrisRankingTable, { store, localVue });
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(2);

    const firstRow = rows.at(0);
    expect(firstRow.find('td:nth-child(1)').text()).toBe('1');
    expect(firstRow.find('td:nth-child(2)').text()).toBe('Player 1');
    expect(firstRow.find('td:nth-child(3)').text()).toBe('12.50s');
    expect(firstRow.find('td:nth-child(4)').text()).toBe('200');

    const secondRow = rows.at(1);
    expect(secondRow.find('td:nth-child(1)').text()).toBe('2');
    expect(secondRow.find('td:nth-child(2)').text()).toBe('Player 2');
    expect(secondRow.find('td:nth-child(3)').text()).toBe('17.70s');
    expect(secondRow.find('td:nth-child(4)').text()).toBe('150');
  });

  it('calls getRanking action on component creation', () => {
    shallowMount(TetrisRankingTable, { store, localVue });
    expect(scoreModule.actions.getRanking).toHaveBeenCalled();
  });
});

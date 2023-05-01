import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import SnakeRankingTable from './SnakeRankingTable.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('SnakeRankingTable.vue', () => {
  let store;
  let scoreModule;

  beforeEach(() => {
    scoreModule = {
      namespaced: true,
      state: {
        ranking: {
          snake: [],
        },
        selectedPlayerScore: null,
      },
      actions: {
        getRanking: jest.fn(),
        getScoreByPlayerId: jest.fn(),
      },
    };

    store = new Vuex.Store({
      modules: {
        score: scoreModule,
      },
    });
  });

  it('renders the ranking table', () => {
    const wrapper = shallowMount(SnakeRankingTable, { store, localVue });
    expect(wrapper.find('.ranking-table').exists()).toBe(true);
  });

  it('renders the table rows with data from the store', () => {
    scoreModule.state.ranking.snake = [
      {
        _id: '1',
        playerId: 'player1',
        playerName: 'Player 1',
        time: 10.5,
        score: 100,
      },
      {
        _id: '2',
        playerId: 'player2',
        playerName: 'Player 2',
        time: 15.3,
        score: 80,
      },
    ];

    const wrapper = shallowMount(SnakeRankingTable, { store, localVue });
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(2);

    const firstRow = rows.at(0);
    expect(firstRow.find('td:nth-child(1)').text()).toBe('1');
    expect(firstRow.find('td:nth-child(2)').text()).toBe('Player 1');
    expect(firstRow.find('td:nth-child(3)').text()).toBe('10.50s');
    expect(firstRow.find('td:nth-child(4)').text()).toBe('100');

    const secondRow = rows.at(1);
    expect(secondRow.find('td:nth-child(1)').text()).toBe('2');
    expect(secondRow.find('td:nth-child(2)').text()).toBe('Player 2');
    expect(secondRow.find('td:nth-child(3)').text()).toBe('15.30s');
    expect(secondRow.find('td:nth-child(4)').text()).toBe('80');
  });

  it('calls getRanking action on component creation', () => {
    shallowMount(SnakeRankingTable, { store, localVue });
    expect(scoreModule.actions.getRanking).toHaveBeenCalled();
  });
});

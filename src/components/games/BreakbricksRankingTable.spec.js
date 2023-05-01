import { mount } from '@vue/test-utils';
import BreakbricksRankingTable from './BreakbricksRankingTable.vue';

describe('BreakbricksRankingTable.vue', () => {
  let wrapper;

  beforeEach(() => {
    const ranking = {
      breakbrics: [
        { _id: 1, playerName: 'Player 1', time: 10.0, score: 100 },
        { _id: 2, playerName: 'Player 2', time: 15.0, score: 80 },
        { _id: 3, playerName: 'Player 3', time: 20.0, score: 60 },
        { _id: 4, playerName: 'Player 4', time: 25.0, score: 40 },
        { _id: 5, playerName: 'Player 5', time: 30.0, score: 20 },
      ],
    };
    const selectedPlayerScore = null;
    const getRanking = jest.fn();
    const getScoreByPlayerId = jest.fn();

    wrapper = mount(BreakbricksRankingTable, {
      global: {
        mocks: {
          $store: {
            state: {
              score: {
                ranking,
                selectedPlayerScore,
              },
            },
            dispatch: jest.fn(),
          },
        },
        stubs: ['router-link'],
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the table with ranking data', () => {
    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(5);

    const firstRow = rows[0];
    expect(firstRow.text()).toContain('1');
    expect(firstRow.text()).toContain('Player 1');
    expect(firstRow.text()).toContain('10.00s');
    expect(firstRow.text()).toContain('100');

    const lastRow = rows[4];
    expect(lastRow.text()).toContain('5');
    expect(lastRow.text()).toContain('Player 5');
    expect(lastRow.text()).toContain('30.00s');
    expect(lastRow.text()).toContain('20');
  });

  it('highlights the row for the selected player', async () => {
    // Set the selectedPlayerScore
    wrapper.vm.$store.state.score.selectedPlayerScore = {
      _id: 1,
      playerId: 'abc123',
      playerName: 'Player 1',
      game: 'breakbrics',
      time: 10.0,
      score: 100,
    };

    // Wait for next tick to let the computed property update
    await wrapper.vm.$nextTick();

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(5);

    const firstRow = rows[0];
    const highlighted = firstRow.classes().includes('player-row');
    expect(highlighted).toBe(true);
  });

  it('calls the getRanking method on created hook', () => {
    expect(wrapper.vm.$store.dispatch).toHaveBeenCalledWith('score/getRanking');
  });
});

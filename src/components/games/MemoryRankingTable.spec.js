import { shallowMount } from '@vue/test-utils';
import MemoryRankingTable from '@/components/MemoryRankingTable.vue';

describe('MemoryRankingTable.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(MemoryRankingTable, {
      computed: {
        ranking: () => ({
          memory: [
            { _id: '1', playerName: 'John', time: 5, score: 10 },
            { _id: '2', playerName: 'Jane', time: 10, score: 20 },
            { _id: '3', playerName: 'Bob', time: 8, score: 15 },
          ],
        }),
        selectedPlayerScore: () => null,
      },
      methods: {
        getRanking: jest.fn(),
        getScoreByPlayerId: jest.fn(),
      },
    });
  });

  it('renders the table headers', () => {
    const headers = wrapper.findAll('th').wrappers;
    expect(headers).toHaveLength(4);
    expect(headers[0].text()).toBe('Miejsce');
    expect(headers[1].text()).toBe('Gracz');
    expect(headers[2].text()).toBe('Czas');
    expect(headers[3].text()).toBe('Wynik');
  });

  it('renders the ranking', () => {
    const rankingRows = wrapper.findAll('tbody tr').wrappers;
    expect(rankingRows).toHaveLength(3);
    expect(rankingRows[0].text()).toContain('1');
    expect(rankingRows[0].text()).toContain('John');
    expect(rankingRows[0].text()).toContain('5.00s');
    expect(rankingRows[0].text()).toContain('10');
    expect(rankingRows[1].text()).toContain('2');
    expect(rankingRows[1].text()).toContain('Jane');
    expect(rankingRows[1].text()).toContain('10.00s');
    expect(rankingRows[1].text()).toContain('20');
    expect(rankingRows[2].text()).toContain('3');
    expect(rankingRows[2].text()).toContain('Bob');
    expect(rankingRows[2].text()).toContain('8.00s');
    expect(rankingRows[2].text()).toContain('15');
  });

  it('renders the selected player row', async () => {
    await wrapper.setData({ selectedPlayerScore: { playerId: '2' } });
    const rankingRows = wrapper.findAll('tbody tr').wrappers;
    expect(rankingRows[1].classes()).toContain('player-row');
  });

  it('calls getRanking method when created', () => {
    expect(wrapper.vm.getRanking).toHaveBeenCalled();
  });

  it('does not call getScoreByPlayerId method when created if selectedPlayerScore is null', () => {
    expect(wrapper.vm.getScoreByPlayerId).not.toHaveBeenCalled();
  });

  it('calls getScoreByPlayerId method when created if selectedPlayerScore is not null', () => {
    wrapper = shallowMount(MemoryRankingTable, {
      computed: {
        ranking: () => ({
          memory: [],
        }),
        selectedPlayerScore: () => ({ playerId: '1' }),
      },
      methods: {
        getRanking: jest.fn(),
        getScoreByPlayerId: jest.fn(),
      },
    });

    expect(wrapper.vm.getScoreByPlayerId).toHaveBeenCalled();
  });
});

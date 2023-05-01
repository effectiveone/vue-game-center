<template>
    <div id="app">
      <h1>Games Ranking</h1>
  
      <div class="game-grid">
        <SnakeRankingTable />
        <TetrisRankingTable />
        <BreakbricksRankingTable />
        <MemoryRankingTable />
      </div>
  
      <div v-if="isLoggedIn">
        <h2 style="display: flex; justify-content: center;">Your Scores</h2>

        <div class="game-grid">
          <SnakeRankingTable :showOnlyPlayerData="true" />
<TetrisRankingTable :showOnlyPlayerData="true" />
<BreakbricksRankingTable :showOnlyPlayerData="true" />
<MemoryRankingTable :showOnlyPlayerData="true" />
</div>
</div>

  </div>
</template>
<script>
import SnakeRankingTable from "@/components/games/SnakeRankingTable.vue";
import TetrisRankingTable from "@/components/games/TetrisRankingTable.vue";
import BreakbricksRankingTable from "@/components/games/BreakbricksRankingTable.vue";
import MemoryRankingTable from "@/components/games/MemoryRankingTable.vue";

export default {
  name: "Ranking",
  components: {
    SnakeRankingTable,
    TetrisRankingTable,
    BreakbricksRankingTable,
    MemoryRankingTable,
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.userId;
    },
  },
  mounted() {
    // Fetch the rankings
    this.$store.dispatch("score/getRanking");
    // Fetch the user's scores if they're logged in
    if (this.isLoggedIn) {
      this.$store.dispatch("score/getScoreByPlayerId");
    }
  },
};
</script>
<style scoped>
.game-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 100px;
}
</style>
  
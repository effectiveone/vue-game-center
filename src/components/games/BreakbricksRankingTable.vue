<template>
  <div>
    <h2 class="title">Break Bricks</h2>
    <table class="ranking-table">
      <thead>
        <tr>
          <th>Miejsce</th>
          <th>Gracz</th>
          <th>Czas</th>
          <th>Wynik</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(score, index) in ranking.breakbricks" :key="score._id" :class="{ 'player-row': score.playerId === selectedPlayerScore?.playerId }">
          <td>{{ index + 1 }}</td>
          <td>{{ score.playerName }}</td>
          <td>{{ score.time.toFixed(2) }}s</td>
          <td>{{ score.score }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "BreakbricksRankingTable",

  computed: {
    ...mapState("score", ["ranking", "selectedPlayerScore"]),
  },

  created() {
    this.getRanking();
  },

  methods: {
    ...mapActions("score", ["getRanking", "getScoreByPlayerId"]),
  },
};
</script>

<style scoped>
.ranking-table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
}

.ranking-table th, .ranking-table td {
  border: 1px solid black;
  padding: 10px;
}

.ranking-table th {
  background-color: lightgray;
}

.player-row {
  background-color: lightgray;
}

.title {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}
</style>

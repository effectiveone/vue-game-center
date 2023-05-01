<template>
  <div>
    <h2 class="title">Snake</h2>
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
        <tr v-for="(score, index) in ranking.snake" :key="score._id" :class="{ 'player-row': score.playerId === selectedPlayerScore?.playerId, 'gray-row': index % 2 !== 0 }">
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
    name: "SnakeRankingTable",
  
    computed: {
      ...mapState("score", ["ranking", "selectedPlayerScore"]),
    },
  
    created() {
  this.getRanking();
  console.log(this.$store.state.score.ranking);
},
  
    methods: {
      ...mapActions("score", ["getRanking", "getScoreByPlayerId"]),
    },
  };
  </script>
  
  <style scoped>
  .ranking-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .ranking-table {
  border-collapse: collapse;
  width: 100%;
  max-width: 800px;
  margin: auto;
}

th, td {
  text-align: center;
  padding: 8px;
  border: 1px solid black;
}

.gray-row {
  background-color: gray;
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
  
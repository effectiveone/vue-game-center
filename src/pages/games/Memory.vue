<template>
  <div id="app">
    <h1>Memory Game</h1>
    <div class="panel-game">
      <div>Time: {{ time }}</div>
      <div>Score: {{ score }}</div>
    </div>
    <div id="game-board">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card"
        :style="{ backgroundImage: `url(${card.flipped ? cardImages[card.id] : ''})` }"
        @click="flipCard(card)"
      ></div>
    </div>
    <div v-if="gameIsOver" id="modal">
      <div id="modal-content">
        <h2>Congratulations!</h2>
        <p>Your time: {{ time }} seconds</p>
        <p>Your score: {{ score }}</p>
        <button @click="resetGame">Play Again</button>
      </div>
    </div>
  </div>
</template>


<script>
import { gsap } from 'gsap';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      cardWidth: 100,
      cardHeight: 140,
      cardMargin: 10,
      columns: 4,
      rows: 4,
      cards: [],
      cardImages: [],
      firstCard: null,
      secondCard: null,
      canFlip: true,
      startTime: null,
      time: 0,
      score: 0,
      pairsFound: 0,
      totalPairs: 8,
      gameIsOver: false
    }
  },
  mounted() {
    const cardImages = [];
    let loaded = 0;
    for (let i = 1; i <= 4; i++) {
      const cardImage = `pokemon/pokemon${i}.jpg`;
      cardImages.push(cardImage);
      loaded++;
      if (loaded === 4) {
        this.cardImages = cardImages;
        this.setup();
      }
    }
  },
  methods: {
    ...mapActions(['score/addScore']),
    gameover() {
  this['score/addScore']({
    game: 'memory',
    time: this.time,
    score: this.score
  });
  this.gameIsOver = true;
},
    setup() {
      for (let i = 0; i < this.columns * this.rows / 2; i++) {
        const card1 = this.createCard(i % 4);
        const card2 = this.createCard(i % 4);
        this.cards.push(card1);
        this.cards.push(card2);
      }
      this.shuffleCards();
    },
    resetGame() {
      this.gameIsOver = false;
  this.cards.forEach(card => {
    card.flipped = false;
    card.matched = false;
  });
  this.shuffleCards();
  this.startTime = null;
  this.time = 0;
  this.score = 0;
  this.pairsFound = 0;
  clearInterval(this.interval);
},
    createCard(id) {
      const card = {
        id: id,
        flipped: false
      };
      return card;
    },
    shuffleCards() {
      for (let i = 0; i < this.cards.length; i++) {
        const randomIndex = Math.floor(Math.random() * (this.cards.length - i)) + i;
        [this.cards[i], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[i]];
      }
    },
    flipCard(card) {
      if (!this.canFlip || card.flipped || card.matched || this.gameIsOver) return;
  
      if (!this.startTime) {
    this.startTime = new Date();
    this.startTimer();
  }

  if (!this.firstCard) {
    this.firstCard = card;
    card.flipped = true;
  } else if (!this.secondCard) {
    if (card === this.firstCard) return;
    this.secondCard = card;
    card.flipped = true;
    setTimeout(() => {
      if (this.firstCard.id === this.secondCard.id) {
        // match
        this.firstCard.matched = true;
        this.secondCard.matched = true;
        this.score += 10;
        this.pairsFound++;
        if (this.pairsFound === this.totalPairs) {
          clearInterval(this.interval);
          this.gameover(); // Call the gameover() method after all pairs have been found
        }
      } else {
        // no match
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
      }
      this.firstCard = null;
      this.secondCard = null;
      this.canFlip = true;
    }, 1000);
    this.canFlip = false;
  }
},

    startTimer() {
      this.interval = setInterval(() => {
        const currentTime = new Date();
        this.time = Math.floor((currentTime - this.startTime) / 1000);
      }, 1000);
    },
}
};
</script>



<style>

#app {
  display: grid;
  place-items: center;
}
.panel-game {
  display: flex;
  flex-direction: row;
  padding: 10px, 10px, 10px,10px

}
.game-board {
  position: relative;
  display: grid;
  place-items: center;
}
#modal {
  position: absolute;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

#modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
#game-board {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  justify-content: center;
  width: calc(4 * (100px + 10px));
}



.card {
  width: 100px;
  height: 140px;
  margin: 10px;
  background-color: red;
  background-size: cover;
  background-position: center;
  cursor: pointer;
}
</style>

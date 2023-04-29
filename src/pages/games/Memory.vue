<template>
  <div id="app">
    <h1>Memory Game</h1>
    <div id="game-board">
      <div>
  Time: {{ time }}
</div>
<div>
  Score: {{ score }}
</div>
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card"
        :style="{ backgroundImage: `url(${card.flipped ? cardImages[card.id] : ''})` }"
        @click="flipCard(card)"
      >
      </div>
    </div>
  </div>
</template>
<style>
#game-board {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
<script>
import { gsap } from 'gsap';

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
    setup() {
      for (let i = 0; i < this.columns * this.rows / 2; i++) {
        const card1 = this.createCard(i % 4);
        const card2 = this.createCard(i % 4);
        this.cards.push(card1);
        this.cards.push(card2);
      }
      this.shuffleCards();
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
      if (!this.canFlip || card.flipped || card.matched) return;

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




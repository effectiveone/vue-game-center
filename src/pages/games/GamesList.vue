<template>
  <div class="grid">
    <div class="grid-item" @click="goToGame('snake')">
      <img :src="snakeImage" alt="Snake">
      <div class="overlay">
        <p>Snake</p>
      </div>
    </div>
    <div class="grid-item" @click="goToGame('memory')">
      <img :src="memoryImage" alt="Memory">
      <div class="overlay">
        <p>Memory Match</p>
      </div>
    </div>
    <div class="grid-item" @click="goToGame('racing')">
      <img :src="racingImage" alt="Racing">
      <div class="overlay">
        <p>Speed Racer</p>
      </div>
    </div>
    <div class="grid-item" @click="goToGame('hangman')">
      <img :src="hangmanImage" alt="Hangman">
      <div class="overlay">
        <p>Hangman</p>
      </div>
    </div>
  </div>
</template>

<script>
import snakeImage from '@/assets/snake.png';
import memoryImage from '@/assets/memory.png';
import racingImage from '@/assets/racing.png';
import hangmanImage from '@/assets/hangman.png';

export default {
  data() {
    return {
      snakeImage,
      memoryImage,
      racingImage,
      hangmanImage,
    };
  },
  methods: {
    goToGame(game) {
      this.$router.push(`/${game}`);
    },
  },
};
</script>



<style>
.grid {

  display: grid;
  place-items: center;
  padding-top: 1rem;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.grid-item {
  position: relative;
  width: 400px;
  height: 400px;
  cursor: pointer;
  overflow: hidden;
}

.grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.grid-item:hover .overlay {
  opacity: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.overlay p {
  font-size: 2rem;
}
</style>

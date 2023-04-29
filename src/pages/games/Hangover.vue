<template>
    <div>
      <h1>Gra w wisielca</h1>
      <div class="word">
        {{ hiddenWord }}
      </div>
      <div class="guesses">
        <p>Zgadywane litery: {{ guessedLetters.join(', ') }}</p>
        <p>Niepoprawne odpowiedzi: {{ wrongGuesses }}</p>
      </div>
      <div class="input">
        <label for="guess">Zgadnij literę:</label>
        <input type="text" v-model="guess" @keydown.enter="makeGuess">
        <button @click="makeGuess">Zgadnij</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        word: "wisielec",
        hiddenWord: "",
        guessedLetters: [],
        wrongGuesses: 0,
        guess: "",
      };
    },
    methods: {
      makeGuess() {
        const letter = this.guess.toLowerCase();
        if (letter.length === 1 && /^[a-zA-Z]$/.test(letter)) {
          if (!this.guessedLetters.includes(letter)) {
            this.guessedLetters.push(letter);
            if (this.word.includes(letter)) {
              this.hiddenWord = this.word
                .split("")
                .map((char) =>
                  this.guessedLetters.includes(char) ? char : "_"
                )
                .join("");
              if (this.hiddenWord === this.word) {
                alert("Brawo! Odgadłeś słowo!");
              }
            } else {
              this.wrongGuesses += 1;
              if (this.wrongGuesses === 6) {
                alert("Przegrałeś! Słowo to: " + this.word);
              }
            }
          }
        }
        this.guess = "";
      },
    },
    created() {
      this.hiddenWord = this.word.replace(/[a-zA-Z]/g, "_");
    },
  };
  </script>
  
  <style>
  .word {
    font-size: 2em;
    margin: 1em 0;
  }
  
  .input {
    margin-top: 1em;
  }
  
  .guesses {
    margin-top: 1em;
  }
  
  </style>
  
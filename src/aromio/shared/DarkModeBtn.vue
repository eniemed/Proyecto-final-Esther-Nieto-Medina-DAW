<template>
  <section>
    <button class="btn" @click="cambiarMode(false)"><img src="../../assets/sol.svg" alt="Light mode on"></button>
    <button class="btn" @click="cambiarMode(true)"><img src="../../assets/luna.svg" alt="Dark mode on"></button>
  </section>
</template>

<script>
import { darkMode } from '../stores/darkMode';

export default {
  methods: {
    cambiarMode(state) {
      const dark = darkMode()
      dark.activateDarkMode(state)
    }
  }
}
</script>

<style scoped>
section {
  width: 100px;
  margin-left: 2.5vh;
  display: flex;
  margin-top: 1vh;
  background-color: rgb(255, 255, 255);
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  height: 4vh;
}

.btn {
  width: 5vh;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s;
}

.btn:hover {
  transform: scale(1.2);
}

img {
  background-color: transparent;
}
</style>

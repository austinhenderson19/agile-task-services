<template>
  <div class="container">
    <welcome-message v-if="showWelcomeMessage" @finsihedAnimation="removeWelcomeMessage"></welcome-message>
    <div v-if="!showWelcomeMessage" class="inner-container">
      <div class="input-container" id="main-input">
        <label class="block" for="type" :style="{backgroundColor: typeColor}"></label>
        <select name="type" id="type" v-model="selectedType">
          <option value="1">Epic</option>
          <option value="2">Story</option>
          <option value="3">Bug</option>
        </select>
        <input type="text" :placeholder="placeholderText" />
      </div>
      <div class="list"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WelcomeMessage from "../components/WelcomeMessage.vue";

export default Vue.extend({
  components: {
    "welcome-message": WelcomeMessage,
  },
  data() {
    return {
      showWelcomeMessage: true,
      selectedType: 1,
    };
  },
  methods: {
    removeWelcomeMessage() {
      this.showWelcomeMessage = false;
    },
  },
  computed: {
    typeColor() {
      if (this.selectedType == 1) {
        return "#904EE2";
      }

      if (this.selectedType == 2) {
        return "#63BA3C";
      }

      if (this.selectedType == 3) {
        return "#FD6666";
      }
    },
    placeholderText() {
      if (this.selectedType == 1) {
        return "What would you like to call your Epic?";
      }

      if (this.selectedType == 2) {
        return "What will your Story be called?";
      }

      if (this.selectedType == 3) {
        return "What Bug will you be squashing?";
      }
    },
  },
});
</script>

<style scoped >
.container {
  margin: 0 auto;
  min-height: 100vh;
}

.inner-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inner-container input {
  width: 100%;
  height: 100%;
  flex: 1;
  font-size: 1rem;
}

.inner-container input:hover,
.inner-container input:active,
.inner-container input:focus,
.inner-container input {
  border: none;
  outline: none;
}

.input-container {
  height: 3rem;
  width: 90%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  border-radius: 1rem;
  overflow: hidden;
}

.block {
  flex: 0 0 15%;
  height: 100%;
  width: 100%;
  transition: background-color 0.5s ease;
}

#type {
  position: absolute;
  top: -50rem;
}

#main-input {
  opacity: 0;
  animation: fade-in 1s ease-in;
  animation-fill-mode: forwards;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>

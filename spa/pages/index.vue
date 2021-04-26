<template>
  <div class="container">
    <welcome-message v-if="showWelcomeMessage" @finsihedAnimation="removeWelcomeMessage"></welcome-message>
    <div v-if="!showWelcomeMessage" class="inner-container">
      <div
        style="width: 100%; flex: 0 0 50%; display: flex; justifiy-content: center; align-items: flex-end; padding-bottom: 2rem"
      >
        <div class="input-container" id="main-input">
          <label class="block" for="type" :style="{backgroundColor: typeColor}"></label>
          <select name="type" id="type" v-model="selectedType">
            <option
              v-for="taskType in taskTypes"
              :key="taskType.id"
              :value="taskType.type"
            >{{ taskType.description }}</option>
          </select>
          <input
            v-model="description"
            type="text"
            :placeholder="placeholderText"
            @keydown.enter="createNewPost"
          />
        </div>
      </div>
      <div style="height: 100%; width: 90%; overflow: scroll">
        <task-list :tasks="tasks"></task-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WelcomeMessage from "../components/WelcomeMessage.vue";
import TaskList from "../components/TaskList.vue";
import axios from "axios";
import { Plugins } from "@capacitor/core";

export default Vue.extend({
  components: {
    "welcome-message": WelcomeMessage,
    "task-list": TaskList,
  },
  data(): {
    showWelcomeMessage: boolean;
    selectedType: number;
    description: string;
    tasks: { type: number | string; description: string }[];
    taskTypes: { type: number | string; description: string }[];
  } {
    return {
      showWelcomeMessage: true,
      selectedType: 1,
      description: "",
      tasks: [],
      taskTypes: [],
    };
  },
  methods: {
    removeWelcomeMessage() {
      this.showWelcomeMessage = false;
    },
    createNewPost() {
      const body = { type: this.selectedType, description: this.description };
      const data = new FormData();
      data.append("json", JSON.stringify(body));

      if (body) {
        this.tasks.unshift(body);
      }

      this.description = "";

      axios.post("http://localhost:4000", { ...body });
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

      if (this.selectedType == 4) {
        return "#a8e0ec";
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

      if (this.selectedType == 4) {
        return "What Task would you like completed?";
      }
    },
  },
  mounted() {
    Plugins.Keyboard.setAccessoryBarVisible({ isVisible: true });

    fetch("http://localhost:4000")
      .then((val) => val.json())
      .then((val) => (this.tasks = val.data.reverse()));

    fetch("http://localhost:4001")
      .then((val) => val.json())
      .then((val) => (this.taskTypes = val.data));
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: fade-in 1s ease-in;
  animation-fill-mode: forwards;
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
  margin: 0 auto;
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
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>

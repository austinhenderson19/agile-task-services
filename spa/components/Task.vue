<template>
  <div class="task">
    <div class="box" :style="{backgroundColor: backgroundTypeColor}"></div>
    <div class="description">{{ task.description }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["task"],
  computed: {
    backgroundTypeColor() {
      if (this.task.type == 1) {
        return "#904EE2";
      }

      if (this.task.type == 2) {
        return "#63BA3C";
      }

      if (this.task.type == 3) {
        return "#FD6666";
      }
    },
  },
});
</script>

<style scoped>
.task {
  height: 3rem;
  display: flex;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
  overflow: hidden;
  color: rgba(43, 43, 67, 0.797);
}

.box {
  flex: 0 0 15%;
  height: 4rem;
  width: 4rem;
  max-height: 100%;
  margin-right: 1rem;
}
</style>
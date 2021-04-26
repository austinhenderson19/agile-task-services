<template>
  <div style="width: 100%">
    <div class="task" v-for="taskItem in tasks" :key="taskItem.id">
      <task :task="taskItem"></task>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Task from "./Task.vue";

export default Vue.extend({
  props: ["tasks"],
  components: {
    task: Task,
  },
});
</script>

<style scoped>
.task {
  width: 100%;
  margin: 0.5rem 0rem;
}
</style>
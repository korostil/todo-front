<script setup>
import TaskList from "@/components/TaskList.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <task-list />
  <div>
    <button
      class="btn yellow"
      @click="router.push({ name: 'completed_tasks' })"
    >
      Completed tasks
    </button>
    <button
      class="btn green new-task"
      @click="router.push({ name: 'new_task' })"
    >
      + task
    </button>
  </div>
</template>

<style scoped>
.new-task {
  display: inline;
  float: right;
}
</style>

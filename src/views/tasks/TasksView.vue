<script setup>
import TaskList from "@/components/TaskList.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <task-list />
  <div>
    <button class="btn green" @click="router.push({ name: 'new_task' })">
      + task
    </button>
  </div>
  <div>
    <button class="btn green" @click="router.push({ name: 'tasks_list' })">
      show tasks list
    </button>
  </div>
  <div>
    <button class="btn green" @click="router.push({ name: 'daily_review' })">
      make daily review
    </button>
  </div>
</template>

<style scoped></style>

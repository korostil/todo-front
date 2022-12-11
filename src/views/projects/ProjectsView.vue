<script setup>
import ProjectList from "@/components/ProjectList.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <project-list />
  <div>
    <button class="btn orange" @click="router.push({ name: 'new_project' })">
      + project
    </button>
    <button class="btn orange" @click="router.push({ name: 'project_list' })">
      project list
    </button>
    <button class="btn orange" @click="router.push({ name: 'goal_list' })">
      goal list
    </button>
    <button class="btn green" @click="router.push({ name: 'task_list' })">
      show task list
    </button>
    <button class="btn green" @click="router.push({ name: 'daily_review' })">
      make daily review
    </button>
  </div>
</template>

<style scoped></style>

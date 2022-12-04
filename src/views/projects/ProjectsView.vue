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
    <button class="btn orange" @click="router.push({ name: 'projects_list' })">
      projects list
    </button>
    <button class="btn orange" @click="router.push({ name: 'goals_list' })">
      goals list
    </button>
  </div>
</template>

<style scoped></style>

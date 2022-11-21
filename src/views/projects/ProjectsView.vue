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
  </div>
</template>

<style scoped></style>

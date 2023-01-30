<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <v-btn
    variant="plain"
    prepend-icon="mdi-plus"
    @click="router.push({ name: 'new_task' })"
  >
    new task
  </v-btn>
</template>

<style scoped></style>

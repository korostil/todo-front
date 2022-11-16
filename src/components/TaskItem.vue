<script setup>
defineProps({
  task: Object,
});
</script>

<template>
  <div class="task">
    <div class="title">{{ task.title }}</div>
    <div class="description">{{ task.description }}</div>
  </div>
</template>

<style scoped></style>

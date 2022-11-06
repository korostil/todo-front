<script setup>
defineProps({
  task: Object,
});
</script>

<template>
  <div class="task">
    <div class="title">{{ task.title }}</div>
    <div class="subtitle">{{ task.subtitle }}</div>
  </div>
</template>

<style scoped>
.task {
  display: block;
  padding: 16px;
  max-width: 512px;
  min-width: 512px;
}
.task:hover {
  background-color: #eee;
  cursor: pointer;
}
.title {
  font-weight: bold;
  font-size: 1.5em;
}
.subtitle {
  font-size: 1em;
}
</style>

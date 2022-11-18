<script setup>
defineProps({
  task: Object,
});
</script>

<template>
  <div>
    <router-link :to="{ name: 'task', params: { task_id: task.id } }">
      <div>{{ task.title }}</div>
    </router-link>
    <div>{{ task.description }}</div>
  </div>
</template>

<style scoped></style>

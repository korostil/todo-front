<script setup>
defineProps({
  project: Object,
});
</script>

<template>
  <div class="project">
    <div class="title">{{ project.title }}</div>
  </div>
</template>

<style scoped>
.project {
  display: block;
  padding: 8px 16px;
  max-width: 128px;
  min-width: 128px;
}
.project:hover {
  background-color: #eee;
  cursor: pointer;
}
</style>

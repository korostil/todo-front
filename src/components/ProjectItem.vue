<script setup>
defineProps({
  project: Object,
});
</script>

<template>
  <div>
    <router-link :to="{ name: 'project', params: { project_id: project.id } }">
      {{ project.title }}
    </router-link>
  </div>
</template>

<style scoped></style>

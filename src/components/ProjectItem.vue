<script setup>
defineProps({
  project: Object,
});
</script>

<template>
  <div>
    <router-link
      class="project"
      :to="{ name: 'project', params: { project_id: project.id } }"
    >
      {{ project.title }}
    </router-link>
  </div>
</template>

<style scoped>
.project {
  padding: 8px 16px;
  font-size: large;
  color: #ffffff;
  text-decoration: none;
  display: inline-block;
  width: calc(100% - 32px);
  height: 100%;
}
.project:hover {
  background-color: #363636;
}
</style>

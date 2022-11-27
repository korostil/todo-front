<script setup>
import { ref } from "vue";

const props = defineProps({
  project: Object,
});
const color = ref(props.project.color);
</script>

<template>
  <div>
    <router-link
      class="project"
      :to="{ name: 'project', params: { project_id: project.id } }"
    >
      <div class="project-color" :style="{ backgroundColor: color }"></div>
      <div class="project-title">{{ project.title }}</div>
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
.project-color {
  width: 16px;
  height: 16px;
  margin-right: 4px;
  display: inline-block;
  border-radius: 50%;
}
.project-title {
  display: inline-block;
}
</style>

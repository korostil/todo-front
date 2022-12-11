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
      <label class="project-title">{{ project.title }}</label>
      <div class="project-color" :style="{ backgroundColor: color }"></div>
    </router-link>
  </div>
</template>

<style scoped>
.project {
  padding: 8px 8px 8px 16px;
  font-size: 0.85em;
  color: #ffffff;
  text-decoration: none;
  display: inline-block;
  height: 100%;
}
.project:hover {
  background-color: #363636;
}
.project-color {
  width: 12px;
  height: 12px;
  margin-left: 8px;
  display: inline-block;
  border-radius: 50%;
}
.project-title {
  display: inline;
}
</style>

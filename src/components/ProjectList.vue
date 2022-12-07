<script setup>
import ProjectItem from "@/components/ProjectItem.vue";
import { ref, onMounted } from "vue";
import { readProjectList } from "@/store/api/projects";

const projects = ref(null);
const loading = ref(true);

function fetchProjects() {
  return readProjectList({})
    .then((json) => {
      projects.value = json.data;
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}

onMounted(() => {
  fetchProjects();
});
</script>

<template>
  <div v-if="!loading && projects && projects.length">
    <project-item
      v-for="project in projects"
      :project="project"
      :key="project.id"
    />
  </div>
</template>

<style scoped></style>

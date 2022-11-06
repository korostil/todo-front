<script setup>
import ProjectItem from "@/components/ProjectItem.vue";
import { ref, onMounted } from "vue";

// TODO move variables to one shared place
const todo_api_url = import.meta.env.VITE_TODO_API_URL;
const todo_api_token = import.meta.env.VITE_TODO_API_TOKEN;

const projects = ref(null);
const loading = ref(true);

function fetchProjects() {
  let url = todo_api_url + "/api/private/v1/projects/",
    token = "Bearer " + todo_api_token;
  return fetch(url, {
    method: "get",
    headers: { "content-type": "application/json", Authorization: token },
  })
    .then((res) => {
      if (!res.ok) {
        const error = new Error(res.statusText);
        error.json = res.json();
        throw error;
      }

      return res.json();
    })
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
  <div>
    <project-item
      v-for="project in projects"
      :project="project"
      :key="project.id"
    />
  </div>
</template>

<style scoped></style>

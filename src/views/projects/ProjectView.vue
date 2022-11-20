<script setup>
// TODO move variables to one shared place
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const todo_api_url = import.meta.env.VITE_TODO_API_URL;
const todo_api_token = import.meta.env.VITE_TODO_API_TOKEN;

const route = useRoute();
const router = useRouter();

const project_id = route.params.project_id;
let fetch_url = todo_api_url + "/api/private/v1/projects/" + project_id + "/",
  delete_url = todo_api_url + "/api/private/v1/projects/" + project_id + "/",
  token = "Bearer " + todo_api_token;

const project = ref(null);
const loading = ref(true);

function fetchProject() {
  return fetch(fetch_url, {
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
      project.value = json.data;
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}

function deleteProject() {
  fetch(delete_url, {
    method: "delete",
    headers: { "content-type": "application/json", Authorization: token },
  })
    .then((res) => {
      if (res.status !== 204) {
        const error = new Error(res.statusText);
        error.json = res.json();
        throw error;
      }
    })
    .then(() => {
      router.push({ name: "main" });
    })
    .catch(() => {
      console.log("error");
    });
}

onMounted(() => {
  fetchProject();
});
</script>

<template>
  <div v-if="!loading && project">
    <h1>{{ project.title }}</h1>

    <button
      @click="
        router.push({
          name: 'update_project',
          params: { project_id: project.id },
        })
      "
    >
      Update
    </button>
    <button @click="deleteProject">Delete</button>
  </div>
</template>

<style scoped></style>

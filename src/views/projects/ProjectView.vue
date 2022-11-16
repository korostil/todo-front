<script setup>
// TODO move variables to one shared place
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const todo_api_url = import.meta.env.VITE_TODO_API_URL;
const todo_api_token = import.meta.env.VITE_TODO_API_TOKEN;

const route = useRoute();

const project_id = route.params.project_id;
let url = todo_api_url + "/api/private/v1/projects/" + project_id + "/",
  token = "Bearer " + todo_api_token;

const project = ref(null);
const loading = ref(true);

function fetchProject() {
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
      project.value = json.data;
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}

onMounted(() => {
  fetchProject();
});
</script>

<template>
  <div v-if="!loading && project">
    <h1>{{ project.title }}</h1>

    <button>Update</button>
    <button>Delete</button>
  </div>
</template>

<style scoped></style>

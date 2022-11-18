<script setup>
// TODO move variables to one shared place
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const todo_api_url = import.meta.env.VITE_TODO_API_URL;
const todo_api_token = import.meta.env.VITE_TODO_API_TOKEN;

const route = useRoute();
const router = useRouter();

const task_id = route.params.task_id;
let fetch_url = todo_api_url + "/api/private/v1/tasks/" + task_id + "/",
  delete_url = todo_api_url + "/api/private/v1/tasks/" + task_id + "/",
  token = "Bearer " + todo_api_token;

const task = ref(null);
const loading = ref(true);

function fetchTask() {
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
      task.value = json.data;
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}

function deleteTask() {
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
  fetchTask();
});
</script>

<template>
  <div v-if="!loading && task">
    <h1>{{ task.title }}</h1>

    <button>Update</button>
    <button @click="deleteTask">Delete</button>
  </div>
</template>

<style scoped></style>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// TODO move variables to one shared place
const todo_api_url = import.meta.env.VITE_TODO_API_URL;
const todo_api_token = import.meta.env.VITE_TODO_API_TOKEN;

const route = useRoute();
const router = useRouter();

const task_id = route.params.task_id;
const loading = ref(true);
const title = ref(null);
let action_url = null;
let task = ref(null);
let token = "Bearer " + todo_api_token;

if (task_id) {
  action_url = todo_api_url + "/api/private/v1/tasks/" + task_id + "/";
  fetchTask().then(() => {
    title.value = task.value.title;
  });
} else {
  action_url = todo_api_url + "/api/private/v1/tasks/";
}

function createTask() {
  return fetch(action_url, {
    method: "post",
    body: JSON.stringify({
      title: title.value,
      description: "foo description",
      space: 1,
    }),
    headers: { "content-type": "application/json", Authorization: token },
  })
    .then((res) => {
      if (res.status !== 201) {
        const error = new Error(res.statusText);
        error.json = res.json();
        throw error;
      }

      return res.json();
    })
    .then((json) => {
      router.push({ name: "task", params: { task_id: json.data.id } });
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}

function updateTask() {
  return fetch(action_url, {
    method: "put",
    body: JSON.stringify({
      title: title.value,
    }),
    headers: { "content-type": "application/json", Authorization: token },
  })
    .then((res) => {
      if (res.status !== 200) {
        const error = new Error(res.statusText);
        error.json = res.json();
        throw error;
      }

      return res.json();
    })
    .then((json) => {
      router.push({ name: "task", params: { task_id: json.data.id } });
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}

function fetchTask() {
  return fetch(action_url, {
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
</script>

<template>
  <input v-model="title" placeholder="Title" />
  <div v-if="task_id">
    <button @click="updateTask">Update</button>
  </div>
  <div v-else>
    <button @click="createTask">Save</button>
  </div>
</template>

<style scoped></style>

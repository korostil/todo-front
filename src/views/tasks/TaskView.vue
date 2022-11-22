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
  complete_url =
    todo_api_url + "/api/private/v1/tasks/" + task_id + "/complete/",
  reopen_url = todo_api_url + "/api/private/v1/tasks/" + task_id + "/reopen/",
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

function completeTask() {
  fetch(complete_url, {
    method: "post",
    headers: { "content-type": "application/json", Authorization: token },
  })
    .then((res) => {
      if (res.status !== 200) {
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

function reopenTask() {
  fetch(reopen_url, {
    method: "post",
    headers: { "content-type": "application/json", Authorization: token },
  })
    .then((res) => {
      if (res.status !== 200) {
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
  <div>
    <div>
      <button class="btn purple" @click="router.push({ name: 'main' })">
        Back to mainpage
      </button>
    </div>
    <div v-if="!loading && task">
      <h1>{{ task.title }}</h1>
      <div>
        <strong>{{ task.description }}</strong>
      </div>
      <div>
        <strong>Decisive: {{ task.decisive }}</strong>
      </div>
      <div>
        <strong>Space: {{ task.space }}</strong>
      </div>
      <div>
        <strong>Due: {{ task.due }}</strong>
      </div>
      <div>
        <strong>Project: {{ task.project_id }}</strong>
      </div>

      <div v-if="task.is_completed">
        <button class="btn green" @click="reopenTask">Reopen</button>
      </div>
      <div v-else>
        <button class="btn green" @click="completeTask">Complete</button>
      </div>
      <div>
        <button
          class="btn orange"
          @click="
            router.push({
              name: 'update_task',
              params: { task_id: task.id },
            })
          "
        >
          Update
        </button>
      </div>
      <div>
        <button class="btn red" @click="deleteTask">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

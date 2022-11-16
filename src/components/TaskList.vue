<script setup>
import TaskItem from "@/components/TaskItem.vue";
import { ref, onMounted } from "vue";

// TODO move variables to one shared place
const todo_api_url = import.meta.env.VITE_TODO_API_URL;
const todo_api_token = import.meta.env.VITE_TODO_API_TOKEN;

const tasks = ref(null);
const loading = ref(true);

function fetchTasks() {
  let url = todo_api_url + "/api/private/v1/tasks/",
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
      tasks.value = json.data;
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}

onMounted(() => {
  fetchTasks();
});
</script>

<template>
  <div v-if="!loading && tasks && tasks.length">
    <task-item v-for="task in tasks" :task="task" :key="task.id" />
  </div>
</template>

<style scoped></style>

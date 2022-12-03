<script setup>
import TaskItem from "@/components/TaskItem.vue";
import { ref, onMounted, watch } from "vue";

// TODO move variables to one shared place
const todo_api_url = import.meta.env.VITE_TODO_API_URL;
const todo_api_token = import.meta.env.VITE_TODO_API_TOKEN;

const tasks = ref(null);
const loading = ref(true);
const space_ref = ref(null);

function fetchTasks(space) {
  let url = todo_api_url + "/api/private/v1/tasks/?completed=false",
    token = "Bearer " + todo_api_token;
  if (space !== null && space !== "null") {
    url = url + "&space=" + space;
  }
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
  fetchTasks(null);
});
watch(space_ref, () => {
  fetchTasks(space_ref.value);
});
</script>

<template>
  <div>
    <input type="radio" value="null" v-model="space_ref" />
    <label for="null">Both</label>
    <input type="radio" value="1" v-model="space_ref" />
    <label for="one">Personal space</label>
    <input type="radio" value="2" v-model="space_ref" />
    <label for="two">Work space</label>
  </div>
  <div v-if="!loading && tasks && tasks.length">
    <task-item v-for="task in tasks" :task="task" :key="task.id" />
  </div>
</template>

<style scoped></style>

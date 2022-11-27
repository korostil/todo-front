<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  task: Object,
});

const todo_api_url = import.meta.env.VITE_TODO_API_URL;
const todo_api_token = import.meta.env.VITE_TODO_API_TOKEN;

const project = ref(null);
const loading = ref(true);

function fetchProject() {
  if (props.task.project_id) {
    let fetch_url =
        todo_api_url +
        "/api/private/v1/projects/" +
        props.task.project_id +
        "/",
      token = "Bearer " + todo_api_token;
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
  } else {
    loading.value = false;
  }
}

onMounted(() => {
  fetchProject();
});
</script>

<template>
  <div>
    <router-link
      class="task"
      :to="{ name: 'task', params: { task_id: task.id } }"
      :class="{ completed: task.is_completed, decisive: task.decisive }"
    >
      <div>
        <div class="task-title">{{ task.title }}</div>
        <div class="task-description">{{ task.description }}</div>
      </div>
      <div v-if="!loading && project">
        <strong :style="{ color: project.color }">{{ project.title }}</strong>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.decisive {
  background-color: rgba(249, 38, 114, 0.3);
}
.task {
  padding: 8px 16px;
  text-decoration: none;
  display: inline-block;
  width: calc(100% - 32px);
  height: 100%;
}
.task:hover {
  background-color: #363636;
}
.task-title {
  font-size: large;
  color: white;
}
.task-description {
  color: #888a85;
}
.completed {
  text-decoration: line-through;
  text-decoration-color: white;
}
</style>

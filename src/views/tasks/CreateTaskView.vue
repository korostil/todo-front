<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// TODO move variables to one shared place
const todo_api_url = import.meta.env.VITE_TODO_API_URL;
const todo_api_token = import.meta.env.VITE_TODO_API_TOKEN;

const route = useRoute();
const router = useRouter();

const task_id = route.params.task_id;
const loading = ref(true);
let action_url = null;
let task = ref({
  title: null,
  description: null,
  space: null,
  due: null,
  project_id: null,
});
const projects = ref(null);
let token = "Bearer " + todo_api_token;

if (task_id) {
  action_url = todo_api_url + "/api/private/v1/tasks/" + task_id + "/";
  fetchTask();
} else {
  action_url = todo_api_url + "/api/private/v1/tasks/";
}

function handle_project_id() {
  if (task.value.project_id === "null") {
    task.value.project_id = null;
  }
}

function createTask() {
  handle_project_id();
  return fetch(action_url, {
    method: "post",
    body: JSON.stringify(task.value),
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
  handle_project_id();
  return fetch(action_url, {
    method: "put",
    body: JSON.stringify(task.value),
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
    <div>
      <button class="btn purple" @click="router.push({ name: 'main' })">
        Back to mainpage
      </button>
    </div>
    <h1 v-if="task_id">Update task</h1>
    <h1 v-else>New task</h1>

    <div>
      <input v-model="task.title" placeholder="Title" type="text" />
    </div>
    <div>
      <input v-model="task.description" placeholder="Description" type="text" />
    </div>
    <div>
      <input v-model="task.decisive" placeholder="Decisive" type="checkbox" />
      <label>Decisive</label>
    </div>
    <div>
      <input type="radio" value="1" v-model="task.space" />
      <label for="one">Personal space</label>

      <input type="radio" value="2" v-model="task.space" />
      <label for="two">Work space</label>
    </div>
    <div>
      <input
        class="task-due"
        v-model="task.due"
        placeholder="Due"
        type="datetime-local"
      />
    </div>
    <div>
      <select class="task-project" v-model="task.project_id">
        <option value="null">With no project</option>
        <option
          v-for="project in projects"
          :value="project.id"
          :key="project.id"
        >
          {{ project.title }}
        </option>
      </select>
    </div>

    <div v-if="task_id">
      <button class="btn orange" @click="updateTask">Update</button>
    </div>
    <div v-else>
      <button class="btn green" @click="createTask">Save</button>
    </div>
  </div>
</template>

<style scoped>
.task-project {
  padding: 8px;
  margin: 8px 0;
  width: 320px;
}
.task-due {
  padding: 4px 8px;
  margin: 8px 0;
  width: 300px;
}
</style>

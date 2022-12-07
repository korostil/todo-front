<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createTask, readTask, updateTask } from "@/store/api/tasks";
import { readProjectList } from "@/store/api/projects";

const route = useRoute();
const router = useRouter();

const task_id = route.params.task_id;
const loading = ref(true);

let task = ref({
  title: null,
  description: null,
  space: null,
  due: null,
  project_id: null,
});
const projects = ref(null);

if (task_id) {
  fetchTask();
}

function handle_project_id() {
  if (task.value.project_id === "null") {
    task.value.project_id = null;
  }
}

function doCreate() {
  handle_project_id();
  return createTask(task.value)
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

function doUpdate() {
  handle_project_id();
  return updateTask(task_id, task.value)
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
  return readTask(task_id)
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
  return readProjectList({})
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
      <button class="btn orange" @click="doUpdate">Update</button>
    </div>
    <div v-else>
      <button class="btn green" @click="doCreate">Save</button>
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

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createTask, readTask, updateTask } from "@/store/api/tasks";
import { readProjectList } from "@/store/api/projects";
import TheHeader from "@/components/TheHeader.vue";

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
  <v-app id="app">
    <the-header></the-header>

    <v-main>
      <v-container>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6">
            <v-sheet rounded="lg" min-height="268">
              <v-container>
                <h1 v-if="task_id">Update task</h1>
                <h1 v-else>New task</h1>

                <v-text-field
                  color="grey-darken-2"
                  label="Title"
                  v-model="task.title"
                ></v-text-field>
                <v-text-field
                  color="grey-darken-2"
                  label="Description"
                  v-model="task.description"
                ></v-text-field>
                <v-checkbox
                  label="Decisive"
                  v-model="task.decisive"
                ></v-checkbox>
                <v-btn-toggle v-model="task.space" active-color="primary">
                  <v-btn icon="mdi-account"></v-btn>
                  <v-btn icon="mdi-domain"></v-btn>
                </v-btn-toggle>

                <!-- TODO due field -->
                <!-- TODO project field -->
                <v-btn v-if="project_id" @click="doUpdate">Update</v-btn>
                <v-btn v-else @click="doCreate">Save</v-btn>
              </v-container>
            </v-sheet>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>

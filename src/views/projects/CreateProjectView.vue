<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  createProject,
  readProject,
  updateProject,
} from "@/store/api/projects";

const route = useRoute();
const router = useRouter();

const project_id = route.params.project_id;
const loading = ref(true);

let project = ref({
  title: null,
  description: null,
  color: null,
  goal_id: null,
  space: null,
});

if (project_id) {
  fetchProject();
}

function doCreate() {
  return createProject(project.value)
    .then((json) => {
      router.push({ name: "project", params: { project_id: json.data.id } });
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}

function doUpdate() {
  return updateProject(project_id, project.value)
    .then((json) => {
      router.push({ name: "project", params: { project_id: json.data.id } });
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}

function fetchProject() {
  return readProject(project_id)
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
</script>

<template>
  <div>
    <div>
      <button class="btn purple" @click="router.push({ name: 'main' })">
        Back to mainpage
      </button>
    </div>
    <h1 v-if="project_id">Update project</h1>
    <h1 v-else>New project</h1>

    <div>
      <input v-model="project.title" placeholder="Title" type="text" />
    </div>
    <div>
      <input
        v-model="project.description"
        placeholder="Description"
        type="text"
      />
    </div>
    <div>
      <input v-model="project.color" placeholder="Color" type="color" />
    </div>
    <div>
      <input v-model="project.goal_id" placeholder="Goal" type="text" />
    </div>
    <div>
      <input type="radio" value="1" v-model="project.space" />
      <label for="one">Personal space</label>

      <input type="radio" value="2" v-model="project.space" />
      <label for="two">Work space</label>
    </div>

    <div v-if="project_id">
      <button class="btn orange" @click="doUpdate">Update</button>
    </div>
    <div v-else>
      <button class="btn green" @click="doCreate">Save</button>
    </div>
  </div>
</template>

<style scoped></style>

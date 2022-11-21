<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// TODO move variables to one shared place
const todo_api_url = import.meta.env.VITE_TODO_API_URL;
const todo_api_token = import.meta.env.VITE_TODO_API_TOKEN;

const route = useRoute();
const router = useRouter();

const project_id = route.params.project_id;
const loading = ref(true);
const title = ref(null);
let action_url = null;
let project = ref(null);
let token = "Bearer " + todo_api_token;

if (project_id) {
  action_url = todo_api_url + "/api/private/v1/projects/" + project_id + "/";
  fetchProject().then(() => {
    title.value = project.value.title;
  });
} else {
  action_url = todo_api_url + "/api/private/v1/projects/";
}

function createProject() {
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
      router.push({ name: "project", params: { project_id: json.data.id } });
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}

function updateProject() {
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
      <input v-model="title" placeholder="Title" type="text" />
    </div>

    <div v-if="project_id">
      <button class="btn orange" @click="updateProject">Update</button>
    </div>
    <div v-else>
      <button class="btn green" @click="createProject">Save</button>
    </div>
  </div>
</template>

<style scoped></style>

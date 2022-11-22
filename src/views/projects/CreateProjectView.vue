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
let action_url = null;
let project = ref({
  title: null,
  description: null,
  color: null,
  goal_id: null,
  space: null,
});
let token = "Bearer " + todo_api_token;

if (project_id) {
  action_url = todo_api_url + "/api/private/v1/projects/" + project_id + "/";
  fetchProject();
} else {
  action_url = todo_api_url + "/api/private/v1/projects/";
}

function createProject() {
  return fetch(action_url, {
    method: "post",
    body: JSON.stringify(project.value),
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
    body: JSON.stringify(project.value),
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
      <button class="btn orange" @click="updateProject">Update</button>
    </div>
    <div v-else>
      <button class="btn green" @click="createProject">Save</button>
    </div>
  </div>
</template>

<style scoped></style>

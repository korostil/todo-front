<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// TODO move variables to one shared place
const todo_api_url = import.meta.env.VITE_TODO_API_URL;
const todo_api_token = import.meta.env.VITE_TODO_API_TOKEN;
const router = useRouter();

let url = todo_api_url + "/api/private/v1/projects/",
  token = "Bearer " + todo_api_token;

const loading = ref(true);
const title = ref(null);

function createProject() {
  return fetch(url, {
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
</script>

<template>
  <input v-model="title" placeholder="Title" />
  <button @click="createProject">Save</button>
</template>

<style scoped></style>

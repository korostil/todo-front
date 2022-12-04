<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// TODO move variables to one shared place
const todo_api_url = import.meta.env.VITE_TODO_API_URL;
const todo_api_token = import.meta.env.VITE_TODO_API_TOKEN;

const route = useRoute();
const router = useRouter();

const goal_id = route.params.goal_id;
const loading = ref(true);
let action_url = null;
let goal = ref({
  title: null,
});
let token = "Bearer " + todo_api_token;

if (goal_id) {
  action_url = todo_api_url + "/api/private/v1/goals/" + goal_id + "/";
  fetchGoal();
} else {
  action_url = todo_api_url + "/api/private/v1/goals/";
}

function createGoal() {
  return fetch(action_url, {
    method: "post",
    body: JSON.stringify(goal.value),
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
      router.push({ name: "goal", params: { goal_id: json.data.id } });
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}

function updateGoal() {
  return fetch(action_url, {
    method: "put",
    body: JSON.stringify(goal.value),
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
      router.push({ name: "goal", params: { goal_id: json.data.id } });
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}

function fetchGoal() {
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
      goal.value = json.data;
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
    <h1 v-if="goal_id">Update goal</h1>
    <h1 v-else>New goal</h1>

    <div>
      <input v-model="goal.title" placeholder="Title" type="text" />
    </div>

    <div v-if="goal_id">
      <button class="btn orange" @click="updateGoal">Update</button>
    </div>
    <div v-else>
      <button class="btn green" @click="createGoal">Save</button>
    </div>
  </div>
</template>

<style scoped></style>

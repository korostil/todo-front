<script setup>
// TODO move variables to one shared place
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const todo_api_url = import.meta.env.VITE_TODO_API_URL;
const todo_api_token = import.meta.env.VITE_TODO_API_TOKEN;

const route = useRoute();
const router = useRouter();

const goal_id = route.params.goal_id;
let fetch_url = todo_api_url + "/api/private/v1/goals/" + goal_id + "/",
  delete_url = todo_api_url + "/api/private/v1/goals/" + goal_id + "/",
  token = "Bearer " + todo_api_token;

const goal = ref(null);
const loading = ref(true);

function fetchGoal() {
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
      goal.value = json.data;
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}

function deleteGoal() {
  fetch(delete_url, {
    method: "delete",
    headers: { "content-type": "application/json", Authorization: token },
  })
    .then((res) => {
      if (res.status !== 204) {
        const error = new Error(res.statusText);
        error.json = res.json();
        throw error;
      }
    })
    .then(() => {
      router.push({ name: "main" });
    })
    .catch(() => {
      console.log("error");
    });
}

onMounted(() => {
  fetchGoal();
});
</script>

<template>
  <div>
    <div>
      <button class="btn purple" @click="router.push({ name: 'main' })">
        Back to mainpage
      </button>
    </div>
    <div v-if="!loading && goal">
      <h1>{{ goal.title }}</h1>

      <div>
        <button
          class="btn orange"
          @click="
            router.push({
              name: 'update_goal',
              params: { goal_id: goal.id },
            })
          "
        >
          Update
        </button>
      </div>
      <div>
        <button class="btn red" @click="deleteGoal">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

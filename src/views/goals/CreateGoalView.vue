<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createGoal, readGoal, updateGoal } from "@/store/api/goals";

const route = useRoute();
const router = useRouter();

const goal_id = route.params.goal_id;
const loading = ref(true);
let goal = ref({
  title: null,
});

if (goal_id) {
  fetchGoal();
}

function doCreate() {
  return createGoal(goal.value)
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

function doUpdate() {
  return updateGoal(goal_id, goal.value)
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
  return readGoal()
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
      <button class="btn orange" @click="doUpdate">Update</button>
    </div>
    <div v-else>
      <button class="btn green" @click="doCreate">Save</button>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { deleteGoal, readGoal } from "@/store/api/goals";

const route = useRoute();
const router = useRouter();

const goal_id = route.params.goal_id;

const goal = ref(null);
const loading = ref(true);

function fetchGoal() {
  return readGoal(goal_id)
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

function doGoal() {
  deleteGoal(goal_id)
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
        <button class="btn red" @click="doGoal">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

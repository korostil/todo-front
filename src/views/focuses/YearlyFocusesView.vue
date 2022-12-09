<script setup>
import { useRouter } from "vue-router";
import { readGoalList } from "@/store/api/goals";
import { onMounted, ref } from "vue";
import GoalItem from "@/components/GoalItem.vue";

const router = useRouter();

const goals = ref(null);
const loading = ref(true);

function fetchGoals() {
  // TODO show projects in this goals?
  let today = new Date();
  readGoalList({
    year: today.getFullYear(),
  })
    .then((json) => {
      goals.value = json.data;
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}

onMounted(() => {
  fetchGoals();
});
</script>

<template>
  <div>
    <strong>Yearly focuses</strong>
    <div v-if="!loading && goals && goals.length">
      <goal-item v-for="goal in goals" :goal="goal" :key="goal.id" />
    </div>
    <div>
      <button class="btn orange" @click="router.push({ name: 'new_goal' })">
        + goal
      </button>
    </div>
  </div>
</template>

<style scoped></style>

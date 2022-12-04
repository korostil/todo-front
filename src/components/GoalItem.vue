<script setup>
defineProps({
  goal: Object,
});
</script>

<template>
  <div>
    <router-link
      class="goal"
      :to="{ name: 'goal', params: { goal_id: goal.id } }"
    >
      <div class="goal-title">{{ goal.title }}</div>
    </router-link>
  </div>
</template>

<style scoped>
.goal {
  padding: 8px 16px;
  font-size: large;
  color: #ffffff;
  text-decoration: none;
  display: inline-block;
  width: calc(100% - 32px);
  height: 100%;
}
.goal:hover {
  background-color: #363636;
}
.goal-title {
  display: inline-block;
}
</style>

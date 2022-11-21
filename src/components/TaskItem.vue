<script setup>
defineProps({
  task: Object,
});
</script>

<template>
  <div>
    <router-link
      class="task"
      :to="{ name: 'task', params: { task_id: task.id } }"
      :class="{ completed: task.is_completed }"
    >
      <div class="task-title">{{ task.title }}</div>
      <div class="task-description">{{ task.description }}</div>
    </router-link>
  </div>
</template>

<style scoped>
.task {
  padding: 8px 16px;
  text-decoration: none;
  display: inline-block;
  width: calc(100% - 32px);
  height: 100%;
}
.task:hover {
  background-color: #363636;
}
.task-title {
  font-size: large;
  color: white;
}
.task-description {
  color: #888a85;
}
.completed {
  text-decoration: line-through;
  text-decoration-color: white;
}
</style>

<script setup>
import ProjectsView from "@/views/projects/ProjectsView.vue";
import TasksView from "@/views/tasks/TasksView.vue";
</script>

<template>
  <div id="projects-view">
    <projects-view />
  </div>
  <div id="tasks-view">
    <tasks-view />
  </div>
</template>

<style scoped>
#projects-view {
  background-color: #292929;
  height: 100%;
  width: 320px;
  padding: 16px;
}

#tasks-view {
  height: 100%;
  width: 960px;
  padding: 16px;
}
</style>

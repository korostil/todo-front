<script setup>
import { readTaskList } from "@/store/api/tasks";
import { onMounted, ref } from "vue";
import { getMonday, getSunday, toUnixDate } from "@/store/services/utils/dates";
import TaskItem from "@/components/TaskItem.vue";

const decisive_tasks = ref(true);
const loading = ref(true);

function fetchTasks() {
  let today = new Date();
  return readTaskList({
    decisive: true,
    due_from: toUnixDate(getMonday(today)),
    due_to: toUnixDate(getSunday(today)),
  })
    .then((json) => {
      decisive_tasks.value = json.data;
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}

onMounted(() => {
  fetchTasks();
});
</script>

<template>
  <div>
    <strong>Weekly focuses</strong>
    <task-item v-for="task in decisive_tasks" :task="task" :key="task.id" />
  </div>
</template>

<style scoped></style>

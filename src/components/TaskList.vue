<script setup>
import TaskItem from "@/components/TaskItem.vue";
import { ref, onMounted, watch } from "vue";
import { completeTask, readTaskList } from "@/store/api/tasks";
import { toUnixDate } from "@/store/services/utils/dates";

const tasks = ref(null);
const space_ref = ref(null);

function fetchTasks(space) {
  return readTaskList({
    space: space,
    due_to: toUnixDate(new Date()),
  })
    .then((json) => {
      tasks.value = json.data;
    })
    .catch(() => {
      console.log("error");
    });
}

function doComplete(task_id) {
  completeTask(task_id)
    .then(() => {
      fetchTasks(space_ref.value);
    })
    .catch(() => {
      console.log("error");
    });
}

onMounted(() => {
  fetchTasks(null);
});
watch(space_ref, () => {
  fetchTasks(space_ref.value);
});
</script>

<template>
  <v-list lines="two">
    <v-list-item
      v-for="task in tasks"
      :key="task.id"
      active-color="primary"
      rounded="lg"
      @click="true"
    >
      <task-item :task="task"></task-item>
    </v-list-item>
  </v-list>
</template>

<style scoped></style>

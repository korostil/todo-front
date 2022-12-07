<script setup>
import TaskItem from "@/components/TaskItem.vue";
import { ref, onMounted, watch } from "vue";
import { readTaskList } from "@/store/api/tasks";

const tasks = ref(null);
const loading = ref(true);
const space_ref = ref(null);

function fetchTasks(space) {
  return readTaskList({ space: space })
    .then((json) => {
      tasks.value = json.data;
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
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
  <div>
    <input type="radio" value="null" v-model="space_ref" />
    <label for="null">Both</label>
    <input type="radio" value="1" v-model="space_ref" />
    <label for="one">Personal space</label>
    <input type="radio" value="2" v-model="space_ref" />
    <label for="two">Work space</label>
  </div>
  <div v-if="!loading && tasks && tasks.length">
    <task-item v-for="task in tasks" :task="task" :key="task.id" />
  </div>
</template>

<style scoped></style>

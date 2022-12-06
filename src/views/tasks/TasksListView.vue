<script setup>
import TaskItem from "@/components/TaskItem.vue";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { readTaskList } from "@/store/api/tasks";

const router = useRouter();

const tasks = ref(null);
const loading = ref(true);
const completed_ref = ref(null);
const search_ref = ref(null);

function fetchTasks(completed, search) {
  return readTaskList({ completed: completed, search: search })
    .then((res) => {
      if (!res.ok) {
        const error = new Error(res.statusText);
        error.json = res.json();
        throw error;
      }

      return res.json();
    })
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
  fetchTasks(null, null);
});
watch(completed_ref, () => {
  fetchTasks(completed_ref.value, search_ref.value);
});
watch(search_ref, () => {
  fetchTasks(completed_ref.value, search_ref.value);
});
</script>

<template>
  <div>
    <button class="btn purple" @click="router.push({ name: 'main' })">
      Back to mainpage
    </button>
  </div>
  <div>
    <input type="radio" value="null" v-model="completed_ref" />
    <label for="null">Both</label>
    <input type="radio" value="true" v-model="completed_ref" />
    <label for="one">Completed</label>
    <input type="radio" value="false" v-model="completed_ref" />
    <label for="two">Active</label>
  </div>
  <div>
    <input type="text" v-model="search_ref" placeholder="search here" />
  </div>
  <div v-if="!loading && tasks && tasks.length">
    <task-item v-for="task in tasks" :task="task" :key="task.id" />
  </div>
  <div>
    <button class="btn orange" @click="router.push({ name: 'new_task' })">
      + task
    </button>
  </div>
</template>

<style scoped></style>

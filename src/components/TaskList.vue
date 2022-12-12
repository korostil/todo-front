<script setup>
import TaskItem from "@/components/TaskItem.vue";
import { ref, onMounted, watch } from "vue";
import { completeTask, readTaskList } from "@/store/api/tasks";
import { toUnixDate } from "@/store/services/utils/dates";

const tasks = ref(null);
const loading = ref(true);
const space_ref = ref(null);

function fetchTasks(space) {
  return readTaskList({
    space: space,
    completed: false,
    due_to: toUnixDate(new Date()),
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
  <div>
    <input type="radio" value="null" v-model="space_ref" />
    <label for="null">Both</label>
    <input type="radio" value="1" v-model="space_ref" />
    <label for="one">Personal space</label>
    <input type="radio" value="2" v-model="space_ref" />
    <label for="two">Work space</label>
  </div>
  <div v-if="!loading && tasks && tasks.length">
    <div v-for="task in tasks" :key="task.id">
      <div class="complete-container">
        <input
          class="complete-button"
          type="checkbox"
          @click="doComplete(task.id)"
        />
      </div>
      <div>
        <task-item :task="task" class="task-item" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  padding-left: 40px;
  border-bottom: 1px solid #363636;
}
.task-item:hover {
  background-color: #363636;
}
.complete-container {
  position: absolute;
  padding: 12px 8px;
}
.complete-button {
  width: 2em;
  height: 2em;
  background-color: #363636;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid #ddd;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
}

.complete-button:checked {
  background-color: gray;
}
</style>

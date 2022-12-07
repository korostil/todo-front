<script setup>
import { onMounted, ref } from "vue";
import { readProject } from "@/store/api/projects";

const props = defineProps({
  task: Object,
});

const project = ref(null);
const loading = ref(true);

function fetchProject() {
  if (props.task.project_id) {
    return readProject(props.task.project_id)
      .then((json) => {
        project.value = json.data;
      })
      .catch(() => {
        console.log("error");
      })
      .then(() => {
        loading.value = false;
      });
  } else {
    loading.value = false;
  }
}

onMounted(() => {
  fetchProject();
});
</script>

<template>
  <div>
    <router-link
      class="task"
      :to="{ name: 'task', params: { task_id: task.id } }"
      :class="{ decisive: task.decisive }"
    >
      <div>
        <div class="task-due">{{ task.due }}</div>
        <div class="task-title">{{ task.title }}</div>
        <div class="task-description">{{ task.description }}</div>
      </div>
      <div v-if="!loading && project">
        <strong :style="{ color: project.color }">{{ project.title }}</strong>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.decisive {
  background-color: rgba(249, 38, 114, 0.3);
}
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
.task-due {
  color: white;
}
</style>

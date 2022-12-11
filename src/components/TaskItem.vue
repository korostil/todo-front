<script setup>
import { onMounted, ref } from "vue";
import { readProject } from "@/store/api/projects";
import ProjectItemSimplified from "@/components/ProjectItemSimplified.vue";
import { getFormattedDueDateTime } from "@/store/services/utils/dates";

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
        <div class="task-title">{{ task.title }}</div>
        <div class="task-description">{{ task.description }}</div>
      </div>
      <div>
        <div class="task-due">{{ getFormattedDueDateTime(task.due) }}</div>
        <div class="task-project" v-if="!loading && project">
          <project-item-simplified :project="project" />
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.decisive {
  background-color: rgba(249, 38, 114, 0.3);
}
.task {
  padding: 8px 0 8px 16px;
  text-decoration: none;
  display: inline-block;
  width: calc(100% - 16px);
  height: 100%;
  border-bottom: 1px solid #363636;
}
.task:hover {
  background-color: #363636;
}
.task-title {
  font-size: 1.3em;
  color: white;
  padding-bottom: 2px;
}
.task-description {
  color: #888a85;
  padding-bottom: 8px;
}
.task-due {
  display: inline;
  color: #fd971f;
  float: left;
  font-size: 0.85em;
}
.task-project {
  display: inline;
  float: right;
  margin-top: -16px;
}
</style>

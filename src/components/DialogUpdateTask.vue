<script setup>
import { onMounted, ref, watch } from "vue";
import { deleteTask, updateTask } from "@/store/api/tasks";
import { readProjectList } from "@/store/api/projects";
import ButtonRemoveTask from "@/components/ButtonRemoveTask.vue";
import { taskDueDateRules, taskTitleRules } from "@/store/services/rules";

const emit = defineEmits(["taskUpdated"]);
const props = defineProps({
  task: Object,
});
const dialog = ref(false),
  valid = ref(false);
const task = ref(Object.assign({}, props.task));
const projects = ref(null),
  loading_error = ref(null);

function doUpdate() {
  let project = projects.value.find(
    (project) => project.id === task.value.project_id
  );
  if (project) task.value.space = project.space;

  return updateTask(task.value.id, task.value)
    .then(() => {
      dialog.value = false;
      emit("taskUpdated", task);
    })
    .catch(() => {
      console.log("error");
    });
}

function doDelete(task_id) {
  deleteTask(task_id)
    .then(() => {
      dialog.value = false;
    })
    .catch(() => {
      console.log("error");
    });
}

function fetchProjects() {
  const { data, error } = readProjectList({
    archived: false,
  });

  watch(data, () => {
    projects.value = data.value;
  });
  watch(error, () => {
    loading_error.value = error.value;
  });
}

onMounted(() => {
  fetchProjects();
});
</script>

<template>
  <v-dialog v-model="dialog" max-width="30%" rounded="lg" activator="parent">
    <v-card>
      <v-container>
        <v-card-title>
          <span class="text-h4">Update task</span>
        </v-card-title>

        <v-form v-model="valid">
          <v-container>
            <v-text-field
              color="grey-darken-2"
              label="Title"
              v-model="task.title"
              variant="outlined"
              :rules="taskTitleRules"
              required
              autofocus
            ></v-text-field>

            <v-text-field
              color="grey-darken-2"
              label="Description"
              v-model="task.description"
              variant="outlined"
            ></v-text-field>

            <v-switch
              label="Decisive"
              v-model="task.decisive"
              color="secondary"
              density="compact"
            ></v-switch>

            <v-text-field
              label="Due date"
              type="date"
              v-model="task.due_date"
              variant="outlined"
              :rules="taskDueDateRules"
            ></v-text-field>

            <v-text-field
              label="Due time"
              type="time"
              v-model="task.due_time"
              variant="outlined"
            ></v-text-field>

            <v-select
              label="Project"
              v-model="task.project_id"
              :items="projects"
              item-title="title"
              item-value="id"
              variant="outlined"
              clearable
            ></v-select>

            <v-btn-toggle
              v-model="task.space"
              active-color="primary"
              mandatory
              v-if="!task.project_id"
            >
              <v-label> Space </v-label>
              <v-btn icon="mdi-account" :value="2"></v-btn>
              <v-btn icon="mdi-domain" :value="1"></v-btn>
            </v-btn-toggle>
          </v-container>

          <v-card-actions>
            <v-spacer></v-spacer>
            <button-remove-task
              :task="task"
              @task-removed="doDelete"
            ></button-remove-task>
            <v-btn color="primary" @click="doUpdate"> Save </v-btn>
          </v-card-actions>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>

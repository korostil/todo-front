<script setup>
import { onMounted, ref, watch } from "vue";
import { createTask } from "@/store/api/tasks";
import { useRouter } from "vue-router";
import { readProjectList } from "@/store/api/projects";
import SnackbarLoadingFailed from "@/components/SnackbarLoadingFailed.vue";

const dialog = ref(false);
const router = useRouter();
const task = ref({});
const projects = ref(null),
  loading_error = ref(null);

function doCreate() {
  return createTask(task.value)
    .then((json) => {
      dialog.value = false;
      router.push({ name: "task", params: { task_id: json.data.id } });
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
  <snackbar-loading-failed
    text="Failed to load project list. Please reload the page."
    v-if="loading_error"
  ></snackbar-loading-failed>
  <v-dialog v-model="dialog" max-width="30%" rounded="lg" v-else>
    <template v-slot:activator="{ props }">
      <v-btn variant="plain" prepend-icon="mdi-plus" v-bind="props">
        new task
      </v-btn>
    </template>

    <v-card>
      <v-container>
        <v-card-title>
          <span class="text-h4">New task</span>
        </v-card-title>

        <v-container>
          <v-text-field
            color="grey-darken-2"
            label="Title"
            v-model="task.title"
            variant="outlined"
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

          <v-btn-toggle v-model="task.space" active-color="primary">
            <v-label> Space </v-label>
            <v-btn icon="mdi-account" :value="2"></v-btn>
            <v-btn icon="mdi-domain" :value="1"></v-btn>
          </v-btn-toggle>

          <v-text-field
            label="Due date"
            type="date"
            v-model="task.due_date"
            variant="outlined"
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
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="doCreate"> Create </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>

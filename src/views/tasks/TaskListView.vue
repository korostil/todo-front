<script setup>
import { ref, onMounted, watch } from "vue";
import { readTaskList } from "@/store/api/tasks";
import ButtonNewTask from "@/components/ButtonNewTask.vue";
import TaskList from "@/components/TaskList.vue";
import TheHeader from "@/components/TheHeader.vue";

const tasks = ref(null);
const loading = ref(true);
const completed_ref = ref(null);
const search_ref = ref(null);

function fetchTasks(completed, search) {
  return readTaskList({ completed: completed, search: search })
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
  <v-app id="app">
    <the-header></the-header>

    <v-main>
      <v-container>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6">
            <v-sheet rounded="lg" min-height="268">
              <v-container>
                <v-container>
                  <v-row>
                    <button-new-task></button-new-task>

                    <v-spacer></v-spacer>

                    <v-btn-toggle
                      v-model="completed_ref"
                      active-color="primary"
                      multiple
                    >
                      <v-btn icon="mdi-progress-check"></v-btn>
                      <v-btn icon="mdi-check-all"></v-btn>
                    </v-btn-toggle>
                  </v-row>
                </v-container>
                <task-list></task-list>
              </v-container>
            </v-sheet>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>

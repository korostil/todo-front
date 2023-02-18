<script setup>
import { ref } from "vue";
import { updateTask } from "@/store/api/tasks";

const emit = defineEmits(["taskUpdated"]);
const props = defineProps({
  task: Object,
});
const dialog = ref(false);
const task = ref(Object.assign({}, props.task));

function doUpdate() {
  return updateTask(task.value.id, task.value)
    .then(() => {
      dialog.value = false;
      emit("taskUpdated", task);
    })
    .catch(() => {
      console.log("error");
    });
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="30%" rounded="lg" activator="parent">
    <v-card>
      <v-container>
        <v-card-title>
          <span class="text-h4">Update task</span>
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
          <v-btn color="primary" @click="doUpdate"> Save </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>

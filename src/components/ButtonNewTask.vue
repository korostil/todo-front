<script setup>
import { ref } from "vue";
import { createTask } from "@/store/api/tasks";
import { useRouter } from "vue-router";

const dialog = ref(false);
const router = useRouter();
const task = ref({});

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
</script>

<template>
  <v-dialog v-model="dialog" max-width="30%" rounded="lg">
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
          ></v-text-field>
          <v-text-field
            color="grey-darken-2"
            label="Description"
            v-model="task.description"
          ></v-text-field>
          <v-checkbox label="Decisive" v-model="task.decisive"></v-checkbox>

          <v-btn-toggle v-model="task.space" active-color="primary">
            <v-label> Space </v-label>
            <v-btn icon="mdi-account"></v-btn>
            <v-btn icon="mdi-domain"></v-btn>
          </v-btn-toggle>
          <!-- TODO due field -->
          <!-- TODO project field -->
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

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { createProject } from "@/store/api/projects";

const dialog = ref(false);
const router = useRouter();
const project = ref({});

function doCreate() {
  return createProject(project.value)
    .then((json) => {
      dialog.value = false;
      router.push({ name: "project", params: { project_id: json.data.id } });
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
        new project
      </v-btn>
    </template>

    <v-card>
      <v-container>
        <v-card-title>
          <span class="text-h4">New project</span>
        </v-card-title>

        <v-container>
          <v-text-field
            color="grey-darken-2"
            label="Title"
            v-model="project.title"
          ></v-text-field>
          <v-text-field
            color="grey-darken-2"
            label="Description"
            v-model="project.description"
          ></v-text-field>
          <v-color-picker
            label="Color"
            v-model="project.color"
          ></v-color-picker>
          <v-text-field
            color="grey-darken-2"
            label="Goal"
            v-model="project.goal_id"
          ></v-text-field>
          <v-btn-toggle v-model="project.space" active-color="primary">
            <v-btn icon="mdi-account"></v-btn>
            <v-btn icon="mdi-domain"></v-btn>
          </v-btn-toggle>
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

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  createProject,
  readProject,
  updateProject,
} from "@/store/api/projects";
import TheHeader from "@/components/TheHeader.vue";

const route = useRoute();
const router = useRouter();

const project_id = route.params.project_id;
const loading = ref(true);

let project = ref({
  title: null,
  description: null,
  color: null,
  goal_id: null,
  space: null,
});

if (project_id) {
  fetchProject();
}

function doCreate() {
  return createProject(project.value)
    .then((json) => {
      router.push({ name: "project", params: { project_id: json.data.id } });
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}

function doUpdate() {
  return updateProject(project_id, project.value)
    .then((json) => {
      router.push({ name: "project", params: { project_id: json.data.id } });
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}

function fetchProject() {
  return readProject(project_id)
    .then((json) => {
      project.value = json.data;
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}
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
                <h1 v-if="project_id">Update project</h1>
                <h1 v-else>New project</h1>

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

                <v-btn v-if="project_id" @click="doUpdate">Update</v-btn>
                <v-btn v-else @click="doCreate">Save</v-btn>
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

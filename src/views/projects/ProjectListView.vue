<script setup>
import { ref, onMounted, watch } from "vue";
import { readProjectList } from "@/store/api/projects";
import TheHeader from "@/components/TheHeader.vue";
import ProjectList from "@/components/ProjectList.vue";
import ButtonNewProject from "@/components/ButtonNewProject.vue";

const projects = ref(null);
const loading = ref(true);
const archived_ref = ref(null);
const search_ref = ref(null);

function fetchProjects(archived, search) {
  readProjectList({ archived: archived, search: search })
    .then((json) => {
      projects.value = json.data;
    })
    .catch(() => {
      console.log("error");
    })
    .then(() => {
      loading.value = false;
    });
}

onMounted(() => {
  fetchProjects(null, null);
});
watch(archived_ref, () => {
  fetchProjects(archived_ref.value, search_ref.value);
});
watch(search_ref, () => {
  fetchProjects(archived_ref.value, search_ref.value);
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
                    <button-new-project></button-new-project>

                    <v-spacer></v-spacer>

                    <v-btn-toggle
                      v-model="archived_ref"
                      active-color="primary"
                      multiple
                    >
                      <v-btn icon="mdi-progress-check"></v-btn>
                      <v-btn icon="mdi-archive-outline"></v-btn>
                    </v-btn-toggle>
                  </v-row>
                </v-container>
                <project-list></project-list>
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

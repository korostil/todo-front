<script setup>
import { ref, onMounted } from "vue";
import { readProjectList } from "@/store/api/projects";

const projects = ref(null);
const loading = ref(true);

const menuItems = [{ title: "Edit" }, { title: "Remove" }];

function fetchProjects() {
  return readProjectList({})
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
  fetchProjects();
});
</script>

<template>
  <v-list lines="two">
    <v-list-subheader>PROJECTS</v-list-subheader>
    <v-list-item
      v-for="project in projects"
      :key="project.id"
      :title="project.title"
      :subtitle="project.description"
      active-color="primary"
      rounded="lg"
      @click="
        router.push({ name: 'project', params: { project_id: project.id } })
      "
    >
      <template v-slot:prepend>
        <v-icon icon="mdi-circle" :color="project.color"></v-icon>
      </template>

      <template v-slot:append>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              color="grey-darken-1"
              icon="mdi-menu"
              variant="text"
              v-bind="props"
            ></v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in menuItems"
              :key="index"
              :value="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-list-item>
  </v-list>
</template>

<style scoped></style>

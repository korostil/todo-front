<script setup>
import { ref, onMounted } from "vue";
import {
  archiveProject,
  deleteProject,
  readProjectList,
  restoreProject,
} from "@/store/api/projects";
import { useRouter } from "vue-router";
import ButtonUpdateProject from "@/components/ButtonUpdateProject.vue";
import ButtonRemoveProject from "@/components/ButtonRemoveProject.vue";
import ButtonArchiveProject from "@/components/ButtonArchiveProject.vue";
import ButtonRestoreProject from "@/components/ButtonRestoreProject.vue";

const router = useRouter();
let projects = ref(null);
const loading = ref(true);
let dialog = ref(false);

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

function doRemoveProject(project_id) {
  deleteProject(project_id);
  excludeProjectFromListAndCloseDialog(project_id);
}

function doArchiveProject(project_id) {
  archiveProject(project_id);
  excludeProjectFromListAndCloseDialog(project_id);
}

function doRestoreProject(project_id) {
  restoreProject(project_id);
  dialog.value = false;
}

function excludeProjectFromListAndCloseDialog(project_id) {
  dialog.value = false;
  // TODO optimization: there is a way to make it neat and tidy?
  function removeValue(value, index, arr) {
    if (value.id === project_id) {
      arr.splice(index, 1);
      return true;
    }
    return false;
  }
  projects.value.filter(removeValue);
}

function doRefresh(updated_project) {
  dialog.value = false;
  let tmp_projects = Object.assign([], projects.value);
  const index = tmp_projects.findIndex(
    (obj) => obj.id === updated_project.value.id
  );
  tmp_projects[index] = updated_project.value;
  projects.value = tmp_projects;
}

onMounted(() => {
  fetchProjects();
});
</script>

<template>
  <v-list lines="two">
    <v-list-subheader>PROJECTS</v-list-subheader>
    <!-- TODO how to make v-list-item selectable and change task list from different component? -->
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
        <v-icon
          :icon="project.is_archived ? 'mdi-archive-outline' : 'mdi-circle'"
          :color="project.color"
        ></v-icon>
      </template>

      <template v-slot:append>
        <!-- TODO make menu disappear after successful project update -->
        <v-menu close-on-content-click>
          <template v-slot:activator="{ props }">
            <v-btn
              color="grey-darken-1"
              icon="mdi-menu"
              variant="text"
              v-bind="props"
            ></v-btn>
          </template>
          <v-list>
            <v-list-item>
              <button-update-project
                :project="project"
                @project-updated="doRefresh"
              ></button-update-project>
            </v-list-item>

            <v-list-item>
              <button-restore-project
                v-if="project.is_archived"
                :project="project"
                @project-restored="doRestoreProject"
              ></button-restore-project>
              <button-archive-project
                v-else
                :project="project"
                @project-archived="doArchiveProject"
              ></button-archive-project>
            </v-list-item>

            <v-list-item>
              <button-remove-project
                :project="project"
                @project-removed="doRemoveProject"
              ></button-remove-project>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-list-item>
  </v-list>
</template>

<style scoped></style>

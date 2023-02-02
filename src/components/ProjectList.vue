<script setup>
import { ref, onMounted } from "vue";
import { deleteProject, readProjectList } from "@/store/api/projects";
import { useRouter } from "vue-router";

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

function removeProject(project_id) {
  dialog.value = false;
  deleteProject(project_id);
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
              @click="
                router.push({
                  name: 'update_project',
                  params: { project_id: project.id },
                })
              "
            >
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>

            <v-dialog v-model="dialog" max-width="30%" class="text-center">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props"> Remove </v-list-item>
              </template>

              <v-card>
                <v-card-text>
                  Are you sure you want to remove project "{{ project.title }}"?
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" variant="text" @click="dialog = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    color="red-darken-1"
                    @click="removeProject(project.id)"
                  >
                    Remove
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list>
        </v-menu>
      </template>
    </v-list-item>
  </v-list>
</template>

<style scoped></style>

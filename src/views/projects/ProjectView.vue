<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { deleteProject, readProject } from "@/store/api/projects";

const route = useRoute();
const router = useRouter();

const project_id = route.params.project_id;

const project = ref(null);
const loading = ref(true);

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

function doDelete() {
  deleteProject(project_id)
    .then(() => {
      router.push({ name: "main" });
    })
    .catch(() => {
      console.log("error");
    });
}

onMounted(() => {
  fetchProject();
});
</script>

<template>
  <div>
    <div>
      <button class="btn purple" @click="router.push({ name: 'main' })">
        Back to mainpage
      </button>
    </div>
    <div v-if="!loading && project">
      <h1>{{ project.title }}</h1>
      <div>
        <strong>{{ project.description }}</strong>
      </div>
      <div>
        <strong>Color: {{ project.color }}</strong>
      </div>
      <div>
        <strong>Goal: {{ project.goal_id }}</strong>
      </div>
      <div>
        <strong>Space: {{ project.space }}</strong>
      </div>

      <div>
        <button
          class="btn orange"
          @click="
            router.push({
              name: 'update_project',
              params: { project_id: project.id },
            })
          "
        >
          Update
        </button>
      </div>
      <div>
        <button class="btn red" @click="doDelete">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import ProjectItem from "@/components/ProjectItem.vue";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { readProjectList } from "@/store/api/projects";

const router = useRouter();

const projects = ref(null);
const loading = ref(true);
const archived_ref = ref(null);
const search_ref = ref(null);

function fetchProjects(archived, search) {
  readProjectList({ archived: archived, search: search })
    .then((res) => {
      if (!res.ok) {
        const error = new Error(res.statusText);
        error.json = res.json();
        throw error;
      }

      return res.json();
    })
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
  <div>
    <button class="btn purple" @click="router.push({ name: 'main' })">
      Back to mainpage
    </button>
  </div>
  <div>
    <input type="radio" value="null" v-model="archived_ref" />
    <label for="null">Both</label>
    <input type="radio" value="true" v-model="archived_ref" />
    <label for="one">Archived</label>
    <input type="radio" value="false" v-model="archived_ref" />
    <label for="two">Active</label>
  </div>
  <div>
    <input type="text" v-model="search_ref" placeholder="search here" />
  </div>
  <div v-if="!loading && projects && projects.length">
    <project-item
      v-for="project in projects"
      :project="project"
      :key="project.id"
    />
  </div>
  <div>
    <button class="btn orange" @click="router.push({ name: 'new_project' })">
      + project
    </button>
  </div>
</template>

<style scoped></style>

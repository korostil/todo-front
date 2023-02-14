<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <v-app-bar class="px-3" flat density="compact">
    <v-icon
      icon="mdi-home"
      size="large"
      color="grey-darken-1"
      @click="router.push({ name: 'main' })"
    ></v-icon>

    <v-spacer></v-spacer>

    <v-text-field
      centered
      color="grey-darken-2"
      label="Search everywhere"
      variant="outlined"
    ></v-text-field>

    <v-btn-toggle v-model="space_ref" active-color="primary" multiple>
      <v-btn icon="mdi-account"></v-btn>
      <v-btn icon="mdi-domain"></v-btn>
    </v-btn-toggle>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<style scoped></style>

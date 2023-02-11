<script setup>
const focus = [
  { title: "Focus on 1", description: "lorem", is_completed: false },
  { title: "Focus on 2", description: "ipsum", is_completed: true },
  { title: "Focus on 3", description: "dios mio", is_completed: false },
];
</script>

<template>
  <v-list>
    <v-list-subheader>MONTH FOCUS</v-list-subheader>
    <v-list-item
      v-for="item in focus"
      :key="item.id"
      :title="item.title"
      :subtitle="item.description"
      :prepend-icon="item.is_completed ? 'mdi-check' : 'mdi-circle-outline'"
      active-color="primary"
      rounded="lg"
      @click="true"
    >
    </v-list-item>
  </v-list>
</template>

<style scoped></style>

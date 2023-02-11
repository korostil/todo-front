<script setup>
const focus = [
  { title: "Decisive task 1", description: "lorem", is_completed: false },
  { title: "Decisive task 2", description: "ipsum", is_completed: true },
  { title: "Decisive task 3", description: "dios mio", is_completed: false },
];
</script>

<template>
  <v-list>
    <v-list-subheader>WEEK FOCUS</v-list-subheader>
    <v-list-item
      v-for="task in focus"
      :key="task.id"
      :title="task.title"
      :subtitle="task.description"
      :prepend-icon="task.is_completed ? 'mdi-check' : 'mdi-circle-outline'"
      active-color="primary"
      rounded="lg"
      @click="true"
    >
    </v-list-item>
  </v-list>
</template>

<style scoped></style>

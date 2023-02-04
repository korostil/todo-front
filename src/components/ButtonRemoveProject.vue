<script setup>
import { ref } from "vue";

const emit = defineEmits(["projectRemoved"]);
const props = defineProps({
  project: Object,
});
const dialog = ref(false);
</script>

<template>
  <v-dialog v-model="dialog" max-width="30%" class="text-center">
    <template v-slot:activator="{ props }">
      <v-btn variant="plain" prepend-icon="mdi-delete-outline" v-bind="props"
        >Remove</v-btn
      >
    </template>

    <v-card>
      <v-card-text>
        Are you sure you want to remove project "{{ props.project.title }}"?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="text" @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn
          color="red-darken-1"
          @click="emit('projectRemoved', props.project.id)"
        >
          Remove
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>

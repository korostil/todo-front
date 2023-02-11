<script setup>
import { getFormattedDueDateTime } from "@/store/services/utils/dates";

const props = defineProps({ task: Object });
</script>

<template>
  <v-row>
    <v-col cols="12" sm="1">
      <v-btn
        size="small"
        variant="outlined"
        :icon="props.task.is_completed ? 'mdi-check' : ''"
        color="grey"
      ></v-btn>
    </v-col>
    <v-col cols="12" sm="11">
      <div>
        <span class="text-h5">{{ props.task.title }}</span>
      </div>
      <div>
        <span class="text-subtitle-1">{{ props.task.description }}</span>
      </div>
      <v-row>
        <v-col cols="12" sm="8">
          <v-chip class="ml-0 pl-0 task-due" size="small" variant="text">
            {{ getFormattedDueDateTime(props.task.due) }}
          </v-chip>
          <v-chip class="my-2 mx-1" color="#a6e22e" size="small" label>
            some
          </v-chip>
          <v-chip class="my-2 mx-1" color="#e6db74" size="small" label>
            different
          </v-chip>
          <v-chip class="my-2 mx-1" color="#51edbc" size="small" label>
            tags
          </v-chip>
        </v-col>
        <v-col cols="12" sm="4" class="d-flex justify-end">
          <v-chip class="ma-2" color="green" size="small" variant="text">
            Project name
          </v-chip>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style scoped>
.task-due {
  color: #fd971f;
}
</style>

<script setup>
import TaskItem from "@/components/TaskItem.vue";
import { ref, watch, watchEffect } from "vue";
import { readTaskList } from "@/store/api/tasks";
import { toUnixDate } from "@/store/services/utils/dates";
import SnackbarLoadingFailed from "@/components/SnackbarLoadingFailed.vue";

const props = defineProps({
  completed: { type: Boolean, required: false, default: null },
  decisive: { type: Boolean, required: false, default: null },
  due_from: { type: Date, required: false, default: null },
  due_to: { type: Date, required: false, default: null },
  today: { type: Boolean, required: false, default: false },
  search: { type: String, required: false, default: null },
  space: { type: Number, required: false, default: null },
});
const completed = ref(props.completed),
  decisive = ref(props.decisive),
  due_from = ref(props.due_from),
  due_to = ref(props.due_to),
  today = ref(props.today),
  search = ref(props.search),
  space = ref(props.space),
  tasks = ref(null),
  loading_error = ref(null);

function fetchTasks() {
  let filter;

  if (today.value === true) {
    filter = {
      completed: false,
      due_to: toUnixDate(new Date()),
    };
  } else {
    filter = {
      completed: completed.value,
      decisive: decisive.value,
      due_from: due_from.value,
      due_to: due_to.value,
      search: search.value,
      space: space.value,
    };
  }

  const { data, error } = readTaskList(filter);

  watch(data, () => {
    tasks.value = data.value;
  });
  watch(error, () => {
    loading_error.value = error.value;
  });
}

watchEffect(() => {
  completed.value = props.completed;
  decisive.value = props.decisive;
  due_from.value = props.due_from;
  due_to.value = props.due_to;
  today.value = props.today;
  search.value = props.search;
  space.value = props.space;
  fetchTasks();
});
</script>

<template>
  <snackbar-loading-failed
    text="Failed to load task list. Please reload the page."
    v-if="loading_error"
  ></snackbar-loading-failed>
  <v-list lines="two" v-else>
    <v-list-item
      v-for="task in tasks"
      :key="task.id"
      active-color="primary"
      rounded="lg"
      @click="true"
    >
      <task-item :task="task"></task-item>
    </v-list-item>
  </v-list>
</template>

<style scoped></style>

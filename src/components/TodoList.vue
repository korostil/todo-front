<script setup>
import TodoItem from "@/components/TodoItem.vue";

let todo_1 = {
    title: "foo",
    subtitle: "some subtitle",
  },
  todo_2 = { title: "bar", subtitle: "some subtitle" };
</script>

<template>
  <div>
    <todo-item :task="todo_1" />
    <todo-item :task="todo_2" />
  </div>
</template>

<style scoped></style>

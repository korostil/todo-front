<script setup>
import TodoList from "@/components/TaskList.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <todo-list />
  <div>
    <button @click="router.push({ name: 'new_task' })">+ task</button>
  </div>
</template>

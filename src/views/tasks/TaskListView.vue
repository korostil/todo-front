<script setup>
import { ref } from "vue";
import ButtonNewTask from "@/components/ButtonNewTask.vue";
import TaskList from "@/components/TaskList.vue";
import TheHeader from "@/components/TheHeader.vue";

const refCompleted = ref(null);
</script>

<template>
  <v-app id="app">
    <the-header></the-header>

    <v-main>
      <v-container>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6">
            <v-sheet rounded="lg" min-height="268">
              <v-container>
                <v-container>
                  <v-row>
                    <button-new-task></button-new-task>

                    <v-spacer></v-spacer>

                    <v-btn-toggle v-model="refCompleted" active-color="primary">
                      <v-btn icon="mdi-progress-check" :value="false"></v-btn>
                      <v-btn icon="mdi-check-all" :value="true"></v-btn>
                    </v-btn-toggle>
                  </v-row>
                </v-container>
                <task-list :completed="refCompleted"></task-list>
              </v-container>
            </v-sheet>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>

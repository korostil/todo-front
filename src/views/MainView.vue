<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProjectList from "@/components/ProjectList.vue";
import TaskList from "@/components/TaskList.vue";
import ButtonNewProject from "@/components/ButtonNewProject.vue";
import ButtonAllProjects from "@/components/ButtonAllProjects.vue";
import ButtonNewTask from "@/components/ButtonNewTask.vue";
import ButtonAllTasks from "@/components/ButtonAllTasks.vue";
</script>

<template>
  <v-app>
    <the-header></the-header>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="3">
            <v-sheet rounded="lg" min-height="268">
              <v-container>
                <project-list></project-list>
                <button-new-project></button-new-project>
                <button-all-projects></button-all-projects>
              </v-container>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="6">
            <v-sheet min-height="90vh" rounded="lg">
              <v-container>
                <task-list></task-list>
                <button-new-task></button-new-task>
                <button-all-tasks></button-all-tasks>
              </v-container>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="3">
            <v-sheet rounded="lg" min-height="268">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>

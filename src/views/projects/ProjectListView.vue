<script setup>
import { ref } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import ProjectList from "@/components/ProjectList.vue";
import ButtonNewProject from "@/components/ButtonNewProject.vue";

const archived = ref(null);
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
                    <button-new-project></button-new-project>

                    <v-spacer></v-spacer>

                    <v-btn-toggle v-model="archived" active-color="primary">
                      <v-btn icon="mdi-progress-check" value="active"></v-btn>
                      <v-btn
                        icon="mdi-archive-outline"
                        value="archived"
                      ></v-btn>
                    </v-btn-toggle>
                  </v-row>
                </v-container>
                <project-list :archived="archived"></project-list>
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

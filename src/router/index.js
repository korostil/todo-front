import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      components: {
        projects: () => import("../views/ProjectsView.vue"),
        tasks: () => import("../views/TasksView.vue"),
      },
    },
  ],
});

export default router;

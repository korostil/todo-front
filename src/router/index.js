import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("../views/MainView.vue"),
    },
    {
      path: "/projects/new/",
      name: "new_project",
      component: () => import("../views/projects/CreateView.vue"),
    },
    {
      path: "/projects/:project_id/",
      name: "project",
      component: () => import("../views/projects/ProjectView.vue"),
    },
  ],
});

export default router;

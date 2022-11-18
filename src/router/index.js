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
      component: () => import("../views/projects/CreateProjectView.vue"),
    },
    {
      path: "/projects/:project_id/",
      name: "project",
      component: () => import("../views/projects/ProjectView.vue"),
    },
    {
      path: "/tasks/new/",
      name: "new_task",
      component: () => import("../views/tasks/CreateTaskView.vue"),
    },
    {
      path: "/tasks/:task_id/",
      name: "task",
      component: () => import("../views/tasks/TaskView.vue"),
    },
  ],
});

export default router;

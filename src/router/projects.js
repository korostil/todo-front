export const routes = [
  {
    path: "/projects/",
    name: "project_list",
    component: () => import("../views/projects/ProjectListView.vue"),
  },
  {
    path: "/projects/:project_id/",
    name: "project",
    component: () => import("../views/projects/ProjectView.vue"),
  },
];

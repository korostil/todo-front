export const routes = [
  {
    path: "/projects/new/",
    name: "new_project",
    component: () => import("../views/projects/CreateProjectView.vue"),
  },
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
  {
    path: "/projects/:project_id/update/",
    name: "update_project",
    component: () => import("../views/projects/CreateProjectView.vue"),
  },
];

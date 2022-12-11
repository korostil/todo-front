export const routes = [
  {
    path: "/tasks/",
    name: "task_list",
    component: () => import("../views/tasks/TaskListView.vue"),
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
  {
    path: "/tasks/:task_id/update/",
    name: "update_task",
    component: () => import("../views/tasks/CreateTaskView.vue"),
  },
  {
    path: "/tasks/completed/",
    name: "completed_tasks",
    component: () => import("../views/tasks/CompletedTaskView.vue"),
  },
];

export const routes = [
  {
    path: "/goals/",
    name: "goal_list",
    component: () => import("../views/goals/GoalListView.vue"),
  },
  {
    path: "/goals/:goal_id/",
    name: "goal",
    component: () => import("../views/goals/GoalView.vue"),
  },
];

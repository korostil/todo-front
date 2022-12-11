export const routes = [
  {
    path: "/goals/new/",
    name: "new_goal",
    component: () => import("../views/goals/CreateGoalView.vue"),
  },
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
  {
    path: "/goals/:goal_id/update/",
    name: "update_goal",
    component: () => import("../views/goals/CreateGoalView.vue"),
  },
];

export const routes = [
  {
    path: "/goals/new/",
    name: "new_goal",
    component: () => import("../views/goals/CreateGoalView.vue"),
  },
  {
    path: "/goals/",
    name: "goals_list",
    component: () => import("../views/goals/GoalsListView.vue"),
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

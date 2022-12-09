export const routes = [
  {
    path: "/focuses/weekly/",
    name: "weekly_focuses",
    component: () => import("../views/focuses/WeeklyFocusesView.vue"),
  },
  {
    path: "/focuses/monthly/",
    name: "monthly_focuses",
    component: () => import("../views/focuses/MonthlyFocusesView.vue"),
  },
  {
    path: "/focuses/yearly/",
    name: "yearly_focuses",
    component: () => import("../views/focuses/YearlyFocusesView.vue"),
  },
];

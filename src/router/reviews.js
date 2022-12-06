export const routes = [
  {
    path: "/reviews/daily/",
    name: "daily_review",
    component: () => import("../views/reviews/DailyReviewView.vue"),
  },
  {
    path: "/reviews/weekly/",
    name: "weekly_review",
    component: () => import("../views/reviews/WeeklyReviewView.vue"),
  },
];

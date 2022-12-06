export const routes = [
  {
    path: "/reviews/daily/",
    name: "daily_review",
    component: () => import("../views/reviews/DailyReviewView.vue"),
  },
];

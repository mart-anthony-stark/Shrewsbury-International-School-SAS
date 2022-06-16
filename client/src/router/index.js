import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/accounts/admin",
    name: "Admins",
    component: () => import("../views/Admins.vue"),
  },
  {
    path: "/accounts/student",
    name: "Students",
    component: () => import("../views/Students.vue"),
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: () => import("../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/Index.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/accounts/admin",
    name: "admins",
    component: () => import("../views/Admins.vue"),
  },
  {
    path: "/accounts/student",
    name: "students",
    component: () => import("../views/Students.vue"),
  },
  {
    path: "/attendance",
    name: "attendance",
    component: () => import("../views/Attendance.vue"),
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/student/attendance",
    name: "StudentAttendance",
    component: () => import("../views/StudentAttendance.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: () => import("../views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

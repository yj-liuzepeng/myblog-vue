import { createRouter, createWebHistory,createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "../layout/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/home.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/work",
        name: "work",
        component: () => import("../views/work.vue"),
        meta: {
          title: "实战页",
        },
      },
      {
        path: "/record",
        name: "record",
        component: () => import("../views/record.vue"),
        meta: {
          title: "记录页",
        },
      },
      {
        path: "/life",
        name: "life",
        component: () => import("../views/life.vue"),
        meta: {
          title: "生活页",
        },
      },
      {
        path: "/interaction",
        name: "interaction",
        component: () => import("../views/interaction.vue"),
        meta: {
          title: "互动页",
        },
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../views/about.vue"),
        meta: {
          title: "关于作者",
        },
      },
      {
        path: "/detail",
        name: "detail",
        component: () => import("../views/detail.vue"),
        meta: {
          title: "文章详情",
        },
      },
    ],
  },
];
const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});

export default router;

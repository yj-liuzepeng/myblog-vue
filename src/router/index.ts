/*
 * @Author: lzp
 * @Date: 2022-03-18 11:36:06
 * @Description: 路由管理
 */
import {
  createRouter,
  createWebHistory,
  // createWebHashHistory,
  RouteRecordRaw,
} from "vue-router";
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
          keepAlive: false,
        },
      },

      {
        path: "/qq",
        name: "qq",
        component: () => import("../views/oauth.vue"),
        meta: {
          title: "qq登录",
          keepAlive: false,
        },
      },
      {
        path: "/work",
        name: "work",
        component: () => import("../views/work.vue"),
        meta: {
          title: "实战页",
          keepAlive: false,
        },
      },
      {
        path: "/record",
        name: "record",
        component: () => import("../views/record.vue"),
        meta: {
          title: "记录页",
          keepAlive: false,
        },
      },
      {
        path: "/life",
        name: "life",
        component: () => import("../views/life.vue"),
        meta: {
          title: "生活页",
          keepAlive: false,
        },
      },
      {
        path: "/interaction",
        name: "interaction",
        component: () => import("../views/interaction.vue"),
        meta: {
          title: "互动页",
          keepAlive: false,
        },
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../views/about.vue"),
        meta: {
          title: "关于作者",
          keepAlive: true,
        },
      },
      {
        path: "/detail",
        name: "detail",
        component: () => import("../views/detail.vue"),
        meta: {
          title: "文章详情",
          keepAlive: false,
        },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes,
});

export default router;

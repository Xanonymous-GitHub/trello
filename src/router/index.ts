import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Board from "../views/Board.vue";
// import Task from "../views/Task.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "board",
    component: Board,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
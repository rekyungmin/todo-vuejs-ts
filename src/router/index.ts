import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import TodoList from "../views/TodoList.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/:state?",
    name: "TodoList",
    component: TodoList
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

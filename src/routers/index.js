import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: "home",
      path: "/home",
      component: () => import("../views/home/Home.vue")
    },
    {
      path: "notfound",
      path: "/:pathMatch(.*)",
      component: () => import("../views/notfound/NotFound.vue")
    },
    {
      name: "recommend",
      path: "/recommend",
      component: () => import("../views/recommend/Recommend.vue")
    },
  ]
})

export default router
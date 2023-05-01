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
      component: () => import("../views/home/Home.vue"),
      children: [
        {
          path: '/home',
          redirect: '/home/recommend'
        },
        {
          path: "recommend",
          component: () => import("../views/home/recommend/ReCommend.vue")
        },
        {
          path: "musiclist",
          component: () => import("../views/home/musiclist/MusicList.vue")
        },
        {
          path: "ranking",
          component: () => import("../views/home/ranking/RanKing.vue")
        },
        {
          path: "singer",
          component: () => import("../views/home/singer/SinGer.vue")
        },
      ]
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
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home/recommend'
    },
    {
      name: "home",
      path: "/home",
      component: () => import("../views/home/Home.vue"),
      children: [
        {
          name: "home",
          path: "",
          component: () => import("../views/home/discover/TabBar/TabBar.vue"),
          children: [
            {
              path: '/home',
              redirect: '/home/recommend'
            },
            {
              name: "home/recommend",
              path: "/home/recommend",
              component: () => import("../views/home/discover/c-cpns/recommend/ReCommend.vue"),
            },
            {
              name: "musiclist",
              path: "/home/musiclist",
              component: () => import("../views/home/discover/c-cpns/musiclist/MusicList.vue"),
            },
            {
              name: "ranking",
              path: "/home/ranking",
              component: () => import("../views/home/discover/c-cpns/ranking/RanKing.vue"),
            },
            {
              name: "singer",
              path: "/home/singer",
              component: () => import("../views/home/discover/c-cpns/singer/SinGer.vue"),
            },
          ]
        },
        {
          name: "video",
          path: "/video",
          component: () => import("../views/home/video/Video.vue"),
        },
      ]
    },

    {
      path: "notfound",
      path: "/:pathMatch(.*)",
      component: () => import("../views/notfound/NotFound.vue")
    },
    // {
    //   name: "video",
    //   path: "/video",
    //   component: () => import("../views/video/Video.vue")
    // },

  ]
})

export default router
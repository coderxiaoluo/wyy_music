import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from 'nprogress'
// 引入对应css样式
import 'nprogress/nprogress.css'
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
        {
          name: "musicdetail",
          path: "/musicdetail/:id",
          component: () => import("../components/musicdetail/MusicDetail.vue"),
        },

      ]
    },

    {
      path: "notfound",
      path: "/:pathMatch(.*)",
      component: () => import("../views/notfound/NotFound.vue")
    },
    {
      name: "test",
      path: "/test",
      component: () => import("../views/test.vue"),
    },
    // {
    //   name: "video",
    //   path: "/video",
    //   component: () => import("../views/video/Video.vue")
    // },

  ]
})

// 修改进度条插件的配置
NProgress.configure({
  showSpinner: false
})
// 前置首位 访问权限控制
router.beforeEach((to) => {
  // 开启页面进度条
  NProgress.start()
})
// 后置守卫
router.afterEach((to) => {
  NProgress.done()
})


export default router
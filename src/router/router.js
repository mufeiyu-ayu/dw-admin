export default [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/authorization",
    redirect: "/authorization/login",
    component: () =>
      import(
        /* webpackChunkName: 'authrozation' */ "@/views/Authorization/index.vue"
      ),
    children: [
      {
        path: "login",
        name: "login",
        component: () =>
          import(
            /* webpackChunkName: 'login' */ "@/views/Authorization/children/Login.vue"
          ),
      },
      {
        path: "register",
        name: "register",
        component: () =>
          import(
            /* webpackChunkName: 'register' */ "@/views/Authorization/children/Register.vue"
          ),
      },
    ],
  },
];

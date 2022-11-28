import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./router";
import store from "storejs";
import { notification } from "ant-design-vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { buildDynamicRoutes } from "@/utils";
import { getUserMenu } from "@/service/menu";
import "@/styles/style.css";

// 重写路由
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// 免登录的白名单
const whitePaths = [
  "/authorization",
  "/authorization/login",
  "/authorization/register",
  "/404",
];
// 全局前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  // 当auth丢失之后的情况（在没有登录并且路由的目标页面不是白名单里的页面）
  // 你去的页面是需要权限但是你没有权限的情况
  if (!whitePaths.includes(to.path) && !store.get("auth")) {
    // 弹框提示用户没有权限
    notification.open({
      message: "警告",
      description: "当前用户没有权限，请先登录！",
    });
    // 将用户路由到获取auth的登录页面 并中断函数的继续执行
    return next("/authorization");
  }
  // 如果代码执行到这个位置 那么证明用户的auth一定是在的
  // 用户此时使用登录过的 有权限的
  // 当路由长度小于等于静态路由长度 表示此时用户的动态路由丢失 需要重新构建
  if (router.getRoutes().length <= 4 && !whitePaths.includes(to.path)) {
    // 在没有构建好动态路由之前 取消当前路由的动作
    next(false);
    // 获取本地存储中的菜单数据
    let userMenus = store.get("userMenus");
    // 如果本地存储菜单数据丢失
    if (!userMenus) {
      // 重新请求菜单数据（注意点：异步操作） 并缓存到本地
      getUserMenu().then(() => {
        userMenus = store.get("userMenus");
        // 构建动态路由
        buildDynamicRoutes(userMenus, router);
        // 恢复上次路由动作 并中断
        return next(to.path);
      });
    } else {
      // 比较幸运的是本地菜单数据未丢失 直接获取本地数据构建动态路由 并恢复路由跳转动作
      buildDynamicRoutes(userMenus, router);
      return next(to.path);
    }
  }
  // 正常路由
  next();
});
// 全局后置守卫
router.afterEach(() => {
  NProgress.done();
});
export default router;

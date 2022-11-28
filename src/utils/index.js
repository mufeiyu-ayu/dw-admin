import store from "storejs";
// 通过路径解析按需加载的组件的
function resolveComponent(url) {
  return (resolve) => require([`@/views/${url}.vue`], resolve);
}
// 给一维数组添加按需加载的组件
function addAsyncComponentToRoutes(routes) {
  routes.forEach((item) => {
    if (item.component.startsWith("views/"))
      item.component = item.component.replace("views/", "");
    item.component = resolveComponent(item.component);
  });
  return routes;
}
// 将带有按需加载组件的一维数组转化为树形结构
export function toTree(origin, result = [], id = 0, prefix) {
  for (const item of origin) {
    if (item.parent_id === id) {
      item.children = [];
      if (!item.path.startsWith("/")) {
        item.path = `${prefix}${prefix === "/" ? "" : "/"}${item.path}`;
      }
      result.push(item);
      toTree(origin, item.children, item.id, item.path);
    }
  }
  return result;
}
// 构建并添加动态路由
export function buildDynamicRoutes(routesLike, router) {
  // 保存生成的树状结构数据
  const tree = toTree(addAsyncComponentToRoutes(routesLike));
  // 保存到本地 以便在Layout中渲染一级菜单和侧边栏菜单
  store.set("tree", tree);
  // 添加动态路由
  tree.forEach((item) => router.addRoute(item));
}

export const checkPermission = (method, url) => {
  const permissions = store.get("userInfo")?.permissions ?? [];
  return permissions.includes(`${method}:${url}`);
};

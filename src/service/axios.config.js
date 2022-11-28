import { message } from "ant-design-vue";
import axios from "axios";
import store from "storejs";
import router from "@/router";
const request = axios.create({
  // baseURL: process.env.VUE_APP_BASEURL,
  timeout: 5000,
});
request.interceptors.request.use(function (config) {
  // 每一次请求的配置
  if (config.url !== "/api/v1/users/login") {
    const accessToken = store.get("auth")?.accessToken;
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  // const basePermissions = [
  //   "post:/api/v1/users/login",
  //   "post:/api/v1/users",
  //   "get:/api/v1/users/user_info",
  //   "get:/api/v1/menus/user_menus",
  // ];
  // const permissions = store.get("userInfo")?.permissions ?? basePermissions;
  // if (!permissions.includes(`${config.method}:${config.url}`)) {
  //   message.error("没有权限访问");
  //   return Promise.reject();
  // }
  return config;
  // 没有返回值 表示请求终止
});
request.interceptors.response.use(
  function (response) {
    if (response.config.url === "/api/v1/users/login") {
      store.set("auth", response.data.data);
    }
    // 如果code值不为0证明请求存在问题，统一做处理
    // 如果发送菜单请求,则将菜单数据存入本地存储中
    if (response.config.url === "/api/v1/menus/user_menus") {
      store.set("userMenus", response.data.data);
    }

    // 将用户信息保存到本地(含权限)
    if (response.url === "/api/users/user_info") {
      store.set("userInfo", response.data.data);
    }
    if (response.data.code !== 0) {
      Promise.reject(response);
    }
    return response.data;
  },
  // 请求失败，状态码部位2xxx，响应的code不为0
  (error) => {
    console.warn(error.response);
    message.error(error.response.data.msg);
    // 对于伪装token直接访问主页的情况
    if (error.status === 401) {
      // replace不带有历史记录，push跳转可以返回存在问题
      router.replace("/authorization");
    }
  }
);
export default request;

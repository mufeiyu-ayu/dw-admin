import request from "./axios.config";
// 获取用户菜单
export const getUserMenu = () => request.get("/api/v1/menus/user_menus");

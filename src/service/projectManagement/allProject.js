import request from "../axios.config";
// 获取用户菜单
export const getAllProject = (params) =>
  request.get(`/api/v1/projects/list?${params}`);

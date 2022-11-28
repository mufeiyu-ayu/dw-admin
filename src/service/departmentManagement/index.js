import request from "../axios.config";
// 获取用户菜单

//所有成员
const getAllPepple = () => request.get("api/v1/users/list?keyword=");
//新加入的成员
const newAddPeople = () =>
  request.get(
    "api/v1/users/list?keyword=&date_after_created=2022-10-19%2000%3A00%3A00"
  );
//未分配部门的成员
const unassignedPeople = () =>
  request.get("api/v1/users/list?keyword=&department_id=0");

//停用部门的成员
const deactivatePeople = () =>
  request.get("api/v1/users/list?keyword=&state=0");

//请求人
const resPeople = (offset) =>
  request.get(
    `/api/v1/users/list?keyword=&limit=6&department_id=0&offset=${offset}`
  );
// 判断要创建的项目是否已存在
const isExits = (data) => request.post("/api/v1/departments", data);
const fetch = () => request.get("/api/v1/departments/list");

// 搜索人员
const searchPeople = (value) =>
  request.get(`
api/v1/users/list?keyword=${value}&limit=6&department_id=0&offset=0`);
const renderFetchs = (id) =>
  request.get(`/api/v1/users/list?keyword=&department_id=${id}`);
export { isExits, fetch, renderFetchs, resPeople, searchPeople };
export default [
  getAllPepple,
  newAddPeople,
  unassignedPeople,
  deactivatePeople,
  "占位",
];

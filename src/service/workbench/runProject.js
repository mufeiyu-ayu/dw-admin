import request from "../axios.config";
const getRunProject = () =>
  request.get("/api/v1/projects/list?is_recycle=0&is_archived=0");

export { getRunProject };

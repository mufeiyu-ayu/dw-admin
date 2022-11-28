import request from "../axios.config";
const createProject = () =>
  request.get("api/v1/project_templates/list?limit=1000&offset=0");
// api/v1/projects
const addProject = (data) => request.post("api/v1/projects", data);
export { createProject, addProject };

import axiosInstance from "../apis/projects.instance";

const createProject = async (values) => {
  try {
    const response = await axiosInstance.post("projects/", values);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchProject = async () => {
  try {
    const response = await axiosInstance.get("/projects/");
    console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const projectService = {
  createProject,
  fetchProject,
};

import axios from "axios";

const API_URL = "/api/v1/tasks/";

const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("service", taskData);

  const response = await axios.post(API_URL, taskData, config);
  return response.data;
};

const getTasks = async (projectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};
const getTask = async (projectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + projectId.goal, config);
  return response.data;
};

const updateTask = async (taskData, token) => {
  console.log("service", taskData);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + taskData.taskId, taskData, config);
  return response.data;
};

const taskService = {
  createTask,
  getTasks,
  updateTask,
  getTask,
};

export default taskService;

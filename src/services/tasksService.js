import client from "./apiClient";

function extractData(res) {
  return res.data;
}

export function getTasks() {
  return client.get("/tasks").then(extractData);
}

export function updateTaskState(params) {
  return client.patch("/task", params);
}

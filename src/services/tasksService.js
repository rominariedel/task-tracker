import client from "./apiClient";

function extractData(res) {
  return res.data;
}

export function getTasks() {
  return client.get("/tasks").then(extractData);
}

export function updateTask(params) {
  return client.patch(`/tasks/${params.id}`, params).then(extractData);
}

export function createTask(params) {
  return client.post("/tasks", params).then(extractData);
}

export function deleteTask(id) {
  return client.delete(`/tasks/${id}`).then(extractData);
}

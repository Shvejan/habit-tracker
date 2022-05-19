import axios from "axios";

const TodoistApi = axios.create({
  baseURL: "https://api.todoist.com/rest/v1",
});

export const fetchTasks = async (token, setTasks) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  await TodoistApi.get("/tasks", config)
    .then((res) => {
      setTasks(res.data);
    })
    .catch(() => console.log("error in the api"));
};

export const closeTask = async (token, id) => {
  await fetch(`https://api.todoist.com/rest/v1/tasks/${id}/close`, {
    method: "post",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  }).catch(() => console.log("error in the api"));
};

export const reopenTask = async (token, id) => {
  await fetch(`https://api.todoist.com/rest/v1/tasks/${id}/reopen`, {
    method: "post",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  }).catch(() => console.log("error in the api"));
};

export const deleteTaskApi = async (token, id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  await TodoistApi.delete(`tasks/${id}`, config)
    .then((res) => {
      console.log("successful");
    })
    .catch((err) => console.log(err));
};

export const createTask = async (
  token,
  name,
  due_string = "today",
  project_id = null
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  await TodoistApi.post(
    "/tasks",
    { content: name, due_string: due_string, project_id: project_id },
    config
  )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

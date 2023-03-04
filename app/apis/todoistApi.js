import axios from "axios";

const TodoistApi = axios.create({
  baseURL: "https://api.todoist.com/rest/v1",
});

export const fetchTasks = async (token, setTasks) => {
  console.log("fetching tasks");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  await TodoistApi.get("/tasks", config)
    .then((res) => {
      setTasks(res.data);
    })
    .catch(() => console.log("fetching tasks error"));
};

export const fetchProjects = async (token, setProjects) => {
  console.log("fetching projects");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  await TodoistApi.get("/projects", config)
    .then((res) => {
      setProjects(res.data);
    })
    .catch(() => console.log("fetching projects error"));
};

export const closeTask = async (token, id) => {
  console.log("closing taks");
  await fetch(`https://api.todoist.com/rest/v1/tasks/${id}/close`, {
    method: "post",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  }).catch(() => console.log("closing task error"));
};

export const reopenTask = async (token, id) => {
  console.log("reopen taks");
  await fetch(`https://api.todoist.com/rest/v1/tasks/${id}/reopen`, {
    method: "post",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  }).catch(() => console.log("reopen taks error"));
};

export const deleteTaskApi = async (token, id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  await TodoistApi.delete(`tasks/${id}`, config)
    .then(() => {
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
export const editTaskApi = async (token, id, text, date) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  await TodoistApi.post(
    `/tasks/${id}`,
    { content: text, due_string: date },
    config
  )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

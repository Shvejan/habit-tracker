import axios from "axios";

const TodoistApi = axios.create({
  baseURL: "https://api.todoist.com/rest/v1",
});

export const fetchTasks = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log(token);
  await TodoistApi.get("/tasks", config)
    .then((res) => {
      console.log(res.data);
    })
    .catch(() => console.log("error in the api"));
};

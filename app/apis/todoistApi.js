import axios from "axios";

const TodoistApi = axios.create({
  baseURL: "https://api.todoist.com/rest/v1",
});

export const fetchTasks = async (token, setTasks) => {
  console.log(token);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  await TodoistApi.get("/tasks", config)
    .then((res) => {
      console.log(res.data);
      setTasks(res.data);
    })
    .catch(() => console.log("error in the api"));
};

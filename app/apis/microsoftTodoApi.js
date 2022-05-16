import axios from "axios";

const microsoftGraph = axios.create({
  baseURL: "https://graph.microsoft.com/v1.0/me/todo/lists/",
});

const loginUrl =
  "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a/oauth2/v2.0/token";
const microsoftLogin = axios.create({
  baseURL: loginUrl,
});
const params = {
  scope: "https://graph.microsoft.com/.default",
  grant_type: "client_credentials",
  client_id: "66980632-c278-4794-94fb-c5b914cc94a2",
  client_secret: "7B-8Q~vxggftC45SPwIitUtaRMbnw3lZsDWIscSo",
};

export const getAccessToken = async (settoken) => {
  const qs = require("qs");
  microsoftLogin
    .post("/", qs.stringify(params))
    .then((res) => {
      settoken(res.data.access_token);
    })
    .catch(() => console.log("auth error"));
};
export const fetchList = async (setTodoList, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log(token);
  await microsoftGraph
    .get("/", config)
    .then((res) => {
      const data = res.data.value;
      data.map((a) => console.log(a.displayName));
      setTodoList(res.data.value);
    })
    .catch(() => console.log("error in the api"));
};

export const fetchTasks = async (setTasks, id) => {
  await microsoftGraph
    .get(`/${id}/tasks`)
    .then((res) => {
      const data = res.data.value;
      data.map((a) => console.log(a.displayName));
      setTasks(res.data.value);
    })
    .catch(() => console.log("error in the api"));
};

export const updateTask = async (listid, id) => {
  await microsoftGraph
    .put(`/${listid}/tasks/${id}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch(() => console.log("error in the api"));
};

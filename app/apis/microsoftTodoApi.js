import axios from "axios";
const token =
  "EwCQA8l6BAAUkj1NuJYtTVha+Mogk+HEiPbQo04AAXXzfUMhNke5Ux7KKJ9W9XitPeO+keb2qUqBgM4FSnImEdr7qtt2kdM5gdrrKR4TyQXGe4t8twWCtvEfWPDarOZ1G+VLP+7TdwAl4+ofKl3NlMB9zfsj1UNqFrKeRSKWnbtO9WiWzQFOlyOxO9izkg+8492kDe0dxk+W5IRFZR9wLqm8b4LzUVRGCICyHPvPtxmpcj5Ue0FgGPr/CFBQweXwAa1ZkDhSdXL/gzfV9qTL094FpThSMe1PjEq9EuZzpQ/E2zfs9NPBY6XXOTV/9T23uuj2d2ag1P7xWoGr8ng0zmJEfYsv2lg7m08R3/InxsKmu8sqRR620rqa/x6ywGYDZgAACOZrokmQHKXvYAKeKoHOCSTvoJ1hEOvflk9dOg9mvm3WuqxElIAhMplQnxJqWP3UzUYjXkKarV7ENjp+rmhoWzvO4ubxsQnFfELDu5KP68IZlmEfcbiPuyc66456SzA3dev8EfGmW7Yc6nR7OWioHnWC/+VyA1jMspXYd2ioj1/8sJVEA6jbxypE/H0h/2vvO08OvX3ArDJp6l35Hnt0Fx5hT1p3FJ5QVwefEXWNkE0MtV0v4ONBackQoFpYNScNP+acj8fkeeAyubmc6mwzjFtkeYw5v0oPlL/njdtGBCqaAFNh2Ckf5V8ue3VZUAjTEZb+OqsZvtnhnqWgj/RsjcRI2NwlErddBPgIod7gDLLMQNgdfQYCMM22/7IITZn+vIl+axCgzgePMy4+OnvyIHlMT+eRfse6MhawVfpO7NYguMBRl3q0400XLgQS83Uhe75BAjoTB3cnwkysAJv54ucEr5Xwx33KVbDRfluPJMSYlWLRnR6EvR6so9coYnv+GRbgUFW3LTa0kkPBxJqIjl2Oz4qCEM8RHvL+pv9NK10PJgZcAn/cqJ2nfw8cf/h8Was6mHJHw8bTlbctDXP49DrwKNr1PdEnDNT/nwUSy/ei+HL6xvLZPowfbcM6T0zb35YtJX2N+8fSu8l8BDSoB9QkrNqpOs4Pp6Do/txlJXWqGrOSpSZarC5wFeSUJFqUde+ROdtc+nzJW3/oe1u5n5911uPj4qw6+/d+yiR2aLR5ge1/hZykHondNbc2qpwIfG0fmAQfEQ3R8g2fMjOG7T5Ivh1V36r7NdTZvXx0OLN6vW6n1WLSkbasjZcC";
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
const microsoftGraph = axios.create({
  baseURL: "https://graph.microsoft.com/v1.0/me/todo/lists/",
});

export const fetchList = async (setTodoList) => {
  await microsoftGraph
    .get("/")
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

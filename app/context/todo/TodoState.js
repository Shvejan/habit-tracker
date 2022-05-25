import React, { useEffect, useState } from "react";
import { createTask, deleteTaskApi, fetchTasks } from "../../apis/todoistApi";
import { event_project_id } from "../../config/constants";
import { TodoContext } from "./TodoContext";

export default function TodoState(props) {
  const [todoList, setTodoList] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [events, setEvents] = useState(null);
  const [token, settoken] = useState(
    "a1f538a295edb108a1534257d2b8a44663a66a33"
  );
  useEffect(() => {
    refreshTasks();
  }, [token]);

  useEffect(() => {
    if (tasks) filterEvents();
  }, [tasks]);

  const filterEvents = () => {
    var temp = tasks.filter((data) => data.project_id == event_project_id);
    temp.sort(function (a, b) {
      var c = new Date(a.due.date);
      var d = new Date(b.due.date);
      var now = new Date();
      return now - d - (now - c);
    });
    setEvents([...temp]);
  };

  const deleteTask = (id, taskId) => {
    var temp = tasks;
    temp.splice(id, 1);
    setTasks([...temp]);
    deleteTaskApi(token, taskId);
  };

  const deleteEvent = (id, taskId) => {
    var temp = events;
    temp.splice(id, 1);
    setEvents([...temp]);
    deleteTaskApi(token, taskId);
  };
  const refreshTasks = () => {
    fetchTasks(token, setTasks);
  };
  const addEvent = (text, date = "today", project_id = null) => {
    console.log(text);
    console.log(date);
    console.log(project_id);
    createTask(
      token,
      text,
      date.toString().split(" ").splice(1, 3).toString(),
      project_id
    ).then(refreshTasks);
  };
  return (
    <TodoContext.Provider
      value={{
        todoList,
        setTodoList,
        tasks,
        setTasks,
        token,
        settoken,
        events,
        deleteTask,
        deleteEvent,
        addEvent,
        refreshTasks,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

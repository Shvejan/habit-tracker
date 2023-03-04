import React, { useCallback, useEffect, useState } from "react";
import {
  createTask,
  deleteTaskApi,
  editTaskApi,
  fetchProjects,
  fetchTasks,
} from "../../apis/todoistApi";
import { event_project_id } from "../../config/constants";
import { TodoContext } from "./TodoContext";

export default function TodoState(props) {
  const [todoList, setTodoList] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [events, setEvents] = useState(null);
  const [projects, setprojects] = useState(null);
  const [token, settoken] = useState(
    "276d19c357360bc25055a752eef1f5aafe235f25"
  );
  useEffect(() => {
    refreshTasks();
  }, [token, refreshTasks]);

  useEffect(() => {
    if (tasks) filterEvents();
  }, [tasks, filterEvents]);

  const filterEvents = useCallback(() => {
    var temp = tasks.filter((data) => data.project_id == event_project_id);
    temp.sort(function (a, b) {
      var c = new Date(a.due.date);
      var d = new Date(b.due.date);
      var now = new Date();
      return now - d - (now - c);
    });
    setEvents([...temp]);
  }, [tasks]);

  const deleteTask = (id, taskId) => {
    var temp = tasks;
    temp = temp.filter((a) => a.id != taskId);
    setTasks([...temp]);
    deleteTaskApi(token, taskId).then(refreshTasks);
  };

  const refreshTasks = useCallback(() => {
    fetchTasks(token, setTasks);
    fetchProjects(token, setprojects);
  }, [token]);
  const getTaskInfo = (id) => {
    if (tasks) {
      var x = tasks.filter((data) => data.id == id);
      return x[0];
    }
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
  const editTask = (editTaskId, text, date) => {
    editTaskApi(token, editTaskId, text, date).then(refreshTasks);
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
        addEvent,
        refreshTasks,
        getTaskInfo,
        editTask,
        projects,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

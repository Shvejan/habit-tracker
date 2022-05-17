import React, { useEffect, useState } from "react";
import { createTask, deleteTaskApi, fetchTasks } from "../../apis/todoistApi";
import { TodoContext } from "./TodoContext";

const project_id = "2291643485";
export default function TodoState(props) {
  const [todoList, setTodoList] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [events, setEvents] = useState(null);
  const [token, settoken] = useState(
    "a1f538a295edb108a1534257d2b8a44663a66a33"
  );
  useEffect(() => {
    fetchTasks(token, setTasks);
  }, [token]);

  useEffect(() => {
    if (tasks) filterEvents();
  }, [tasks]);

  const filterEvents = () => {
    setEvents([...tasks.filter((data) => data.project_id == project_id)]);
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

  const addEvent = (text, date) => {
    createTask(
      token,
      text,
      date.toString().split(" ").splice(1, 3).toString(),
      project_id
    );
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
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

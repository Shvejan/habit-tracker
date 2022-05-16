import React, { useEffect, useState } from "react";
import { TodoContext } from "./TodoContext";
import { fetchList, fetchTasks } from "../../apis/microsoftTodoApi";
export default function TodoState(props) {
  const [todoList, setTodoList] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [token, settoken] = useState(null);
  useEffect(() => {
    fetchList(setTodoList);
  }, []);
  useEffect(() => {
    if (todoList) fetchTasks(setTasks, todoList[0].id);
  }, [todoList]);

  return (
    <TodoContext.Provider
      value={{ todoList, setTodoList, tasks, setTasks, token, settoken }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

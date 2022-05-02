import React, { useEffect, useState } from "react";
import { TodoContext } from "./TodoContext";
import { fetchList, fetchTasks } from "../../apis/microsoftTodoApi";
export default function TodoState(props) {
  const [todoList, setTodoList] = useState(null);
  const [tasks, setTasks] = useState(null);
  useEffect(() => {
    fetchList(setTodoList);
  }, []);
  useEffect(() => {
    if (todoList) fetchTasks(setTasks, todoList[0].id);
  }, [todoList]);

  return (
    <TodoContext.Provider value={{ todoList, setTodoList, tasks, setTasks }}>
      {props.children}
    </TodoContext.Provider>
  );
}

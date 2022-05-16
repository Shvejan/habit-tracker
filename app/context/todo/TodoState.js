import React, { useEffect, useState } from "react";
import { fetchTasks } from "../../apis/todoistApi";
import { TodoContext } from "./TodoContext";
export default function TodoState(props) {
  const [todoList, setTodoList] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [token, settoken] = useState(null);
  useEffect(() => {
    fetchTasks("a1f538a295edb108a1534257d2b8a44663a66a33", setTasks);
  }, []);

  return (
    <TodoContext.Provider
      value={{ todoList, setTodoList, tasks, setTasks, token, settoken }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

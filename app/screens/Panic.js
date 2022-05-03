import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useContext } from "react";
import { fetchList, getAccessToken } from "../apis/microsoftTodoApi";
import { TodoContext } from "../context/todo/TodoContext";
function Panic(props) {
  const { todoList, tasks, setTasks } = useContext(TodoContext);

  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", height: "100%" }}
    >
      <Pressable onPress={getAccessToken}>
        <Text>alkdsjf;alkjdf</Text>
      </Pressable>
      {tasks &&
        tasks.map(
          (a, i) => a.status != "completed" && <Text key={i}>{a.title}</Text>
        )}

      {todoList &&
        todoList.map(
          (a, i) =>
            a.status != "completed" && <Text key={i}>{a.displayName}</Text>
        )}
    </View>
  );
}

export default Panic;

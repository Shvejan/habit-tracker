import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { AntDesign } from "react-native-vector-icons";
import { TodoContext } from "../context/todo/TodoContext";
import { CheckBox } from "react-native-elements";
import { closeTask, createTask, reopenTask } from "../apis/todoistApi";

const state = { notStarted: false, completed: true };
export default function MainTodoList(props) {
  const { todoList, setTodoList, tasks, setTasks, token, deleteTask } =
    useContext(TodoContext);
  const renderLeftActions = (id, taskId) => {
    return (
      <TouchableOpacity
        onPress={() => deleteTask(id, taskId)}
        style={styles.deleteContainer}
      >
        <AntDesign name="delete" style={styles.delete} />
      </TouchableOpacity>
    );
  };
  const createANewTask = () => {
    createTask(token, "name s");
  };

  return (
    <View
      style={{
        width: "100%",
        marginHorizontal: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 30,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={styles.header}>Tasks</Text>
        <TouchableOpacity onPress={() => props.showTaskModel(true)}>
          <FontAwesome name="plus-circle" size={10} style={styles.header} />
        </TouchableOpacity>
      </View>
      {tasks &&
        tasks.map((data, i) => {
          if (data.due) {
            var currDate = new Date();
            // currDate = new Date(currDate + 330 * 60 * 1000);
            const dueDate = new Date(data.due.date);
            const shouldRender =
              currDate.toLocaleDateString("en-US") ==
              dueDate.toLocaleDateString("en-US");

            return (
              <Swipeable
                renderRightActions={() => renderLeftActions(i, data.id)}
                key={i}
              >
                {shouldRender && !data.completed && (
                  <RenderTask key={i} data={data} token={token} />
                )}
              </Swipeable>
            );
          }
        })}
    </View>
  );
}

const RenderTask = (props) => {
  const [value, setValue] = useState(false);

  const updateTask = (value) => {
    if (value) closeTask(props.token, props.data.id);
    else reopenTask(props.token, props.data.id);

    setValue(value);
  };
  return (
    <View>
      <View style={[styles.card]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CheckBox
            containerStyle={[styles.todoBg]}
            textStyle={styles.title}
            title={props.data.content}
            checked={value}
            onPress={() => updateTask(!value)}
            size={30}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    color: "white",
    fontSize: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "rgba(18, 25, 60, 0.8)",
    borderRadius: 15,
    alignItems: "center",
  },
  title: {
    color: "white",
    marginLeft: 10,
    fontSize: 15,
  },
  deleteContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  delete: {
    color: "red",
    fontSize: 28,
  },
  todoBg: {
    backgroundColor: "rgba(71, 255, 255, 0)",
    borderWidth: 0,
  },
});

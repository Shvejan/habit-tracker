import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { AntDesign } from "react-native-vector-icons";
import { TodoContext } from "../context/todo/TodoContext";
import { CheckBox } from "react-native-elements";
import { fetchTasks } from "../apis/todoistApi";

const state = { notStarted: false, completed: true };
export default function MainTodoList() {
  const { todoList, setTodoList, tasks, setTasks } = useContext(TodoContext);
  const renderLeftActions = (id) => {
    return (
      <TouchableOpacity
        onPress={() => deleteUpcomingEvent(id)}
        style={styles.deleteContainer}
      >
        <AntDesign name="delete" style={styles.delete} />
      </TouchableOpacity>
    );
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
        <TouchableOpacity>
          <FontAwesome name="plus-circle" size={10} style={styles.header} />
        </TouchableOpacity>
      </View>
      {tasks &&
        tasks.map((data, i) => {
          return (
            <Swipeable renderRightActions={() => renderLeftActions(i)} key={i}>
              {!data.completed && <RenderEvent key={i} data={data} />}
            </Swipeable>
          );
        })}
    </View>
  );
}

const RenderEvent = (props) => {
  const [value, setValue] = useState(state[props.data.status]);
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
            onPress={() => setValue(!value)}
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

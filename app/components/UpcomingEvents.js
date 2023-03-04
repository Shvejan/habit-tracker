import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Line from "./Line";
import { Swipeable } from "react-native-gesture-handler";
import { AntDesign } from "react-native-vector-icons";
import { TodoContext } from "../context/todo/TodoContext";
export default function UpcomingEvents(props) {
  const { events, deleteTask, refreshTasks } = useContext(TodoContext);

  const renderLeftActions = (id, taskId) => {
    return (
      <View style={styles.delEditView}>
        <TouchableOpacity
          onPress={() => {
            props.seteditTaskId(new Number(taskId));
            props.showEditTaskModel(true);
          }}
          style={styles.deleteContainer}
        >
          <FontAwesome name="edit" style={styles.edit} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteTask(id, taskId)}
          style={styles.deleteContainer}
        >
          <AntDesign name="delete" style={styles.delete} />
        </TouchableOpacity>
      </View>
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
          marginBottom: 20,
        }}
      >
        <Text style={styles.header}>Upcoming Events</Text>
        <TouchableOpacity
          onPress={() => props.showEventModel(true)}
          onLongPress={refreshTasks}
        >
          <FontAwesome name="plus-circle" size={10} style={styles.header} />
        </TouchableOpacity>
      </View>

      {events &&
        events.map((data, i) => (
          <Swipeable
            renderRightActions={() => renderLeftActions(i, data.id)}
            key={i}
          >
            <RenderEvent key={i} data={data} />
          </Swipeable>
        ))}
    </View>
  );
}

const RenderEvent = (props) => {
  const getTimeZoneTime = (propsDate) => {
    const date = new Date(propsDate);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date;
  };
  // eslint-disable-next-line no-unused-vars
  const [daysLeft, setdaysLeft] = useState(
    Math.ceil(
      (getTimeZoneTime(props.data.due.date) - Date.now()) /
        (1000 * 60 * 60 * 24)
    ) - 1
  );

  return (
    <View>
      {daysLeft > -1 && (
        <View style={[styles.card]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {getTimeZoneTime(props.data.due.date).toString().split("-")[1] && (
              <CalenderIcon date={props.data.due.date} />
            )}
            <Text style={styles.title}>{props.data.content}</Text>
          </View>
          <Text style={styles.text}>
            {daysLeft}
            {" days to go"}
          </Text>
        </View>
      )}
    </View>
  );
};

const CalenderIcon = (props) => {
  const date = new Date(props.date);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const day = date.toString().split(" ")[2];
  const month = date.toString().split(" ")[1].toUpperCase();
  return (
    <View style={styles.calender}>
      <Text style={[styles.calText, styles.calMonth]}>{month}</Text>
      <Line color="white" thickness={1} margin={1} />
      <Text style={[styles.calText, styles.calDate]}>{day}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 20,
    margin: 10,
    backgroundColor: "rgba(71, 255, 255, 0.3)",
    borderRadius: 15,
    alignItems: "center",
  },
  header: {
    color: "white",
    fontSize: 20,
  },
  calender: {
    backgroundColor: "black",
    color: "white",
    borderRadius: 5,
    paddingVertical: 3,
    alignItems: "center",
  },
  calText: {
    color: "white",
    fontWeight: "bold",
    paddingHorizontal: 8,
  },
  calDate: {
    fontSize: 14,
  },
  calMonth: {
    fontSize: 8,
  },
  text: {
    color: "white",
  },
  tinyLogo: {
    height: 40,
    width: 40,
  },
  title: {
    color: "white",
    marginLeft: 10,
    fontSize: 15,
  },
  delete: {
    color: "red",
    fontSize: 28,
  },
  edit: {
    color: "green",
    fontSize: 28,
  },
  deleteContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  delEditView: {
    flexDirection: "row",
  },
});

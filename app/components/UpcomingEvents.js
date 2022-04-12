import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { DataContext } from "../context/data/DataContext";
import { FontAwesome } from "@expo/vector-icons";
import Line from "./Line";
import { Swipeable } from "react-native-gesture-handler";
import { AntDesign } from "react-native-vector-icons";
export default function UpcomingEvents(props) {
  const { upcomingEvents, deleteUpcomingEvent } = useContext(DataContext);

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
        <Text style={styles.header}>Upcoming Events</Text>
        <TouchableOpacity onPress={() => props.showEventModel(true)}>
          <FontAwesome name="plus-circle" size={10} style={styles.header} />
        </TouchableOpacity>
      </View>

      {upcomingEvents &&
        upcomingEvents.map((data, i) => (
          <Swipeable renderRightActions={() => renderLeftActions(i)} key={i}>
            <RenderEvent key={i} data={data} />
          </Swipeable>
        ))}
    </View>
  );
}

const RenderEvent = (props) => {
  return (
    <View>
      <View style={[styles.card]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {props.data.date.toString().split(" ")[1] && (
            <CalenderIcon
              month={props.data.date.toString().split(" ")[1].toUpperCase()}
              date={props.data.date.toString().split(" ")[2]}
            />
          )}
          <Text style={styles.title}>{props.data.title}</Text>
        </View>
        <Text style={styles.text}>
          {Math.ceil((props.data.date - Date.now()) / (1000 * 60 * 60 * 24))}
          {" days to go"}
        </Text>
      </View>
    </View>
  );
};

const CalenderIcon = (props) => {
  return (
    <View style={styles.calender}>
      <Text style={[styles.calText, styles.calMonth]}>{props.month}</Text>
      <Line color="white" thickness={1} margin={1} />
      <Text style={[styles.calText, styles.calDate]}>{props.date}</Text>
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
  deleteContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
});

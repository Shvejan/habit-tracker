import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import ProgressBar from "./ProgressBar";
import { Ionicons } from "@expo/vector-icons";

function Card(props) {
  return (
    <TouchableOpacity onLongPress={props.showEditModel}>
      <View style={styles.card}>
        <ImageBackground
          source={{ uri: props.image }}
          resizeMode="cover"
          style={styles.bg}
        >
          <View style={styles.container}>
            <Ionicons
              name="alert-circle-sharp"
              size={10}
              color={props.data[0] > props.prev ? "green" : "red"}
              style={{ position: "absolute", top: 10, right: 10 }}
            />
            <Text style={styles.head}>{props.title}</Text>
            <ProgressBar
              radius={50}
              color={props.color}
              activeColor={props.activeColor}
              value={props.data[0] ? (props.data[0] * 100) / props.data[1] : 0}
              thickness={15}
              duration={500}
              hideText={true}
            />
            <Text
              style={styles.subtext}
            >{`${props.data[0]}/${props.data[1]}`}</Text>

            <View style={styles.btns}>
              <TouchableOpacity onPress={props.decHabitCounter}>
                <Ionicons
                  name="caret-down"
                  size={32}
                  color="white"
                  style={{ marginHorizontal: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={props.incHabitCounter}>
                <Ionicons
                  name="caret-up"
                  size={32}
                  color="white"
                  style={{ marginHorizontal: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  bg: {
    width: "100%",
  },
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(25, 26, 43, 0.7);",
  },

  card: {
    margin: 5,
    borderRadius: 10,

    overflow: "hidden",
  },
  head: {
    color: "white",
    fontSize: 15,
    marginBottom: 20,
  },
  subtext: {
    color: "white",
    fontSize: 18,
    position: "absolute",
    top: 96,

    fontWeight: "bold",
  },
  btns: {
    marginTop: 20,
    flexDirection: "row",
  },
});

export default Card;

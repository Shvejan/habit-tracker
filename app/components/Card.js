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
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: props.image }}
        resizeMode="cover"
        style={styles.bg}
      >
        <View style={styles.container}>
          <Text style={styles.head}>{props.title}</Text>
          <ProgressBar
            radius={50}
            color={props.color}
            activeColor={props.activeColor}
            value={(props.data[0] * 100) / props.data[1]}
            thickness={15}
          />
          <Text style={styles.head}>
            {props.data[0]}/{props.data[1]}
          </Text>
          <View style={styles.btns}>
            <TouchableOpacity>
              <Ionicons
                name="caret-down"
                size={32}
                color="white"
                style={{ marginHorizontal: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
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
  btns: {
    flexDirection: "row",
  },
});

export default Card;

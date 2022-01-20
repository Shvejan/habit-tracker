import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Hamburger(props) {
  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        paddingLeft: 10,
      }}
    >
      <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
        <Ionicons name="menu" size={40} style={{ color: "white" }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});

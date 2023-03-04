import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Hamburger(props) {
  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        paddingLeft: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
        <Ionicons name="menu" size={40} style={{ color: "white" }} />
      </TouchableOpacity>
      {props.showPanicBtn && (
        <TouchableOpacity onPress={() => alert("panic mode")}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginRight: 5,
            }}
          >
            <Ionicons
              name="md-alert-circle"
              size={30}
              style={{ color: "tomato" }}
            />
            <Text style={{ color: "white", fontSize: 6 }}>Panic Button</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

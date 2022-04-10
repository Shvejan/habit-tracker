import React from "react";
import { View } from "react-native";

function Line(props) {
  return (
    <View
      style={{
        borderColor: props.color,
        borderWidth: props.thickness,
        width: "95%",
        borderRadius: 10,
        backgroundColor: props.color,
        margin: props.margin ? props.margin : 20,
      }}
    />
  );
}

export default Line;

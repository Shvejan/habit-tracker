import React from "react";
import { Text, TouchableOpacity } from "react-native";
function TextButton(props) {
  return (
    <TouchableOpacity style={props.bgstyle} onPress={props.onPress}>
      <Text style={props.style}>{props.text}</Text>
    </TouchableOpacity>
  );
}
export default TextButton;

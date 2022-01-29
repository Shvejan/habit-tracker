import { StyleSheet, Text, View } from "react-native";
import React from "react";
export default function VariableList(props) {
  return (
    <View style={{ marginHorizontal: 50 }}>
      {props.data.map((a, i) => (
        <View
          key={i}
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Text style={styles.text}>{a.name}</Text>

          <Text style={styles.text}>{a.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 16,
    marginHorizontal: 15,
    marginVertical: 3,
  },
});

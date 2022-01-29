import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function VariableList() {
  return (
    <View style={{ marginHorizontal: 50 }}>
      {props.data.map((a, i) => (
        <View
          key={i}
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Text style={styles.text}>{a.name}</Text>
          <FontAwesome5
            name="equals"
            size={15}
            color="white"
            style={{ marginHorizontal: 20, marginVertical: 3 }}
          />

          <Text style={styles.text}>{a.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});

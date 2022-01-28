import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Suggestions() {
  return (
    <View>
      <Text style={styles.toolhead}>Loose 13 days</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toolhead: {
    fontSize: 15,
    color: "white",
    fontWeight: "700",
  },
});

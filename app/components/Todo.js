import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Todo() {
  return (
    <View>
      <Text style={styles.text}>this is the dodo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
});

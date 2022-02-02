import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { DataContext } from "../context/data/DataContext";

export default function Suggestions() {
  const { fvalue, days } = useContext(DataContext);

  return (
    <View>
      <Text style={styles.toolhead}>{JSON.stringify(fvalue)}</Text>
      <Text style={styles.toolhead}>{days}</Text>
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

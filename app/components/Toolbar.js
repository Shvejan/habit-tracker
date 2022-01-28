import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { DataContext } from "../context/data/DataContext";

export default function Toolbar(props) {
  const { best, attempts } = useContext(DataContext);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={styles.toolhead}>Best</Text>
        <Text style={styles.toolsubhead}>{best} days</Text>
      </View>
      <View style={{ alignItems: "center", marginLeft: 30 }}>
        <TouchableOpacity onPress={() => props.showModel(true)}>
          <MaterialCommunityIcons name="meditation" size={40} color={"white"} />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.toolhead}>Attempts</Text>
        <Text style={styles.toolsubhead}>{attempts} times</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toolhead: {
    fontSize: 15,
    color: "white",
    fontWeight: "700",
  },
  toolsubhead: {
    fontSize: 13,
    color: "white",
    fontWeight: "500",
  },
});

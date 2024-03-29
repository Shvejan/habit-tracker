import React, { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { fetchTasks } from "../apis/todoistApi";
import { Picker } from "@react-native-picker/picker";
function Panic() {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => fetchTasks("a1f538a295edb108a1534257d2b8a44663a66a33")}
      >
        <ProjectSelector />
      </Pressable>
    </View>
  );
}
const ProjectSelector = () => {
  const [selectedValue, setSelectedValue] = useState("java");
  return (
    <View style={styles.pickercontainer}>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
        <Picker.Item label="Python" value="python" />
        <Picker.Item label="Haxe" value="haxe" />
      </Picker>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pickercontainer: {
    width: 150,
    backgroundColor: "grey",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    height: 30,
  },
});
export default Panic;

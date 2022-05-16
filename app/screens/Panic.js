import React, { useState } from "react";
import { View, Text, Pressable, Button, StyleSheet } from "react-native";
import { useContext } from "react";
import { fetchList, getAccessToken } from "../apis/microsoftTodoApi";
import { TodoContext } from "../context/todo/TodoContext";
import * as AuthSession from "expo-auth-session";
import { openAuthSession } from "azure-ad-graph-expo";
import { fetchTasks } from "../apis/todoistApi";
function Panic(props) {
  const [ans, setans] = useState(null);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => fetchTasks("a1f538a295edb108a1534257d2b8a44663a66a33")}
      >
        <Text>call</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Panic;

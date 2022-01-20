import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./app/routes/AuthStack";
import AppStack from "./app/routes/AppStack";
import { AuthContext } from "./app/utils/context";
export default function App() {
  const [login, setLogin] = useState(true);
  return (
    <AuthContext.Provider value={setLogin}>
      <NavigationContainer>
        {login && <AppStack />}
        {!login && <AuthStack />}
        <StatusBar style="light" />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import AuthStack from "../routes/AuthStack";
import AppStack from "../routes/AppStack";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/auth/AuthContext";
import DataState from "../context/data/DataState";

export default function Main() {
  const { login } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {login && (
        <DataState>
          <AppStack />
        </DataState>
      )}
      {!login && <AuthStack />}
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

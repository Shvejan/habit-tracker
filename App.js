import React from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";

import AuthState from "./app/context/auth/AuthState";
import Main from "./app/components/Main";

export default function App() {
  return (
    <AuthState>
      <Main />
    </AuthState>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

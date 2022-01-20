import React from "react";
import WelcomeScreen from "../screens/WelcomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function AuthStack(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={WelcomeScreen} name="WelcomeScreen" />
    </Stack.Navigator>
  );
}

export default AuthStack;

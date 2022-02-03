import React from "react";
import WelcomeScreen from "../screens/WelcomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/Splash";

const Stack = createNativeStackNavigator();

function AuthStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Stack.Screen component={Splash} name="Splash" />
      <Stack.Screen component={WelcomeScreen} name="WelcomeScreen" />
    </Stack.Navigator>
  );
}

export default AuthStack;

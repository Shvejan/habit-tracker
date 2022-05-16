import React from "react";
import Dashboard from "../screens/Dashboard";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Settings from "../screens/Settings";
import Panic from "../screens/Panic";
import Stats from "../screens/Stats";
import CustomDrawer from "../components/CustomDrawer";
import Ionicons from "react-native-vector-icons/Ionicons";
const Drawer = createDrawerNavigator();
function AppStack(props) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "brown",

        drawerInactiveTintColor: "white",
        drawerLabelStyle: {
          fontSize: 20,
          marginLeft: -20,
        },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Stats"
        component={Stats}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="stats-chart" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="ios-settings" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Panic"
        component={Panic}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="alert-circle" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default AppStack;

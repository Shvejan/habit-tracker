import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import Dashboard from "./Dashboard";
import WelcomeScreen from "./WelcomeScreen";
function Main(props) {
  const [currentTab, setCurrentTab] = useState("Home");
  const [showMenu, setShowMenu] = useState(false);

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "flex-start", padding: 15 }}>
        <Ionicons
          name={"person"}
          size={32}
          color="white"
          style={{
            marginTop: 40,
            marginLeft: 15,
          }}
        />

        <Text style={styles.username}>Shvejan Shashank</Text>

        <TouchableOpacity>
          <Text style={styles.viewprofile}>View Profile</Text>
        </TouchableOpacity>

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {TabButton(currentTab, setCurrentTab, "Home", "home")}
          {TabButton(currentTab, setCurrentTab, "Search", "search")}
          {TabButton(
            currentTab,
            setCurrentTab,
            "Notification",
            "notifications"
          )}
          {TabButton(currentTab, setCurrentTab, "Settings", "settings")}
        </View>
        <View>{TabButton(currentTab, setCurrentTab, "LogOut", "exit")}</View>
      </View>
      <Animated.View
        style={{
          backgroundColor: colors.background,
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: showMenu ? 15 : 0,
          transform: [{ scale: scaleValue }, { translateX: offsetValue }],
        }}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: closeButtonOffset,
              },
            ],
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Animated.timing(scaleValue, {
                toValue: showMenu ? 1 : 0.88,
                duration: 200,
                useNativeDriver: true,
              }).start();

              Animated.timing(offsetValue, {
                toValue: showMenu ? 0 : 230,
                duration: 200,
                useNativeDriver: true,
              }).start();

              Animated.timing(closeButtonOffset, {
                toValue: !showMenu ? -20 : 0,
                duration: 200,
                useNativeDriver: true,
              }).start();

              setShowMenu(!showMenu);
            }}
          >
            <Ionicons
              name={showMenu ? "close" : "menu"}
              size={32}
              color="white"
              style={{
                marginTop: 40,
                marginLeft: 15,
              }}
            />
          </TouchableOpacity>

          {currentTab === "Home" && <Dashboard />}
          {currentTab === "Notification" && <WelcomeScreen />}
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const TabButton = (currentTab, setCurrentTab, title, image) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setCurrentTab(title);
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          backgroundColor: currentTab == title ? "white" : "transparent",
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
          marginTop: 15,
        }}
      >
        <Ionicons name={image} size={32} color="black" style={{}} />

        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            paddingLeft: 15,
            color: currentTab == title ? "#5359D1" : "white",
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#5359D1",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },
  viewprofile: {
    marginTop: 6,
    color: "white",
  },
});
export default Main;

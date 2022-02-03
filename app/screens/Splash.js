import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
export default function Splash(props) {
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setloading(true);
    }, 2000);
  }, []);
  useEffect(() => {
    if (loading) {
      props.navigation.replace("WelcomeScreen");
    }
  }, [loading, props.navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/11755-moon-run.json")}
        autoPlay
        loop
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "black",
  },
});

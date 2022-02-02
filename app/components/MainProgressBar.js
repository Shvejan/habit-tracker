import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { startTimer } from "../math/TimeCalc";
import ProgressBar from "./ProgressBar";
import { DataContext } from "../context/data/DataContext";

export default function MainProgressBar() {
  const { value, streak, updateStreak, lastrelapse, days } =
    useContext(DataContext);

  const [timer, setTimer] = useState(startTimer(lastrelapse));
  useEffect(() => {
    const interval = setInterval(() => {
      let time = startTimer(lastrelapse);
      if (time[0] != streak) {
        updateStreak(time[0]);
      }
      setTimer(time);
    }, 1000);
    return () => clearInterval(interval);
  }, [lastrelapse, streak, timer]);

  return (
    <View style={{ alignItems: "center" }}>
      <ProgressBar
        radius={110}
        color={"#2ecc71"}
        activeColor="green"
        value={days ? (value * 100) / days : 0}
        thickness={15}
      />
      <Text style={styles.countdown}>
        {timer[0]} days {timer[1]}h {timer[2]}m {timer[3]}s
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  countdown: {
    color: "white",
    fontSize: 20,
  },
});

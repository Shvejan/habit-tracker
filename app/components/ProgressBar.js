import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
function ProgressBar(props) {
  return (
    <View style={styles.container}>
      <CircularProgress
        radius={props.radius}
        value={props.value}
        textColor="white"
        fontSize={20}
        valueSuffix={props.maxValue ? `/${props.maxValue}` : "%"}
        inActiveStrokeColor={props.color ? props.color : "pink"}
        activeStrokeColor={props.activeColor}
        activeStrokeWidth={props.thickness}
        inActiveStrokeOpacity={0.2}
        inActiveStrokeWidth={props.thickness}
        duration={props.duration ? props.duration : 3000}
        maxValue={props.maxValue ? props.maxValue : 100}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
});
export default ProgressBar;

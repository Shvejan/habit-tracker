import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
function ProgressBar(props) {
  const [value, setValue] = useState(0);

  return (
    <View style={styles.container}>
      <CircularProgress
        radius={props.radius}
        value={props.value}
        textColor="white"
        fontSize={20}
        valueSuffix={"%"}
        inActiveStrokeColor={props.color ? props.color : "pink"}
        activeStrokeColor={props.activeColor}
        activeStrokeWidth={props.thickness}
        inActiveStrokeOpacity={0.2}
        inActiveStrokeWidth={props.thickness}
        duration={3000}
        onAnimationComplete={() => setValue(50)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
});
export default ProgressBar;

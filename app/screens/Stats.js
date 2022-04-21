import React, { useContext } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import Hamburger from "../components/Hamburger";
import colors from "../config/colors";
import { DataContext } from "../context/data/DataContext";

function Stats(props) {
  const { periodicData, nonPeriodicData } = useContext(DataContext);
  return (
    <View style={styles.safearea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Hamburger {...props} />
          <Text style={styles.text}>{JSON.stringify(periodicData)}</Text>
          <Text style={styles.text}>asdfasdf</Text>

          <Text style={styles.text}>{JSON.stringify(nonPeriodicData)}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    // backgroundColor: "white",
    alignItems: "center",
    flex: 1,
    height: 500,

    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
  },

  safearea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  text: {
    color: "white",
  },
});
export default Stats;

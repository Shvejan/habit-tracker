import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import Line from "../components/Line";
import ActivityModel from "../components/ActivityModel";
import colors from "../config/colors";
import Hamburger from "../components/Hamburger";
import HabitModel from "../components/HabitModel";
import { DataContext } from "../context/data/DataContext";
import Toolbar from "../components/Toolbar";
import Suggestions from "../components/Suggestions";
import ThumbnailList from "../components/ThumbnailList";
import CardList from "../components/CardList";
import MainProgressBar from "../components/MainProgressBar";

function Dashboard(props) {
  const [habitModel, showHabitModel] = useState(false);
  const [actionModel, showActionModel] = useState(false);
  const {
    value,
    cards,
    addCards,
    streak,
    updateStreak,
    best,
    attempts,
    lastrelapse,
    fvalue,
    days,
  } = useContext(DataContext);

  const addNewCard = (info) => {
    if (cards === null) {
      addCards([info]);
    } else {
      addCards([...cards, info]);
    }
    showHabitModel(false);
  };

  return (
    <View style={styles.safearea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Hamburger {...props} />
          <MainProgressBar />
          <Line color="grey" thickness={1} />
          <Toolbar showModel={showActionModel} />
          <Line color="grey" thickness={1} />
          <Suggestions />
          <Text style={{ color: "white" }}>
            streak = {streak} value = {value} f = {fvalue} days = {days}
          </Text>
          <Line color="grey" thickness={1} />

          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <CardList showModel={showHabitModel} visible={habitModel} />
          </ScrollView>
          <Line color="grey" thickness={1} />
          <ThumbnailList />
        </View>
      </ScrollView>
      <ActivityModel visible={actionModel} showModel={showActionModel} />
      <HabitModel
        visible={habitModel}
        showModel={showHabitModel}
        addNewCard={addNewCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    alignItems: "center",
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
  },

  safearea: {
    backgroundColor: colors.background,
  },
});
export default Dashboard;

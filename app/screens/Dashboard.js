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
import Toolbar from "../components/Toolbar";
import Suggestions from "../components/Suggestions";
import ThumbnailList from "../components/ThumbnailList";
import CardList from "../components/CardList";
import MainProgressBar from "../components/MainProgressBar";
import UpcomingEvents from "../components/UpcomingEvents";
import EventModel from "../components/EventModel";

function Dashboard(props) {
  const [habitModel, showHabitModel] = useState(false);
  const [actionModel, showActionModel] = useState(false);
  const [editModel, showEditModel] = useState(false);
  const [id, setid] = useState(null);
  const [eventModel, showEventModel] = useState(false);
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

          <Line color="grey" thickness={1} />

          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <CardList
              showModel={showHabitModel}
              showEditModel={showEditModel}
              setid={setid}
            />
          </ScrollView>
          <Line color="grey" thickness={1} />
          <UpcomingEvents showEventModel={showEventModel} />
          <Line color="grey" thickness={1} />
          <ThumbnailList />
        </View>
      </ScrollView>
      <ActivityModel visible={actionModel} showModel={showActionModel} />
      <HabitModel visible={habitModel} showModel={showHabitModel} />
      <HabitModel
        visible={editModel}
        showModel={showEditModel}
        id={id}
        edit={true}
      />
      <EventModel visible={eventModel} showModel={showEventModel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    // backgroundColor: "white",
    alignItems: "center",
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
  },

  safearea: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
export default Dashboard;

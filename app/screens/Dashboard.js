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
import MainTodoList from "../components/MainTodoList";
import { event_project_id } from "../config/constants";

function Dashboard(props) {
  const [habitModel, showHabitModel] = useState(false);
  const [actionModel, showActionModel] = useState(false);
  const [editModel, showEditModel] = useState(false);
  const [id, setid] = useState(null);
  const [eventModel, showEventModel] = useState(false);
  const [taskModel, showTaskModel] = useState(false);
  const [editTaskModel, showEditTaskModel] = useState(false);
  const [editTaskId, seteditTaskId] = useState(null);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  return (
    <View style={styles.safearea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Hamburger {...props} showPanicBtn />
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
          <UpcomingEvents
            showEventModel={showEventModel}
            showEditTaskModel={showEditTaskModel}
            seteditTaskId={seteditTaskId}
          />
          <Line color="grey" thickness={1} />
          <MainTodoList
            showTaskModel={showTaskModel}
            showEditTaskModel={showEditTaskModel}
            seteditTaskId={seteditTaskId}
            setCurrentProjectId={setCurrentProjectId}
          />
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
      <EventModel
        visible={eventModel}
        showModel={showEventModel}
        project_id={event_project_id}
      />
      <EventModel
        visible={taskModel}
        showModel={showTaskModel}
        project_id={currentProjectId}
      />
      <EventModel
        visible={editTaskModel}
        showModel={showEditTaskModel}
        project_id={null}
        editTaskId={editTaskId}
      />
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
  title: {
    color: "white",
  },
});
export default Dashboard;

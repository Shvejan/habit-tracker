import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Card from "../components/Card";
import Line from "../components/Line";
import ProgressBar from "../components/ProgressBar";
import ActivityModel from "../components/ActivityModel";
import colors from "../config/colors";
import { startTimer } from "../math/TimeCalc";
import booksImage from "../assets/book.jpeg";
import showerImage from "../assets/shower.jpeg";
import thumbnailImage from "../assets/thumbnail.jpg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Hamburger from "../components/Hamburger";
import HabitModel from "../components/HabitModel";
import { DataContext } from "../context/data/DataContext";

const thumbnailData = [
  {
    image: thumbnailImage,
  },
  {
    image: thumbnailImage,
  },
  {
    image: thumbnailImage,
  },
];
function Dashboard(props) {
  const [habitModel, showHabitModel] = useState(false);
  const [actionModel, showActionModel] = useState(false);
  const {
    value,
    cards,
    addCards,
    streak,
    setstreak,
    best,
    attempts,
    lastrelapse,
    fvalue,
    days,
    daychanged,
  } = useContext(DataContext);

  const addNewCard = (info) => {
    addCards([info]);
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
          <MainProgressBar
            value={days ? (value * 100) / days : 0}
            lastrelapse={lastrelapse}
            setstreak={setstreak}
            streak={streak}
            daychanged={daychanged}
          />
          <Line color="grey" thickness={1} />
          <Toolbar
            showModel={showActionModel}
            best={best}
            attempts={attempts}
          />
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
            <CardList
              data={cards}
              showModel={showHabitModel}
              visible={habitModel}
            />
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

const Suggestions = () => {
  return (
    <View>
      <Text style={styles.toolhead}>Loose 13 days</Text>
    </View>
  );
};
const Toolbar = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={styles.toolhead}>Best</Text>
        <Text style={styles.toolsubhead}>{props.best} days</Text>
      </View>
      <View style={{ alignItems: "center", marginLeft: 30 }}>
        <TouchableOpacity onPress={() => props.showModel(true)}>
          <MaterialCommunityIcons name="meditation" size={40} color={"white"} />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.toolhead}>Attempts</Text>
        <Text style={styles.toolsubhead}>{props.attempts} times</Text>
      </View>
    </View>
  );
};

const CardList = (props) => {
  return (
    <View style={styles.horizontal}>
      {props.data.map((a, i) => (
        <Card
          image={a["image"]}
          activeColor={a["color"]}
          title={a["title"]}
          data={a["data"]}
          key={i}
        />
      ))}
      <View style={styles.card}>
        <TouchableOpacity onPress={() => props.showModel(!props.visible)}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="heart-plus"
              size={60}
              color={"maroon"}
            />
            <Text
              style={{
                color: "white",
                fontSize: 25,
                marginTop: 20,
                fontWeight: "bold",
              }}
            >
              Add New
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ThumbnailList = () => {
  return (
    <View style={styles.discover}>
      {thumbnailData.map((a, i) => (
        <Image source={a["image"]} style={styles.thumbnail} key={i} />
      ))}
    </View>
  );
};

const MainProgressBar = (props) => {
  const [timer, setTimer] = useState(startTimer(props.lastrelapse));
  useEffect(() => {
    const interval = setInterval(() => {
      let time = startTimer(props.lastrelapse);
      if (time[2] != props.streak) {
        props.setstreak(time[2]);
      }
      setTimer(time);
    }, 1000);
    return () => clearInterval(interval);
  }, [props.lastrelapse]);

  return (
    <View style={{ alignItems: "center" }}>
      <ProgressBar
        radius={110}
        color={"#2ecc71"}
        activeColor="green"
        value={props.value}
        thickness={15}
      />
      <Text style={styles.countdown}>
        {timer[0]} days {timer[1]}h {timer[2]}m {timer[3]}s
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toolhead: {
    fontSize: 15,
    color: "white",
    fontWeight: "700",
  },
  toolsubhead: {
    fontSize: 13,
    color: "white",
    fontWeight: "500",
  },

  discover: {
    paddingVertical: 50,
  },
  container: {
    backgroundColor: colors.background,
    alignItems: "center",
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
  },
  countdown: {
    color: "white",
    fontSize: 20,
  },
  card: {
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(25, 26, 43)",
    paddingHorizontal: 25,
    height: 256,
  },
  horizontal: {
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 10,
    paddingBottom: 30,
  },
  image: {
    height: 400,
    width: 250,
  },
  thumbnail: {
    height: 210,
    resizeMode: "contain",
    marginVertical: 20,
  },
  safearea: {
    backgroundColor: colors.background,
  },
});
export default Dashboard;

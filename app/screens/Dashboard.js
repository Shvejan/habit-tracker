import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import Card from "../components/Card";
import Line from "../components/Line";
import ProgressBar from "../components/ProgressBar";
import colors from "../config/colors";
import { startTimer } from "../math/TimeLeft";
import booksImage from "../assets/book.jpeg";
import showerImage from "../assets/shower.jpeg";
import thumbnailImage from "../assets/thumbnail.jpg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Hamburger from "../components/Hamburger";

const cards = [
  {
    image: booksImage,
    title: "READING",
    color: "pink",
    activeColor: "purple",
    data: [1, 3],
  },
  {
    image: showerImage,
    title: "COLDSHOWER",
    color: "red",
    activeColor: "cyan",
    data: [1, 3],
  },
  {
    image: booksImage,
    title: "READING",
    color: "pink",
    activeColor: "purple",
    data: [7, 9],
  },
  {
    image: showerImage,
    title: "COLDSHOWER",
    color: "red",
    activeColor: "cyan",
    data: [30, 44],
  },
];
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
          <Toolbar />
          <Line color="grey" thickness={1} />
          <Suggestions />
          <Line color="grey" thickness={1} />

          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <CardList data={cards} />
          </ScrollView>
          <Line color="grey" thickness={1} />
          <ThumbnailList />
        </View>
      </ScrollView>
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
const Toolbar = () => {
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
        <Text style={styles.toolsubhead}>3 days</Text>
      </View>
      <View style={{ alignItems: "center", marginLeft: 30 }}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="meditation" size={40} color={"white"} />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.toolhead}>Attempts</Text>
        <Text style={styles.toolsubhead}>3 times</Text>
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
          color={a["color"]}
          activeColor={a["activeColor"]}
          title={a["title"]}
          data={a["data"]}
          key={i}
        />
      ))}
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

const MainProgressBar = () => {
  const [timer, setTimer] = useState("0");
  // useEffect(() => startTimer(setTimer));
  return (
    <View style={{ alignItems: "center" }}>
      <ProgressBar
        radius={110}
        color={"#2ecc71"}
        activeColor="green"
        value={80}
        thickness={15}
      />
      <Text style={styles.countdown}>
        {timer[0]} days {timer[1]} h {timer[2]} m {timer[3]} s left
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
    borderRadius: 20,
    padding: 10,
    backgroundColor: "rgb(25, 26, 43)",
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

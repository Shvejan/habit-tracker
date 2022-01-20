import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Image,
} from "react-native";
import Card from "../components/Card";
import Line from "../components/Line";
import ProgressBar from "../components/ProgressBar";
import colors from "../config/colors";
import { startTimer } from "../math/TimeLeft";
import booksImage from "../assets/book.jpeg";
import showerImage from "../assets/shower.jpeg";
import thumbnailImage from "../assets/thumbnail.jpg";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
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
    <SafeAreaView style={{ backgroundColor: colors.background }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ position: "absolute", width: "100%", paddingTop: 30 }}>
            <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
              <Ionicons
                name="menu"
                size={40}
                style={{ color: "white", left: 30 }}
              />
            </TouchableOpacity>
          </View>
          <MainProgressBar />
          <Line color="grey" thickness={1} />
          <ScrollView horizontal>
            <CardList data={cards} />
          </ScrollView>
          <Line color="grey" thickness={1} />
          <ThumbnailList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
        radius={130}
        color={"#2ecc71"}
        activeColor="green"
        value={80}
        thickness={30}
      />
      <Text style={styles.countdown}>
        {timer[0]} days {timer[1]} h {timer[2]} m {timer[3]} s left
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  discover: {
    paddingVertical: 50,
  },
  container: {
    backgroundColor: colors.background,
    alignItems: "center",
    flex: 1,
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
});
export default Dashboard;

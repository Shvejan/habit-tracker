import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Card from "./Card";
import { DataContext } from "../context/data/DataContext";

export default function CardList(props) {
  const { cards } = useContext(DataContext);
  return (
    <View style={styles.horizontal}>
      {cards != null &&
        typeof cards != "string" &&
        cards.map((a, i) => (
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
          <View style={styles.addCard}>
            <MaterialCommunityIcons
              name="heart-plus"
              size={60}
              color={"maroon"}
            />
            <Text style={styles.text}>Add New</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 10,
    paddingBottom: 30,
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
  text: {
    color: "white",
    fontSize: 25,
    marginTop: 20,
    fontWeight: "bold",
  },
  addCard: {
    justifyContent: "center",
    alignItems: "center",
  },
});

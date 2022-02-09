import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Card from "./Card";
import { DataContext } from "../context/data/DataContext";

export default function CardList(props) {
  const { cards, incHabitCounter, decHabitCounter } = useContext(DataContext);
  let cards1 = [],
    cards2 = [],
    cardsLen = 0;
  if (cards != null && cards != undefined && cards.length > 0) {
    cards1 = cards.slice(0, cards.length / 2 + 1);
    cards2 = cards.slice(cards.length / 2 + 1);
    cardsLen = cards.length / 2 + 1;
  }
  return (
    <View>
      <View style={styles.horizontal}>
        {cards1.map((a, i) => (
          <Card
            image={a["image"]}
            activeColor={a["color"]}
            title={a["title"]}
            data={a["data"]}
            prev={a.prev}
            key={i}
            incHabitCounter={() => incHabitCounter(i)}
            decHabitCounter={() => decHabitCounter(i)}
            showEditModel={() => {
              props.setid(i);
              props.showEditModel(true);
            }}
          />
        ))}
      </View>
      <View style={styles.horizontal}>
        {cards2.map((a, i) => (
          <Card
            image={a["image"]}
            activeColor={a["color"]}
            title={a["title"]}
            data={a["data"]}
            prev={a.prev}
            key={cardsLen + i}
            incHabitCounter={() => incHabitCounter(cardsLen + i)}
            decHabitCounter={() => decHabitCounter(cardsLen + i)}
            showEditModel={() => {
              props.setid(cardsLen + i);
              props.showEditModel(true);
            }}
          />
        ))}
        <View style={styles.card}>
          <TouchableOpacity onPress={() => props.showModel(true)}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    // justifyContent: "space-around",
    flexDirection: "row",
    padding: 10,
  },
  card: {
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(25, 26, 43)",
    paddingHorizontal: 25,
    height: 236,
  },
  text: {
    color: "white",
    fontSize: 23,
    marginTop: 20,
    fontWeight: "bold",
  },
  addCard: {
    justifyContent: "center",
    alignItems: "center",
  },
});

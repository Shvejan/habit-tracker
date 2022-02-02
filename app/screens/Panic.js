import React from "react";
import { View, Text, Pressable } from "react-native";
import { uploadImage } from "../config/firebase";
import { useContext } from "react";
import { DataContext } from "../context/data/DataContext";
function Panic(props) {
  const { cards } = useContext(DataContext);
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", height: "100%" }}
    >
      <Pressable onPress={() => uploadImage(cards[0].image, "1")}>
        <Text>Panic page</Text>
      </Pressable>
    </View>
  );
}

export default Panic;

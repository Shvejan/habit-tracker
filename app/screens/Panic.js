import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { uploadImage, downloadImage, saveImage } from "../config/firebase";
import { useContext } from "react";
import { DataContext } from "../context/data/DataContext";
function Panic(props) {
  const { cards } = useContext(DataContext);
  const [image, setimage] = useState(null);
  const url =
    "https://firebasestorage.googleapis.com/v0/b/habit-tracker-8973e.appspot.com/o/1?alt=media&token=55ecf8da-d50e-46cf-940b-208d415c937e";
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", height: "100%" }}
    >
      <Pressable onPress={() => uploadImage(cards[0].image, "1")}>
        <Text>Panic page</Text>
      </Pressable>
      <Pressable onPress={() => downloadImage("1", setimage)}>
        <Text>downloadImage</Text>
      </Pressable>

      <Image
        style={{ width: 100, height: 100 }}
        source={{
          uri: url,
        }}
      />
      <Pressable onPress={() => saveImage(url)}>
        <Text>saveimate</Text>
      </Pressable>
    </View>
  );
}

export default Panic;

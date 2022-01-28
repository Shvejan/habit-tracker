import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import thumbnailImage from "../assets/thumbnail.jpg";

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

export default function ThumbnailList() {
  return (
    <View style={styles.discover}>
      {thumbnailData.map((a, i) => (
        <Image source={a["image"]} style={styles.thumbnail} key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  discover: {
    paddingVertical: 50,
  },
  thumbnail: {
    height: 210,
    resizeMode: "contain",
    marginVertical: 20,
  },
});

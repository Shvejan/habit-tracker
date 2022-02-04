import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchVideos } from "../apis/youtubeapi";
import * as Linking from "expo-linking";
export default function ThumbnailList() {
  const [thumbnailData, setthumbnailData] = useState([]);
  useEffect(() => {
    fetchVideos(setthumbnailData);
  }, []);
  const openUrl = (url) => {
    Linking.openURL(`https://youtu.be/${url}`);
    // console.log(url);
  };
  return (
    <View style={styles.discover}>
      {thumbnailData.map((a, i) => (
        <Pressable onPress={() => openUrl(a.url)} key={i}>
          <Image source={{ uri: a.image }} style={styles.thumbnail} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  discover: {
    width: "100%",
    paddingVertical: 10,
  },
  thumbnail: {
    height: 280,
    resizeMode: "contain",
    marginVertical: 20,
  },
});

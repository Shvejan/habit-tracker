import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchVideos } from "../apis/youtubeapi";

export default function ThumbnailList() {
  const [thumbnailData, setthumbnailData] = useState([]);
  useEffect(() => {
    fetchVideos(setthumbnailData);
  }, []);

  return (
    <View style={styles.discover}>
      {thumbnailData.map((a, i) => (
        <Image source={{ uri: a }} style={styles.thumbnail} key={i} />
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

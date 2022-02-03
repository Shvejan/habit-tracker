import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { fetchSmallQuote } from "../apis/quoteapi";
import { AuthContext } from "../context/auth/AuthContext";
import { smallQuotesList } from "../assets/quotesList";

export default function Suggestions() {
  const { online } = React.useContext(AuthContext);

  const [quote, setquote] = useState("");

  useEffect(() => {
    if (online) fetchSmallQuote(setquote, 50);
    else {
      setquote(smallQuotesList[Math.floor(Math.random() * 20)]);
    }
  }, [online]);
  return (
    <View>
      <Text style={styles.toolhead}>{quote.quote}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toolhead: {
    fontSize: 15,
    color: "white",
  },
});

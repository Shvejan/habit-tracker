import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { fetchSmallQuote } from "../apis/quoteapi";
import { AuthContext } from "../context/auth/AuthContext";
import { smallQuotesList } from "../assets/quotesList";

export default function Suggestions() {
  const { online } = useContext(AuthContext);

  const [quote, setquote] = useState("");

  const generateQuote = useCallback(() => {
    if (online) fetchSmallQuote(setquote, 50);
    else {
      setquote(smallQuotesList[Math.floor(Math.random() * 20)]);
    }
  }, [online]);
  useEffect(() => {
    generateQuote();
  }, [generateQuote]);
  return (
    <View>
      <TouchableWithoutFeedback onPress={generateQuote}>
        <Text style={styles.toolhead}>{quote.quote}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  toolhead: {
    fontSize: 15,
    color: "white",
  },
});

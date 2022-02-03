import { ImageBackground, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import TextButton from "../components/TextButton";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import { fetchQuote } from "../apis/quoteapi";
import { quotesList } from "../assets/quotesList";

function WelcomeScreen(props) {
  const { setLogin, online } = React.useContext(AuthContext);
  const [quote, setquote] = useState("");
  useEffect(() => {
    if (online) fetchQuote(setquote);
    else {
      setquote(quotesList[Math.floor(Math.random() * 20)]);
    }
  }, [online]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/leaves.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.overlay}>
          <BlurView tint="dark" intensity={95} style={styles.quoteContainer}>
            <Text style={styles.quote}>{quote.quote}</Text>
            <Text style={styles.author}>--{quote.author}</Text>
            <TextButton
              style={styles.button}
              text="Thats Right!"
              bgstyle={styles.buttonbg}
              onPress={() => setLogin(true)}
            />
          </BlurView>
        </View>
        <Text style={styles.statusincidator}>
          {online ? "online" : "ofline"}
        </Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  buttonbg: {
    // backgroundColor: "black",
    alignSelf: "center",
    justifyContent: "center",
    height: 60,
    paddingHorizontal: 16,
    borderRadius: 60,
    marginTop: 6,
  },
  button: {
    color: colors.quote,
    fontSize: 17,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  quoteContainer: {
    top: 120,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 40,
    overflow: "hidden",
    // borderWidth: 1,
    // borderColor: "black",
  },
  statusincidator: {
    color: "white",
    alignSelf: "center",
    color: "green",
  },
  quote: {
    color: colors.quote,
    fontSize: 22,
    marginBottom: 10,
  },
  author: {
    color: colors.author,
    fontSize: 18,
    alignSelf: "flex-end",
  },
});
export default WelcomeScreen;

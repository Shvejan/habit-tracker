import { ImageBackground, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";
import TextButton from "../components/TextButton";
import { BlurView } from "expo-blur";
import React from "react";
import { AuthContext } from "../utils/context";

function WelcomeScreen(props) {
  const setLogin = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/leaves.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.overlay}>
          <BlurView tint="dark" intensity={70} style={styles.quoteContainer}>
            <Text style={styles.quote}>
              The greatest glory in living lies not in never falling, but in
              rising every time we fall
            </Text>
            <Text style={styles.author}>--Nelson Mandela</Text>
            <TextButton
              style={styles.button}
              text="Thats Right!"
              bgstyle={styles.buttonbg}
              onPress={() => setLogin(true)}
            />
          </BlurView>
        </View>
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
    fontSize: 15,
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

  quote: {
    color: colors.quote,
    fontSize: 22,
    fontWeight: "bold",
  },
  author: {
    color: colors.author,
    fontSize: 18,
    alignSelf: "flex-end",
  },
});
export default WelcomeScreen;

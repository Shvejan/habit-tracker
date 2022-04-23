import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import Hamburger from "../components/Hamburger";
import colors from "../config/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import TextButton from "../components/TextButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DataContext } from "../context/data/DataContext";
import VariableList from "../components/VariableList";

function Settings(props) {
  const {
    resetApp,
    saveCurrentState,
    pushToFirebase,
    pullFromFirebase,
    attempts,
    best,
    days,
    fvalue,
    lastrelapse,
    streak,
    value,
    cards,
  } = useContext(DataContext);

  let data = [
    {
      name: "attempts",
      value: attempts,
    },
    {
      name: "best",
      value: best,
    },
    {
      name: "days",
      value: days,
    },
    {
      name: "value",
      value: value,
    },
    {
      name: "fvalue",
      value: JSON.stringify(fvalue),
    },
    {
      name: "lastre",
      value: lastrelapse,
    },
    {
      name: "streak",
      value: streak,
    },
  ];
  if (cards && cards.length) {
    const habits = cards.map((a) => {
      return { name: a.title, value: JSON.stringify(a.data) };
    });
    data = data.concat(habits);
  }

  const [show, setShow] = useState(false);
  return (
    <View style={styles.safearea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Hamburger {...props} />
          <View style={styles.btncontainer}>
            <TouchableOpacity onPress={pushToFirebase}>
              <FontAwesome name="cloud-upload" size={70} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={pullFromFirebase}>
              <FontAwesome name="cloud-download" size={70} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.btncontainer}>
            <TouchableOpacity
              onPress={() => {
                resetApp();
                alert("app reset successful");
              }}
            >
              <MaterialCommunityIcons
                name="lock-reset"
                size={70}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => saveCurrentState().then(() => alert("saved"))}
            >
              <FontAwesome5 name="save" size={70} color="white" />
            </TouchableOpacity>
          </View>
          <TextButton
            style={styles.button}
            text="Inspect Variables"
            bgstyle={styles.buttonbg}
            onPress={() => setShow(!show)}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {show && <VariableList data={data} />}
          </View>
          <Image
            style={styles.tinyLogo}
            source={require("../assets/value-formula.png")}
          />
          <Image
            style={styles.tinyLogo}
            source={require("../assets/val-dec-formula.png")}
          />
          <Image
            style={styles.tinyLogo}
            source={require("../assets/components-formula.png")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    margin: 20,
    borderRadius: 30,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  container: {
    backgroundColor: colors.background,
    alignItems: "center",
    height: "100%",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
  },
  safearea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  btncontainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 80,
  },
  button: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonbg: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    marginVertical: 30,
  },
  imageHolder: {
    flex: 1,
    alignItems: "center",
  },
});

export default Settings;

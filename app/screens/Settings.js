import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Hamburger from "../components/Hamburger";
import colors from "../config/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import TextButton from "../components/TextButton";
import { TouchableOpacity } from "react-native-gesture-handler";

const variables = [
  {
    name: "at",
    value: "30",
  },
  {
    name: "bffc",
    value: "30",
  },
  {
    name: "cx",
    value: "30",
  },
  {
    name: "d",
    value: "30",
  },
];

function Settings(props) {
  const [show, setShow] = useState(true);
  return (
    <View style={styles.safearea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Hamburger {...props} />
          <View style={styles.btncontainer}>
            <TouchableOpacity onPress={() => alert("Uploaded")}>
              <FontAwesome name="cloud-upload" size={70} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert("Downloaded")}>
              <FontAwesome name="cloud-download" size={70} color="white" />
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
            {show && (
              <VariableList data={variables.slice(0, variables.length / 2)} />
            )}
            {show && (
              <VariableList data={variables.slice(variables.length / 2)} />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const VariableList = (props) => {
  return (
    <View style={{ marginHorizontal: 50 }}>
      {props.data.map((a, i) => (
        <View
          key={i}
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Text style={styles.text}>{a.name}</Text>
          <FontAwesome5
            name="equals"
            size={15}
            color="white"
            style={{ marginHorizontal: 20, marginVertical: 3 }}
          />

          <Text style={styles.text}>{a.value}</Text>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
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
});

export default Settings;

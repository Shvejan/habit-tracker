import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { TouchableOpacity } from "react-native-gesture-handler";

export default function ActivityModel(props) {
  return (
    <Modal animationType="fade" transparent visible={props.visible}>
      <View style={styles.container}>
        <View style={styles.holder}>
          <View>
            <Pressable onPress={() => props.showModel(false)}>
              <MaterialCommunityIcons name="close" style={styles.close} />
            </Pressable>
          </View>
          <View style={styles.btncontainer}>
            <TouchableOpacity>
              <MaterialCommunityIcons name="instagram" style={styles.btns} />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="cellphone-iphone"
                style={styles.btns}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="thought-bubble"
                style={styles.btns}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="emoticon-tongue"
                style={styles.btns}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  holder: {
    width: "80%",
    backgroundColor: "rgb(30, 113, 238)",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 500,
  },
  close: {
    color: "white",
    fontSize: 20,
    alignSelf: "flex-end",
  },
  btncontainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btns: {
    fontSize: 50,
    color: "white",
  },
});

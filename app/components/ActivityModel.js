import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { DataContext } from "../context/data/DataContext";
import {
  decision,
  decValMain,
  media,
  po,
  thought,
} from "../math/Valuefunctions";
export default function ActivityModel(props) {
  const {
    incAttempts,
    setlastrelapse,
    fvalue,
    days,
    value,
    setvalue,
    setfvalue,
  } = useContext(DataContext);

  const fab = () => {
    setlastrelapse(new Date().getTime());
    incAttempts();
    props.showModel(false);
    let newValues = decValMain(days, value, fvalue);
    setvalue(newValues[0]);
    setfvalue(newValues[1]);
  };
  const actions = (type) => {
    let newValues = [0, 0];
    switch (type) {
      case 1:
        newValues = decision(days, value, fvalue);
        break;
      case 2:
        newValues = media(days, value, fvalue);
        break;
      case 3:
        newValues = thought(days, value, fvalue);
        break;
      case 4:
        newValues = po(days, value, fvalue);
        break;
    }
    setvalue(newValues[0]);
    setfvalue(newValues[1]);
    props.showModel(false);
  };
  return (
    <Modal animationType="fade" transparent visible={props.visible}>
      <View style={styles.container}>
        <View style={styles.holder}>
          <View>
            <Pressable onPress={() => props.showModel(false)}>
              <MaterialCommunityIcons name="close" style={styles.close} />
            </Pressable>
          </View>
          <TouchableOpacity onPress={fab} style={{ alignSelf: "center" }}>
            <MaterialCommunityIcons name="meditation" style={styles.btns} />
          </TouchableOpacity>
          <View style={styles.btncontainer}>
            <TouchableOpacity onPress={() => actions(1)}>
              <MaterialCommunityIcons
                name="emoticon-confused"
                style={styles.btns}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => actions(2)}>
              <MaterialCommunityIcons
                name="cellphone-iphone"
                style={styles.btns}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => actions(3)}>
              <MaterialCommunityIcons
                name="thought-bubble"
                style={styles.btns}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => actions(4)}>
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

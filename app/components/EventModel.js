import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Platform,
} from "react-native";
import React, { useState, useContext } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-datepicker";
import { DataContext } from "../context/data/DataContext";
export default function EventModel(props) {
  const { addUpcomingEvent } = useContext(DataContext);
  const [text, onChangeText] = useState("");
  const [date, setDate] = useState(new Date());
  return (
    <Modal animationType="fade" transparent visible={props.visible}>
      <View style={styles.container}>
        <View style={styles.holder}>
          <View>
            <Pressable onPress={() => props.showModel(false)}>
              <MaterialCommunityIcons name="close" style={styles.close} />
            </Pressable>
          </View>
          <View style={styles.titleHolder}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Name"
            />
          </View>
          <Text>{date.toString()}</Text>
          {Platform.OS === "ios" && (
            <RNDateTimePicker
              style={styles.datePickerStyle}
              value={date}
              mode="date"
              display="spinner"
              onChange={(event, date) => setDate(date)}
            />
          )}
          {Platform.OS === "android" && (
            <DatePicker
              style={styles.datePickerStyle}
              date={date}
              mode="date"
              display="spinner"
              placeholder="select date"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => {
                setDate(date);
              }}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              addUpcomingEvent(text, date);
              props.showModel(false);
            }}
          >
            <View style={[styles.btn]}>
              <Text style={styles.btnSmallText}>Save</Text>
              <MaterialCommunityIcons
                style={styles.btnSmallText}
                name="content-save-edit"
              />
            </View>
          </TouchableOpacity>
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

  btns: {
    fontSize: 50,
    color: "white",
  },
  input: {
    borderWidth: 1,
    padding: 5,
    color: "white",
    borderColor: "white",
    borderRadius: 10,
    width: "100%",
    fontSize: 20,
    marginTop: 20,
  },

  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 40,
  },
  titleHolder: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },

  btnSmallText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "green",
    alignSelf: "center",
    width: 120,
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

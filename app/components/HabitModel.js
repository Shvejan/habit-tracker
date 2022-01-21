import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

export default function HabitModel(props) {
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <BlurView tint="dark" intensity={87} style={{ flex: 1 }}>
        <SafeAreaView>
          <TouchableOpacity onPress={() => props.showModel(false)}>
            <Text
              style={{
                color: "white",
                fontSize: 25,
                marginTop: 20,
                fontWeight: "bold",
              }}
            >
              Hello World!
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 25,
                marginTop: 20,
                fontWeight: "bold",
              }}
            >
              close model
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({});

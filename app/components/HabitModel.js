import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ColorPalette from "react-native-color-palette";

const colorPalette = [
  "#C0392B",
  "#E74C3C",
  "#9B59B6",
  "#8E44AD",
  "#2980B9",
  "#461E52",
  "#DD517F",
  "#E68E36",
  "#556DC8",
  "#7998EE",
  "#FF68A8",
  "#64CFF7",
  "#F7E752",
  "#CA7CD8",
  "#3968CB",
  "#18363E",
  "#5F97AA",
  "#2D5F6E",
  "#3E88A5",
  "#93C4D1",
  "#2D4030",
  "#49684C",
  "#5D7F61",
  "#6B8E6E",
  "#97B299",
];
export default function HabitModel(props) {
  const [image, setImage] = useState(null);
  const [text, onChangeText] = useState("");
  const data = [0, 0];
  const [selectedColor, setSelectedColor] = useState("#C0392B");
  const addNewCard = (info) => {
    if (cards === null) {
      addCards([info]);
    } else {
      addCards([...cards, info]);
    }
    showHabitModel(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 2],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const resetData = () => {
    setImage(null);
    onChangeText("");
    setSelectedColor("#C0392B");
  };
  const addCard = () => {
    addNewCard({
      image: image,
      title: text,
      color: selectedColor,
      data: data,
    });
    resetData();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <BlurView tint="dark" intensity={87} style={{ flex: 1 }}>
        <SafeAreaView>
          <View style={styles.container}>
            <View>
              <TouchableOpacity onPress={() => props.showModel(false)}>
                <MaterialCommunityIcons name="close" style={styles.close} />
              </TouchableOpacity>
            </View>

            <View style={styles.body}>
              <View style={styles.titleHolder}>
                <Text style={styles.title}>Title:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeText}
                  value={text}
                />
              </View>
              <View>
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.titleHolder}
                >
                  <Text style={styles.title}>Upload Image:</Text>

                  <MaterialCommunityIcons name="camera" style={styles.icon} />
                </TouchableOpacity>
                <View style={{ height: 200 }}>
                  {image && (
                    <Image
                      source={{ uri: image }}
                      style={{ width: 100, height: 200, alignSelf: "center" }}
                    />
                  )}
                </View>
              </View>
              <View style={styles.titleHolder}>
                <ColorPalette
                  onChange={(color) => setSelectedColor(color)}
                  value={selectedColor}
                  colors={colorPalette}
                  title={""}
                  icon={
                    <MaterialCommunityIcons
                      name={"check"}
                      size={25}
                      color={"white"}
                    />
                  }
                />
              </View>
              <TouchableOpacity onPress={addCard}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Add</Text>
                  <MaterialCommunityIcons
                    style={styles.btnText}
                    name="google-fit"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  close: {
    color: "white",
    fontSize: 20,
    alignSelf: "flex-end",
    marginTop: 20,
    marginRight: 10,
  },
  container: {
    borderRadius: 30,
  },
  input: {
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    color: "white",
    borderColor: "white",
    borderRadius: 30,
    width: 200,
    fontSize: 20,
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
  body: {
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  icon: {
    color: "white",
    fontSize: 30,
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "rgb(30, 113, 238)",
    alignSelf: "center",
    width: 120,
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  btnText: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
});

import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import colors from "../config/colors";
import { BlurView } from "expo-blur";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../context/auth/AuthContext";
import { DataContext } from "../context/data/DataContext";

export default function CustomDrawer(props) {
  const { setLogin } = useContext(AuthContext);
  const { streak } = useContext(DataContext);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/leaves.jpg")}
        style={{ flex: 1 }}
      >
        <View style={styles.overlay}>
          <BlurView tint="dark" intensity={80} style={styles.blur}>
            <DrawerContentScrollView {...props}>
              <View style={styles.profile}>
                <Image
                  source={require("../assets/Shvejan.jpg")}
                  style={styles.profilePhoto}
                />
                <Text style={styles.name}>Aromston</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Octicons name="flame" size={20} color="orange" />
                  <Text style={styles.streak}>{streak}</Text>
                </View>
                <Text style={styles.subname}>Alright Lets Hit it</Text>
              </View>
              <View style={styles.items}>
                <DrawerItemList {...props} />
              </View>
            </DrawerContentScrollView>
            <TouchableOpacity onPress={() => setLogin(false)}>
              <View style={styles.logoutContainer}>
                <MaterialCommunityIcons
                  name="logout"
                  size={22}
                  color={"white"}
                />
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    marginLeft: 10,
                    fontSize: 22,
                  }}
                >
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </BlurView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    padding: 30,
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 25,
  },
  items: {
    paddingTop: 10,
    flex: 1,
  },
  profilePhoto: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  name: {
    color: "white",
    fontSize: 19,
    fontWeight: "800",
    paddingTop: 15,
  },
  subname: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
    paddingTop: 10,
  },
  streak: {
    color: "white",
    fontSize: 20,
    marginLeft: 8,
    paddingTop: 2,
    fontWeight: "bold",
  },
  blur: {
    flexGrow: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
  },
});

import { AuthContext } from "./AuthContext";
import React, { useEffect, useState } from "react";
import * as Network from "expo-network";
import { dev } from "../../config/constants";
export default function AuthState(props) {
  const [login, setLogin] = useState(dev ? true : false);
  const [online, setonline] = useState(false);
  useEffect(() => {
    const getNetStatus = async () => {
      await Network.getNetworkStateAsync().then((res) => {
        setonline(res.isInternetReachable);
      });
    };
    getNetStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ login, setLogin, online }}>
      {props.children}
    </AuthContext.Provider>
  );
}

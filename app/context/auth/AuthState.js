import { AuthContext } from "./AuthContext";
import React, { useState } from "react";

export default function AuthState(props) {
  const [login, setLogin] = useState(true);
  return (
    <AuthContext.Provider value={{ login, setLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
}

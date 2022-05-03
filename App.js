import React from "react";
import "react-native-gesture-handler";
import firebase from "firebase";
import AuthState from "./app/context/auth/AuthState";
import Main from "./app/components/Main";

export default function App() {
  if (!firebase.apps.length) {
    const app = firebase.initializeApp({
      apiKey: "AIzaSyCaC5hSUJWnj6y1DLHIFpb-ya2uAK-uvNE",
      authDomain: "habit-tracker-8973e.firebaseapp.com",
      projectId: "habit-tracker-8973e",
      storageBucket: "habit-tracker-8973e.appspot.com",
      messagingSenderId: "427296095842",
      appId: "1:427296095842:web:93e75edde12ee4bbc41b3b",
      measurementId: "G-K4LEBZ2KYS",
    });
  }
  return (
    <AuthState>
      <Main />
    </AuthState>
  );
}

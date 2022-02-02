import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCaC5hSUJWnj6y1DLHIFpb-ya2uAK-uvNE",
  authDomain: "habit-tracker-8973e.firebaseapp.com",
  projectId: "habit-tracker-8973e",
  storageBucket: "habit-tracker-8973e.appspot.com",
  messagingSenderId: "427296095842",
  appId: "1:427296095842:web:93e75edde12ee4bbc41b3b",
  measurementId: "G-K4LEBZ2KYS",
};

if (!firebase.apps.length) {
  const app = firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage(firebase.apps[0]);

export const uploadImage = async (image, name) => {
  const response = await fetch(image);
  const blob = await response.blob();
  var ref = firebase.storage().ref().child(name);
  return ref.put(blob);
};

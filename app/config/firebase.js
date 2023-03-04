// // import * as firebase from "firebase";
// import { getApps, initializeApp } from "firebase/app";

// import * as MediaLibrary from "expo-media-library";
// const firebaseConfig = {
//   apiKey: "AIzaSyCaC5hSUJWnj6y1DLHIFpb-ya2uAK-uvNE",
//   authDomain: "habit-tracker-8973e.firebaseapp.com",
//   projectId: "habit-tracker-8973e",
//   storageBucket: "habit-tracker-8973e.appspot.com",
//   messagingSenderId: "427296095842",
//   appId: "1:427296095842:web:93e75edde12ee4bbc41b3b",
//   measurementId: "G-K4LEBZ2KYS",
// };
// // "https://firebasestorage.googleapis.com/v0/b/habit-tracker-8973e.appspot.com/o/1?alt=media&token=55ecf8da-d50e-46cf-940b-208d415c937e";

// if (!getApps().length) {
//   const app = initializeApp(firebaseConfig);
// }

// const storage = firebase.storage(firebase.apps[0]);

// export const uploadImage = async (image, path) => {
//   const response = await fetch(image);
//   const blob = await response.blob();
//   var ref = firebase.storage().ref().child(path);
//   return ref.put(blob);
// };
// export const downloadImage = (path, setimage) => {
//   let imageRef = firebase.storage().ref().child(path);
//   let image = imageRef
//     .getDownloadURL()
//     .then((url) => {
//       setimage(url);
//       console.log(url);
//     })
//     .catch((e) => console.log("getting downloadURL of image error => ", e));
// };
// export const saveImage = async (url) => {
//   const asset = await MediaLibrary.createAssetAsync(url);
//   MediaLibrary.createAlbumAsync("Expo", asset)
//     .then(() => {
//       console.log("Album created!");
//     })
//     .catch((error) => {
//       console.log("err", error);
//     });
// };

import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataContext } from "./DataContext";
import {
  localstoreAttempts,
  localstoreBest,
  localstoreLastrelapse,
  localstoreStreak,
  localstoreValue,
} from "./LocalStoreNames";
export default function DataState(props) {
  const [value, setvalue] = useState(80);
  const [cards, addCards] = useState([]);
  const [streak, setstreak] = useState(null);
  const [lastrelapse, setlastrelapse] = useState(null);
  const [best, setbest] = useState(null);
  const [attempts, setattempts] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        let data = await AsyncStorage.getItem(localstoreStreak);
        if (data) {
          setstreak(parseInt(data));
        }
        data = await AsyncStorage.getItem(localstoreAttempts);
        if (data) {
          setattempts(parseInt(data));
        }
        data = await AsyncStorage.getItem(localstoreBest);
        if (data) {
          setbest(parseInt(data));
        }

        data = await AsyncStorage.getItem(localstoreValue);
        if (data) {
          setvalue(parseInt(data));
        }
        data = await AsyncStorage.getItem(localstoreLastrelapse);
        if (data) {
          setlastrelapse(parseInt(data));
        }
      } catch {
        console.log("i'm over it");
      }
    }
    load();
  }, []);

  useEffect(() => {
    async function store() {
      if (attempts != null)
        await AsyncStorage.setItem(localstoreAttempts, attempts.toString());
    }
    store();
  }, [attempts]);

  useEffect(() => {
    async function store() {
      if (best != null)
        await AsyncStorage.setItem(localstoreBest, best.toString());
    }
    store();
  }, [best]);

  useEffect(() => {
    async function store() {
      if (streak != null) {
        await AsyncStorage.setItem(localstoreStreak, streak.toString());
        if (best < streak) setbest(streak);
      }
    }
    store();
  }, [streak]);

  useEffect(() => {
    async function store() {
      if (value != null)
        await AsyncStorage.setItem(localstoreValue, value.toString());
    }
    store();
  }, [value]);

  useEffect(() => {
    async function store() {
      if (lastrelapse != null)
        await AsyncStorage.setItem(
          localstoreLastrelapse,
          lastrelapse.toString()
        );
    }
    store();
  }, [lastrelapse]);

  const resetApp = () => {
    setvalue(0);
    addCards([]);
    setstreak(0);
    setlastrelapse(new Date().getTime());
    setbest(0);
    setattempts(0);
    console.log("appp resetttuuu");
  };
  const saveCurrentState = async () => {
    await AsyncStorage.setItem(localstoreAttempts, attempts.toString());
    await AsyncStorage.setItem(localstoreBest, best.toString());
    await AsyncStorage.setItem(localstoreStreak, streak.toString());
    await AsyncStorage.setItem(localstoreValue, value.toString());
    await AsyncStorage.setItem(localstoreLastrelapse, lastrelapse.toString());
  };
  return (
    <DataContext.Provider
      value={{
        value,
        setvalue,
        cards,
        addCards,
        streak,
        setstreak,
        best,
        setbest,
        attempts,
        setattempts,
        lastrelapse,
        setlastrelapse,
        resetApp,
        saveCurrentState,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

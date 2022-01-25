import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataContext } from "./DataContext";
import {
  localstoreAttempts,
  localstoreBest,
  localstoreCards,
  localstoredays,
  localstoreFvalue,
  localstoreLastrelapse,
  localstoreStreak,
  localstoreValue,
} from "./LocalStoreNames";
import { incValPeriodic } from "../../math/Valuefunctions";
export default function DataState(props) {
  const [value, setvalue] = useState(0);
  const [cards, addCards] = useState([]);
  const [streak, setstreak] = useState(0);
  const [lastrelapse, setlastrelapse] = useState(null);
  const [best, setbest] = useState(0);
  const [attempts, setattempts] = useState(0);
  const [fvalue, setfvalue] = useState([2, 1, 1, 1, 1]); //[f,tc,mc,pc,baddecisionc]
  const [days, setdays] = useState(1);
  useEffect(() => {
    async function load() {
      try {
        let data = await AsyncStorage.getItem(localstoreStreak);
        if (data) {
          setstreak(parseInt(data));
        }
        data = await AsyncStorage.getItem(localstoreCards);
        if (data) {
          addCards(JSON.parse(data));
        }
        data = await AsyncStorage.getItem(localstoreFvalue);
        if (data) {
          setfvalue(data.split(",").map((a) => parseInt(a)));
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
        } else {
          setlastrelapse(new Date().getTime());
        }
        data = await AsyncStorage.getItem(localstoredays);
        if (data) {
          setdays(parseInt(data));
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
        console.log("streak changed to :", streak);
        if (streak != 0) daychanged();
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
      if (fvalue != null)
        await AsyncStorage.setItem(localstoreFvalue, fvalue.toString());
    }
    store();
  }, [fvalue]);

  useEffect(() => {
    async function store() {
      if (days != null)
        await AsyncStorage.setItem(localstoredays, days.toString());
    }
    store();
  }, [days]);

  useEffect(() => {
    async function store() {
      await AsyncStorage.setItem(localstoreCards, JSON.stringify(cards));
    }
    store();
  }, [cards]);

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
    setfvalue([2, 1, 1, 1, 1]);
    setdays(1);

    console.log("appp resetttuuu");
  };
  const saveCurrentState = async () => {
    await AsyncStorage.setItem(localstoreAttempts, attempts.toString());
    await AsyncStorage.setItem(localstoreBest, best.toString());
    await AsyncStorage.setItem(localstoreStreak, streak.toString());
    await AsyncStorage.setItem(localstoreValue, value.toString());
    await AsyncStorage.setItem(localstoreLastrelapse, lastrelapse.toString());
    await AsyncStorage.setItem(localstoreFvalue, fvalue.toString());
    await AsyncStorage.setItem(localstoredays, days.toString());
  };

  const incAttempts = () => {
    setattempts(attempts + 1);
  };

  const daychanged = () => {
    setdays(days + 1);
    setvalue(incValPeriodic(days, value, fvalue));
    setfvalue([2, 1, 1, 1, 1]);
    console.log("day changed");
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
        incAttempts,
        lastrelapse,
        setlastrelapse,
        resetApp,
        saveCurrentState,
        fvalue,
        setfvalue,
        days,
        daychanged,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

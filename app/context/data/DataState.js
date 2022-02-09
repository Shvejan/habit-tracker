import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataContext } from "./DataContext";
import {
  localstoreAttempts,
  localstoreBest,
  localstorecardsdata,
  localstoredays,
  localstoreFvalue,
  localstoreLastrelapse,
  localstoreStreak,
  localstoreValue,
} from "./LocalStoreNames";
import * as firebase from "firebase";
import { habitContributor, incValPeriodic } from "../../math/Valuefunctions";
export default function DataState(props) {
  const [value, setvalue] = useState(null);
  const [cards, addCards] = useState(null);
  const [streak, setstreak] = useState(null);

  const [lastrelapse, setlastrelapse] = useState(null);
  const [best, setbest] = useState(null);
  const [attempts, setattempts] = useState(0);
  const [fvalue, setfvalue] = useState(null); //[f,tc,mc,pc,baddecisionc]
  const [days, setdays] = useState(null);
  const [isloading, setisloading] = useState(true);
  useEffect(() => {
    async function load() {
      try {
        let data = await AsyncStorage.getItem(localstoreValue);
        if (data) {
          setvalue(parseFloat(data));
        }
        data = await AsyncStorage.getItem(localstoredays);
        if (data) {
          setdays(parseInt(data));
        }
        data = await AsyncStorage.getItem(localstorecardsdata);
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

        data = await AsyncStorage.getItem(localstoreLastrelapse);
        if (data) {
          setlastrelapse(parseInt(data));
        } else {
          setlastrelapse(new Date().getTime());
        }

        data = await AsyncStorage.getItem(localstoreStreak);
        if (data && streak != data) {
          setstreak(parseInt(data));
        }
      } catch {
        console.log("i'm over it");
      }
    }
    load().then(() => setisloading(false));
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
        // console.log("streak changed to :", streak);
      }
    }
    store();
  }, [streak]);

  useEffect(() => {
    async function store() {
      if (value != null) {
        await AsyncStorage.setItem(localstoreValue, value.toString());
        // console.log("value changed to ", value);
      }
    }
    store();
  }, [value]);

  useEffect(() => {
    async function store() {
      if (fvalue != null) {
        await AsyncStorage.setItem(localstoreFvalue, fvalue.toString());
      }
    }
    store();
  }, [fvalue]);

  useEffect(() => {
    async function store() {
      if (days != null) {
        await AsyncStorage.setItem(localstoredays, days.toString());
        // console.log("days changed to ", days);
      }
    }
    store();
  }, [days]);

  useEffect(() => {
    async function store() {
      if (cards !== null) {
        await AsyncStorage.setItem(localstorecardsdata, JSON.stringify(cards));
      }
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

  const updateStreak = (newstreak) => {
    if (value != null && days != null && days <= newstreak + 1 && !isloading) {
      // console.log("recieved target state", newstreak);
      // console.log("current value is", streak);
      let dif = newstreak - streak;
      while (dif > 0) {
        setstreak((prevStreak) => prevStreak + 1);
        daychanged();
        dif -= 1;
      }
    }
  };

  const saveCurrentState = async () => {
    await AsyncStorage.setItem(localstoreAttempts, attempts.toString());
    await AsyncStorage.setItem(localstoreBest, best.toString());
    await AsyncStorage.setItem(localstoreStreak, streak.toString());
    await AsyncStorage.setItem(localstoreValue, value.toString());
    await AsyncStorage.setItem(localstoreLastrelapse, lastrelapse.toString());
    await AsyncStorage.setItem(localstoreFvalue, fvalue.toString());
    await AsyncStorage.setItem(localstoredays, days.toString());
    await AsyncStorage.setItem(localstorecardsdata, JSON.stringify(cards));
  };

  const incAttempts = () => {
    setattempts(attempts + 1);
  };

  const daychanged = () => {
    // console.log("day change triggeed");
    setdays((prevDays) => {
      setvalue(
        (prevValue) =>
          incValPeriodic(prevDays, prevValue, fvalue) +
          habitContributor(prevDays, prevValue, cards)
      );
      return prevDays + 1;
    });

    setfvalue([2, 1, 1, 1, 1]);
    addCards((prevCards) => {
      prevCards.map((a) => {
        a.data[1] += 1;
        a.prev = a.data[0];
      });
      return [...prevCards];
    });
  };
  const incHabitCounter = (id) => {
    addCards((prevCards) => {
      prevCards[id].data[0] += 1;
      return [...prevCards];
    });
  };
  const decHabitCounter = (id) => {
    addCards((prevCards) => {
      prevCards[id].data[0] -= 1;
      return [...prevCards];
    });
  };

  const pushToFirebase = () => {
    const data = {
      value: value,
      cards: cards,
      streak: streak,
      lastrelapse: lastrelapse,
      best: best,
      attempts: attempts,
      fvalue: fvalue,
      days: days,
    };

    firebase
      .database()
      .ref("/")
      .set(data)
      .then(() => alert("uploaded successfully"));
  };

  const resetApp = () => {
    setvalue(0);
    addCards([
      {
        color: "#7998EE",
        data: [0, 1],
        image:
          "file:///data/user/0/com.shvejan.habitracker/cache/ImagePicker/7f6b4977-5382-495d-87f2-8bf11718fe0b.jpg",
        prev: 0,
        title: "Resistance",
      },
      {
        color: "#FF68A8",
        data: [0, 1],
        image:
          "file:///data/user/0/com.shvejan.habitracker/cache/ImagePicker/6bbcc2b0-20ea-45d6-a8ab-63bf91d38d79.jpg",
        prev: 0,
        title: "Books",
      },
      {
        color: "#F7E752",
        data: [0, 1],
        image:
          "file:///data/user/0/com.shvejan.habitracker/cache/ImagePicker/df7391df-8cf6-4437-ae78-0931d83376f2.jpg",
        prev: 0,
        title: "Cold shower",
      },
      {
        color: "#DD517F",
        data: [0, 1],
        image:
          "file:///data/user/0/com.shvejan.habitracker/cache/ImagePicker/a743d9cf-10e5-411c-8b8f-717bd9a7794b.jpg",
        prev: 0,
        title: "7am",
      },
      {
        color: "#E68E36",
        data: [0, 1],
        image:
          "file:///data/user/0/com.shvejan.habitracker/cache/ImagePicker/acf0b023-d14c-4f0e-a185-ea5cda9e0d56.jpg",
        prev: 0,
        title: "Abs",
      },
      {
        color: "#E74C3C",
        data: [0, 1],
        image:
          "file:///data/user/0/com.shvejan.habitracker/cache/ImagePicker/da5f246a-622b-41c6-b809-2a5ecaaaa020.jpg",
        prev: 0,
        title: "Todo",
      },
      {
        color: "#64CFF7",
        data: [0, 1],
        image:
          "file:///data/user/0/com.shvejan.habitracker/cache/ImagePicker/95bd95ee-e658-4d58-a259-53ac22156277.jpg",
        prev: 0,
        title: "LessPhone",
      },
      {
        color: "#CA7CD8",
        data: [0, 1],
        image:
          "file:///data/user/0/com.shvejan.habitracker/cache/ImagePicker/25938267-f9ff-47fa-9b53-1251aeb885e0.jpg",
        prev: 0,
        title: "Meditation",
      },
      {
        color: "#93C4D1",
        data: [0, 1],
        image:
          "file:///data/user/0/com.shvejan.habitracker/cache/ImagePicker/d3b0174a-b2ff-4809-aa97-19e9ab5384cc.jpg",
        prev: 0,
        title: "Food",
      },
      {
        color: "#F7E752",
        data: [0, 1],
        image:
          "file:///data/user/0/com.shvejan.habitracker/cache/ImagePicker/eb372a85-e56d-45cf-bd15-6a870ccd6ab9.jpg",
        prev: 0,
        title: "Coding",
      },
    ]);
    setstreak(0);
    setlastrelapse(new Date().getTime());
    setbest(0);
    setattempts(0);
    setfvalue([2, 1, 1, 1, 1]);
    setdays(1);

    console.log("appp resetttuuu");
  };

  const pullFromFirebase = () => {
    firebase
      .database()
      .ref("/")
      .on("value", (snapshot) => {
        const cloudData = snapshot.val();
        setvalue(cloudData.value);
        setstreak(cloudData.streak);
        setlastrelapse(cloudData.lastrelapse);
        setbest(cloudData.best);
        setattempts(cloudData.attempts);
        setdays(cloudData.days);
        if (cloudData.fvalue != null)
          setfvalue(Object.values(cloudData.fvalue));
        if (cloudData.cards != undefined)
          addCards(Object.values(cloudData.cards));
        console.log(JSON.stringify(Object.values(cloudData.cards)));
      });
    alert("Data Downloaded successfully");
  };
  const deleteCard = (id) => {
    cards.splice(id, 1);
    addCards([...cards]);
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
        updateStreak,
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
        incHabitCounter,
        decHabitCounter,
        pushToFirebase,
        pullFromFirebase,
        deleteCard,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

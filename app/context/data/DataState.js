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
  localstoreperiodicdata,
  localstorenonperiodicdata,
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
  const [upcomingEvents, setUpcomingEvents] = useState(null);

  const [periodicData, setPeriodicData] = useState(null);
  const [nonPeriodicData, setNonPeriodicData] = useState(null);

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

        data = await AsyncStorage.getItem(localstoreperiodicdata);
        if (data) {
          tempData = JSON.parse(data);
          tempData.map((x) => (x.date = new Date(x.date)));
          setPeriodicData(tempData);
        }

        data = await AsyncStorage.getItem(localstorenonperiodicdata);
        if (data) {
          tempData = JSON.parse(data);
          tempData.map((x) => (x.date = new Date(x.date)));
          setNonPeriodicData(tempData);
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

  useEffect(() => {
    async function store() {
      if (periodicData != null) {
        await AsyncStorage.setItem(
          localstoreperiodicdata,
          JSON.stringify(periodicData)
        );
      }
    }
    store();
  }, [periodicData]);

  useEffect(() => {
    async function store() {
      if (nonPeriodicData != null) {
        await AsyncStorage.setItem(
          localstorenonperiodicdata,
          JSON.stringify(nonPeriodicData)
        );
      }
    }
    store();
  }, [nonPeriodicData]);

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
      setvalue((prevValue) => {
        const newVal =
          incValPeriodic(prevDays, prevValue, fvalue) +
          habitContributor(prevDays, prevValue, cards);
        appendPData(cards, newVal);

        return newVal;
      });
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
      periodicData: JSON.stringify(periodicData),
      nonPeriodicData: JSON.stringify(nonPeriodicData),
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
        color: "#C0392B",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/E8163751-CB54-43C5-826A-6D03E53DEDC4/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/E06F853F-B9DD-4873-BCAC-3C513D43B9C9.jpg",
        prev: 0,
        title: "Resistance",
      },
      {
        color: "#FF68A8",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/E8163751-CB54-43C5-826A-6D03E53DEDC4/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/40F8639C-6193-48A4-9A6A-9BC0B5055D2A.jpg",
        prev: 0,
        title: "Books",
      },
      {
        color: "#64CFF7",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/E8163751-CB54-43C5-826A-6D03E53DEDC4/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/A40D0340-7C5C-4E0B-BED8-A5B0544AA925.jpg",
        prev: 0,
        title: "Cold shower",
      },
      {
        color: "#FF68A8",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/E8163751-CB54-43C5-826A-6D03E53DEDC4/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/000A3FF0-AAD2-42C5-9E11-A8EB18E48414.jpg",
        prev: 0,
        title: "7am",
      },
      {
        color: "#C0392B",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/E8163751-CB54-43C5-826A-6D03E53DEDC4/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/2ABB71AE-D387-4DD3-B64C-52D389DCBC1B.jpg",
        prev: 0,
        title: "Abs",
      },
      {
        color: "#E68E36",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/E8163751-CB54-43C5-826A-6D03E53DEDC4/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/E1906244-1F54-4C61-A9AE-5D76893FD3EB.jpg",
        prev: 0,
        title: "Todo",
      },
      {
        color: "#F7E752",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/E8163751-CB54-43C5-826A-6D03E53DEDC4/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/7B80311F-101C-493A-8218-4E72A3AF2F8C.jpg",
        prev: 0,
        title: "LessPhone",
      },
      {
        color: "#93C4D1",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/E8163751-CB54-43C5-826A-6D03E53DEDC4/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/A64841C9-BBC9-454C-8C7D-D6A3D74A3A8B.jpg",
        prev: 0,
        title: "Meditation",
      },
      {
        color: "#64CFF7",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/E8163751-CB54-43C5-826A-6D03E53DEDC4/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/EF7F283C-4227-41F0-A8D7-9EEA0EC646C0.jpg",
        prev: 0,
        title: "Food",
      },
      {
        color: "#93C4D1",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/E8163751-CB54-43C5-826A-6D03E53DEDC4/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/F5F7D86C-58A3-415A-BF41-8C112A9C8AA1.jpg",
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
    setPeriodicData([]);
    setNonPeriodicData([]);

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
        if (cloudData.cards != undefined) {
          addCards(Object.values(cloudData.cards));
          console.log(Object.values(cloudData.cards));
        }

        if (cloudData.periodicData) {
          tempData = JSON.parse(cloudData.periodicData);
          tempData.map((x) => (x.date = new Date(x.date)));
          setPeriodicData(tempData);
        }
        if (cloudData.nonPeriodicData) {
          tempData = JSON.parse(cloudData.nonPeriodicData);
          tempData.map((x) => (x.date = new Date(x.date)));
          setNonPeriodicData(tempData);
        }
      });
    alert("Data Downloaded successfully");
  };
  const deleteCard = (id) => {
    cards.splice(id, 1);
    addCards([...cards]);
  };

  const appendNPData = (activity) => {
    const date = new Date();
    setNonPeriodicData([
      ...nonPeriodicData,
      {
        date: date,
        day: date.toString().split(" ")[0],
        activity: activity,
      },
    ]);
  };
  const appendPData = (cards, value) => {
    let habits = [];
    cards.map((a) => {
      if (a.prev < a.data[0]) habits.push(a.title);
    });

    setPeriodicData((prevData) => {
      let date;
      if (prevData.length == 0) {
        date = new Date();
      } else {
        date = new Date(prevData[prevData.length - 1]["date"]);
        if (date.getDate() != undefined) date.setDate(date.getDate() + 1);
        else date = new Date();
      }
      return [
        ...prevData,
        { date: date, habits: habits, value: value.toPrecision(3) },
      ];
    });
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
        periodicData,
        nonPeriodicData,
        appendNPData,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

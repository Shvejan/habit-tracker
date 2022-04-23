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
  localstoreeventsdata,
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

        data = await AsyncStorage.getItem(localstoreeventsdata);
        if (data) {
          // setUpcomingEvents(JSON.parse(data));
          tempData = JSON.parse(data);
          tempData.map((x) => (x.eventDate = new Date(x.eventDate)));
          setUpcomingEvents(tempData);
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
      if (upcomingEvents !== null) {
        await AsyncStorage.setItem(
          localstoreeventsdata,
          JSON.stringify(upcomingEvents)
        );
      }
    }
    store();
  }, [upcomingEvents]);

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
    await AsyncStorage.setItem(
      localstoreeventsdata,
      JSON.stringify(upcomingEvents)
    );
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
      upcomingEvents: JSON.stringify(upcomingEvents),
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
          "file:///var/mobile/Containers/Data/Application/04CA0425-C9C1-421F-BD03-6BA78C2B817F/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/06132DFC-9995-451C-BADD-B259E193A363.jpg",
        prev: 0,
        title: "Resistance",
      },
      {
        color: "#FF68A8",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/04CA0425-C9C1-421F-BD03-6BA78C2B817F/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/A6791809-74FA-4D2A-90E4-0BCE3578DFB6.jpg",
        prev: 0,
        title: "Books",
      },
      {
        color: "#64CFF7",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/04CA0425-C9C1-421F-BD03-6BA78C2B817F/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/399EC45A-3131-48F0-9D1C-AD0D496D29A7.jpg",
        prev: 0,
        title: "Cold shower",
      },
      {
        color: "#FF68A8",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/04CA0425-C9C1-421F-BD03-6BA78C2B817F/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/286D5B44-4ADC-473E-8290-FFFC09D8BFF8.jpg",
        prev: 0,
        title: "7am",
      },
      {
        color: "#C0392B",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/04CA0425-C9C1-421F-BD03-6BA78C2B817F/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/CA0690AB-FE1B-4AD0-97EF-4F74F7877B7D.jpg",
        prev: 0,
        title: "Abs",
      },
      {
        color: "#E68E36",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/04CA0425-C9C1-421F-BD03-6BA78C2B817F/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/179895AE-71E9-44AC-B5A8-4C14FAA1D351.jpg",
        prev: 0,
        title: "Todo",
      },
      {
        color: "#F7E752",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/04CA0425-C9C1-421F-BD03-6BA78C2B817F/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/F9B85A15-ED25-4C3D-B3CA-6030BE504ECF.jpg",
        prev: 0,
        title: "LessPhone",
      },
      {
        color: "#93C4D1",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/04CA0425-C9C1-421F-BD03-6BA78C2B817F/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/88449C08-39DC-433C-8274-595DAE44ABC8.jpg",
        prev: 0,
        title: "Meditation",
      },
      {
        color: "#64CFF7",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/04CA0425-C9C1-421F-BD03-6BA78C2B817F/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/D8BC6447-8A3E-47D0-8BC4-4901FF860422.jpg",
        prev: 0,
        title: "Food",
      },
      {
        color: "#93C4D1",
        data: [0, 1],
        image:
          "file:///var/mobile/Containers/Data/Application/04CA0425-C9C1-421F-BD03-6BA78C2B817F/Library/Caches/ExponentExperienceData/%2540shvejan%252Fhabitracker/ImagePicker/71A2F797-331B-4D16-8655-8DCEF9B1E93F.jpg",
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
    setUpcomingEvents([]);
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
        if (cloudData.cards != undefined)
          addCards(Object.values(cloudData.cards));

        if (cloudData.upcomingEvents) {
          tempData = JSON.parse(cloudData.upcomingEvents);
          tempData.map((x) => (x.eventDate = new Date(x.eventDate)));
          setUpcomingEvents(tempData);
        }
      });
    alert("Data Downloaded successfully");
  };
  const deleteCard = (id) => {
    cards.splice(id, 1);
    addCards([...cards]);
  };
  const addUpcomingEvent = (title, date) => {
    date = new Date(date);
    if (upcomingEvents === null || upcomingEvents.length === 0) {
      setUpcomingEvents([{ title: title, eventDate: date }]);
    } else {
      const temp = [...upcomingEvents, { title: title, eventDate: date }];
      temp.sort(function (a, b) {
        return a.eventDate - b.eventDate;
      });
      setUpcomingEvents([...temp]);
    }
  };

  const deleteUpcomingEvent = (id) => {
    let tempData = [...upcomingEvents];
    tempData.splice(id, 1);
    setUpcomingEvents([...tempData]);
  };

  const appendNPData = (activity) => {
    const date = new Date();
    setNonPeriodicData([
      ...nonPeriodicData,
      {
        date: date,
        time: date.getTime(),
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
        upcomingEvents,
        addUpcomingEvent,
        deleteUpcomingEvent,
        periodicData,
        nonPeriodicData,
        appendNPData,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import Hamburger from "../components/Hamburger";
import colors from "../config/colors";
import { DataContext } from "../context/data/DataContext";
import { Dimensions } from "react-native";

import { LineChart, BarChart, PieChart } from "react-native-chart-kit";

function Stats(props) {
  const { periodicData, nonPeriodicData } = useContext(DataContext);
  const [valData, setvaldata] = useState({
    labels: [],
    datasets: [
      {
        data: [Math.random() * 100],
      },
    ],
  });
  const [habitDateData, sethabitDateData] = useState({
    labels: [],
    datasets: [
      {
        data: [Math.random() * 100],
      },
    ],
  });
  const [habitsDayData, sethabitsDayData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const [distractionsData, setdistractionsData] = useState([]);
  const screenWidth = Dimensions.get("window").width - 15;

  const countHabits = () => {
    let habitsCount = [0, 0, 0, 0, 0, 0, 0];

    const dayCount = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
    if (periodicData != null && periodicData.length > 0) {
      periodicData.map((a) => {
        const day = a.date.toString().substring(0, 3);
        const index = Object.keys(dayCount).indexOf(day);
        dayCount[day] += 1;
        habitsCount[index] += a.habits.length;
        // habitsCount[index] += Math.round(Math.random() * 10);
      });
      habitsCount = habitsCount.map((a, i) =>
        Object.values(dayCount)[i] ? a / Object.values(dayCount)[i] : 0
      );
      sethabitsDayData({
        labels: Object.keys(dayCount),
        datasets: [{ data: habitsCount }],
      });
    }
  };

  const countDistractions = () => {
    const pieChartData = [
      {
        name: "9AM-12PM",
        count: 0,
        color: "#1ADEFF",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "1PM-4PM",
        count: 0,
        color: "#1A6BFF",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "5PM-8PM",
        count: 0,
        color: "#AE1AFF",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "9PM-12PM",
        count: 0,
        color: "#FF9A1A",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    ];
    if (nonPeriodicData != null && nonPeriodicData.length) {
      nonPeriodicData.map((a) => {
        if (a.date.getHours() < 13) pieChartData[0].count += 1;
        else if (a.date.getHours() >= 13 && a.date.getHours() < 17)
          pieChartData[1].count += 1;
        else if (a.date.getHours() >= 17 && a.date.getHours() < 21)
          pieChartData[2].count += 1;
        else if (a.date.getHours() >= 21) pieChartData[3].count += 1;
      });
      setdistractionsData(pieChartData);
    }
  };
  useEffect(() => {
    if (periodicData != null && periodicData.length > 0) {
      const valdata = periodicData.map((a) => parseFloat(a.value));
      const habitsCountList = periodicData.map((a) => a.habits.length);
      // const habitsCountList = periodicData.map((a) =>
      //   Math.round(Math.random() * 10)
      // );
      countHabits();
      countDistractions();
      setvaldata({ labels: [], datasets: [{ data: valdata }] });
      sethabitDateData({ labels: [], datasets: [{ data: habitsCountList }] });
    }
  }, [periodicData]);

  useEffect(() => {
    if (nonPeriodicData != null && nonPeriodicData.length > 0) {
      countDistractions();
    }
  }, [nonPeriodicData]);

  return (
    <View style={styles.safearea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Hamburger {...props} />
          <View style={styles.graphContainer}>
            <View style={styles.graphView}>
              <Text style={styles.header}>Overview</Text>
              <LineChart
                data={valData}
                width={screenWidth}
                height={220}
                yAxisInterval={1}
                bezier
                chartConfig={{
                  backgroundGradientFrom: "#E27E00",
                  backgroundGradientTo: "#E59623",
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  strokeColor: "white",
                  strokeWidth: 5, // optional, default 3
                  barPercentage: 0.5,
                  useShadowColorFromDataset: true, // optional
                  stroke: "black",

                  propsForDots: {
                    r: "2",
                    strokeWidth: "1",
                    stroke: "white",
                  },
                }}
                style={styles.graph}
              />
            </View>
            <View style={styles.graphView}>
              <Text style={styles.subheader}>Habits</Text>
              <BarChart
                data={habitsDayData}
                width={screenWidth}
                height={220}
                chartConfig={{
                  backgroundGradientFrom: "#47DFEA",
                  backgroundGradientTo: "#A2E3E7",
                  backgroundGradientFromOpacity: 0.1,
                  backgroundGradientToOpacity: 0.4,
                  color: (opacity = 1) => "#E3CCFE",
                  strokeWidth: 2, // optional, default 3
                  barPercentage: 0.5,
                  useShadowColorFromDataset: false, // optional
                }}
                verticalLabelRotation={30}
                style={styles.graph}
              />
            </View>
            <View style={styles.graphView}>
              <LineChart
                data={habitDateData}
                width={screenWidth}
                height={220}
                yAxisInterval={1}
                bezier
                chartConfig={{
                  backgroundGradientFrom: "#3B4F44",
                  backgroundGradientTo: "#1D452F",
                  backgroundGradientFromOpacity: 0.2,
                  backgroundGradientToOpacity: 0.5,
                  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                  strokeWidth: 2, // optional, default 3
                  barPercentage: 0.5,
                  useShadowColorFromDataset: false, // optional
                }}
                style={styles.graph}
              />
            </View>

            <View style={styles.graphView}>
              <Text style={styles.subheader}>Distrations</Text>
              <PieChart
                data={distractionsData}
                width={screenWidth}
                height={250}
                chartConfig={{
                  backgroundGradientFrom: "#1E2923",
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientTo: "#08130D",
                  backgroundGradientToOpacity: 0.5,
                  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                  strokeWidth: 2, // optional, default 3
                  barPercentage: 0.5,
                  useShadowColorFromDataset: false, // optional
                }}
                // style={styles.graph}
                accessor={"count"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
              />
            </View>
            {/* <Text style={styles.text}>{JSON.stringify(nonPeriodicData)}</Text> */}
            {/* <Text style={styles.text}>{JSON.stringify(periodicData)}</Text> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: "white",
    fontSize: 30,
    paddingLeft: 15,
    paddingBottom: 5,
    alignSelf: "flex-start",
  },
  subheader: {
    color: "white",
    fontSize: 25,
    paddingLeft: 10,
    paddingBottom: 5,
    alignSelf: "flex-start",
  },
  container: {
    backgroundColor: colors.background,
    // backgroundColor: "white",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
  },

  safearea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  text: {
    color: "white",
  },
  graphContainer: {
    marginTop: 30,
  },
  graphView: {
    marginTop: 20,
    alignItems: "center",
    flex: 1,
  },
  graph: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
export default Stats;

import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import DistanceSlider from "./assets/components/DistanceSlider";

export default function App() {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function getData() {
    var token;
    var rants = [];

    fetch(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.261270%2C-120.647470&radius=" +
        miles * 1609 +
        "&type=restaurant&opennow&key=AIzaSyBJnsCbZiXOBioa21hIP_CzpMTDlMhEYoI"
    )
      .then((response) => response.json())
      .then((data) => {
        token = data.next_page_token;
        rants.push(data.results);
      });
    await sleep(1400);
    fetch(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.261270%2C-120.647470&radius=1000&pagetoken=" +
        token +
        "&key=AIzaSyBJnsCbZiXOBioa21hIP_CzpMTDlMhEYoI"
    )
      .then((response) => response.json())
      .then((data) => {
        token = data.next_page_token;
        rants.push(data.results);
      });
    await sleep(1400);
    fetch(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.261270%2C-120.647470&radius=1000&pagetoken=" +
        token +
        "&key=AIzaSyBJnsCbZiXOBioa21hIP_CzpMTDlMhEYoI"
    )
      .then((response) => response.json())
      .then((data) => {
        token = data.next_page_token;
        rants.push(data.results);
      });
    await sleep(1000);
    var merged = rants.flat(2);
    return merged;
  }

  const [miles, setMiles] = useState(10);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Random Restaurant</Text>
      </View>
      <View style={styles.space}>
        <DistanceSlider setMiles={setMiles} miles={miles}></DistanceSlider>
        <></>
      </View>

      <TouchableOpacity style={styles.button} onPress={getData}>
        <Text style={styles.buttonText}>Press Here</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  space: {
    backgroundColor: "#fffffe",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    flex: 0.2,
  },
  container: {
    flex: 1,
    backgroundColor: "#fffffe",
    //alignItems: 'center',
    justifyContent: "center",
  },
  title: {
    color: "#2b2c34",
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Hiragino Sans",
    textShadowColor: "rgba(17, 17, 17, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  text: {
    color: "#2b2c34",
    fontSize: 20,
    backgroundColor: "red",
    left: 10,
    position: "absolute",
    fontFamily: "Hiragino Sans",
  },
  button: {
    backgroundColor: "#6246ea",
    alignSelf: "center",
    width: 300,
    paddingHorizontal: 32,
    paddingVertical: 24,
    marginBottom: 10,
    borderRadius: 100,
  },
  buttonText: {
    color: "#fffffe",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Hiragino Sans",
  },
});

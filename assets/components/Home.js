import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Platform,
  ScrollView,
} from "react-native";
import { TextInput, Dimensions } from "react-native";
import MapView, { Circle } from "react-native-maps";
import * as Location from "expo-location";
import DistanceSlider from "./DistanceSlider";

export default function Home({ navigation }) {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [keyword, setkeyword] = useState("");
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest,
      });
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const [winner, setWinner] = useState(null);

  function toURL(string) {
    let result = string.replace(" ", "+");
    return result;
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const chooseRestaurant = (list) => {
    if (list.length == 0) {
      getData();
      return;
    }
    let winner = Math.floor(Math.random() * list.length);
    setWinner(list[winner]);
    console.log(list[winner]);
    navigation.navigate("Bruh", list[winner]);
  };
  async function getData() {
    var token;
    var rants = [];

    fetch(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=35.261270%2C-120.647470&radius=" +
        miles * 1609 +
        "&type=restaurant&opennow&key=AIzaSyD5Q6i_DnJ4onJzfJr95AiPK7_cjjnIhy0&keyword=" +
        toURL(keyword)
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        token = data.next_page_token;
        rants.push(data.results);
      });
    await sleep(100);
    fetch(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=" +
        token +
        "&key=AIzaSyD5Q6i_DnJ4onJzfJr95AiPK7_cjjnIhy0"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        token = data.next_page_token;
        rants.push(data.results);
      });
    await sleep(100);
    fetch(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=" +
        token +
        "&key=AIzaSyD5Q6i_DnJ4onJzfJr95AiPK7_cjjnIhy0"
    )
      .then((response) => response.json())
      .then((data) => {
        token = data.next_page_token;
        rants.push(data.results);
      });
    await sleep(1000);
    var merged = rants.flat(2);
    chooseRestaurant(merged);
    return;
  }

  const [miles, setMiles] = useState(10);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Random Restaurant</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View style={styles.space}>
          <MapView
            style={styles.map}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: miles / 30,
              longitudeDelta: miles / 30,
            }}
            showsUserLocation={true}
          >
            <Circle
              center={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              radius={miles * 1609}
            ></Circle>
          </MapView>
          <DistanceSlider setMiles={setMiles} miles={miles}></DistanceSlider>
          <Text style={styles.text}>Category (Optional)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="eg. Fast Food"
            onChangeText={setkeyword}
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={getData}>
        <Text style={styles.buttonText}>Press Here</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  map: {
    width: 380,
    height: 300,
  },
  textInput: {
    height: 42,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 315,
  },
  space: {
    backgroundColor: "#fffffe",
    flex: 1,
    alignItems: "center",
    //justifyContent: "space-between",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffffe",
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
    fontFamily: "Hiragino Sans",
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 10,
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

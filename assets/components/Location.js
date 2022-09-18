import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import WebLink from "./WebLink.js";
import MapLink from "./MapLink.js";
import PhoneLink from "./PhoneLink.js";
import { buttonStyle } from "../style/buttonStyle.js";

const Location = ({ navigation, route }) => {
  //console.log(route.params.Rlist);
  const [hours, setHours] = useState(null);
  const [phone, setPhone] = useState(null);
  const [price, setPrice] = useState(null);
  const [numRatings, setNumRatings] = useState(null);
  const [website, setWebsite] = useState(null);
  const [LatLng, setLatLng] = useState(null);
  const [winner, setWinner] = useState(route.params.winner);
  const [token, setToken] = useState(route.params.token);
  const [reloadCount, setReloadCount] = useState(0);
  const [restPool, setRestPool] = useState(route.params.Rlist);
  function toGoogleDate(dayNum) {
    dayNum = dayNum - 1;
    if (dayNum < 0) {
      dayNum = 6;
    }
    return dayNum;
  }
  useEffect(() => {
    getInfo();
  }, [winner]);

  function getInfo() {
    fetch(
      "https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Copening_hours%2Cformatted_phone_number%2Cuser_ratings_total%2Curl%2Cprice_level%2Cwebsite&place_id=" +
        winner.place_id +
        "&key=AIzaSyD5Q6i_DnJ4onJzfJr95AiPK7_cjjnIhy0"
    )
      .then((response) => response.json())
      .then((data) => {
        const d = new Date();
        let day = toGoogleDate(d.getDay());
        setHours(data.result.opening_hours.weekday_text[day]);
        setPhone(data.result.formatted_phone_number);
        setPrice(data.result.price_level);
        setNumRatings(data.result.user_ratings_total);
        setWebsite(data.result.website);
        setLatLng(winner.geometry.location);
      });
  }
  getInfo();
  const chooseRestaurant = (list) => {
    if (list.length == 0) {
      searchAgain();
      return;
    }

    let win = Math.floor(Math.random() * list.length);

    setWinner(list[win]);
  };
  const searchAgain = () => {
    console.log(restPool);
    if (token !== "" && token !== undefined) {
      fetch(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=" +
          token +
          "&key=AIzaSyD5Q6i_DnJ4onJzfJr95AiPK7_cjjnIhy0"
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "INVALID_REQUEST") {
            console.log("Invalid Request");
            console.log(token);
            setToken(data.next_page_token);
            chooseRestaurant(restPool);
            return;
          }
          console.log(data.results);
          setToken(data.next_page_token);
          setRestPool([...restPool, ...data.results]);
          chooseRestaurant([...restPool, ...data.results]);
        });
    } else {
      console.log("Searching Pool");
      chooseRestaurant(restPool);
    }
  };
  const computePrice = () => {
    let result = "";
    for (let i = 0; i < price; i++) {
      result += "$";
    }
    return result;
  };
  return (
    <View
      style={{
        backgroundColor: "#fffffe",
        flex: 1,
        alignItems: "flex-start",
      }}
    >
      <Image
        style={styles.picture}
        source={{
          uri:
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=" +
            winner.photos[0].photo_reference +
            "&key=AIzaSyD5Q6i_DnJ4onJzfJr95AiPK7_cjjnIhy0",
        }}
      />
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>
        {winner.name}
      </Text>
      <View style={styles.starContainer}>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={20}
          fractions={2}
          startingValue={winner.rating}
          readonly={true}
          style={styles.stars}
        />
        <Text style={styles.divider}>⬤</Text>

        <Text style={styles.ratings}>{numRatings} user ratings</Text>
        <Text style={styles.divider}>⬤</Text>
        <Text style={styles.priceLevel}>{`${computePrice()}`}</Text>
      </View>

      <Text style={styles.hourText}>{hours}</Text>
      <View style={styles.buttonContainer}>
        <WebLink style={{ color: "red" }} url={website}></WebLink>
        <MapLink name={winner.name} LatLng={LatLng}></MapLink>
        <PhoneLink phoneNumber={phone}></PhoneLink>
        <TouchableOpacity style={buttonStyle.button} onPress={searchAgain}>
          <Text style={buttonStyle.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    position: "absolute",
    top: 580,
  },
  hourText: { fontSize: 16, color: "#2b2c34" },
  priceLevel: {
    paddingTop: 3,
    fontSize: 14,
    paddingLeft: 2,
    color: "#2b2c34",
  },
  divider: {
    color: "#2b2c34",
    fontSize: 5,
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  ratings: {
    paddingTop: 3,
    fontSize: 14,
    paddingLeft: 2,
    color: "#2b2c34",
  },
  starContainer: {
    flexDirection: "row",
  },
  picture: {
    width: "100%",
    height: 300,
  },
  title: {
    fontSize: 45,
    paddingTop: 10,
    paddingLeft: 5,
    color: "#2b2c34",
  },
  stars: {
    paddingLeft: 5,
  },
});

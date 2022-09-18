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
const Location = ({ navigation, route }) => {
  console.log(route);
  const [hours, setHours] = useState(null);
  const [phone, setPhone] = useState(null);
  const [price, setPrice] = useState(null);
  const [numRatings, setNumRatings] = useState(null);
  const [website, setWebsite] = useState(null);
  const [LatLng, setLatLng] = useState(null);
  const [winner, setWinner] = useState(route.params.winner);
  const token = route.params.token;
  //const [reloadCount]
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
    console.log(winner);
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

    let win = Math.floor(Math.random() * 20);
    console.log(list);
    setWinner(list.results[win]);
  };
  const searchAgain = () => {
    console.log(token);
    fetch(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=" +
        token +
        "&key=AIzaSyD5Q6i_DnJ4onJzfJr95AiPK7_cjjnIhy0"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "INVALID_REQUEST") {
          return;
        }
        chooseRestaurant(data);
      });
  };
  return (
    <View
      style={{ backgroundColor: "#fffffe", flex: 1, alignItems: "flex-start" }}
    >
      <Image
        style={{ width: "100%", height: 300 }}
        source={{
          uri:
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=" +
            winner.photos[0].photo_reference +
            "&key=AIzaSyD5Q6i_DnJ4onJzfJr95AiPK7_cjjnIhy0",
        }}
      />
      <Text
        style={{
          fontSize: 45,
          paddingTop: 10,
          paddingLeft: 5,
          paddingBottom: 5,
        }}
      >
        {winner.name}
      </Text>

      <Rating
        type="star"
        ratingCount={5}
        imageSize={25}
        fractions={2}
        startingValue={winner.rating}
        readonly={true}
        style={{ paddingLeft: 10 }}
      />
      <Text>{hours}</Text>
      <Text>Price Level: {price}</Text>
      <Text>Number Ratings: {numRatings}</Text>
      <WebLink url={website}></WebLink>
      <MapLink name={winner.name} LatLng={LatLng}></MapLink>
      <PhoneLink phoneNumber={phone}></PhoneLink>
      <Button onPress={searchAgain} title="Retry"></Button>
    </View>
  );
};

export default Location;

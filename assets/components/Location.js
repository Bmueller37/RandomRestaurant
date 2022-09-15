import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";

const Location = ({ navigation, route }) => {
  const [hours, setHours] = useState(null);
  const [phone, setPhone] = useState(null);
  const [price, setPrice] = useState(null);
  function toGoogleDate(dayNum) {
    dayNum = dayNum - 1;
    if (dayNum < 0) {
      dayNum = 6;
    }
    return dayNum;
  }
  fetch(
    "https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Copening_hours%2Cformatted_phone_number%2Cprice_level&place_id=" +
      route.params.place_id +
      "&key=AIzaSyD5Q6i_DnJ4onJzfJr95AiPK7_cjjnIhy0"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const d = new Date();
      let day = toGoogleDate(d.getDay());
      setHours(data.result.opening_hours.weekday_text[day]);
      setPhone(data.result.formatted_phone_number);
      setPrice(data.result.price_level);
    });
  return (
    <View
      style={{ backgroundColor: "#fffffe", flex: 1, alignItems: "flex-start" }}
    >
      <Image
        style={{ width: "100%", height: 300 }}
        source={{
          uri:
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=" +
            route.params.photos[0].photo_reference +
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
        {route.params.name}
      </Text>

      <Rating
        type="star"
        ratingCount={5}
        imageSize={25}
        fractions={2}
        startingValue={route.params.rating}
        readonly={true}
        style={{ paddingLeft: 10 }}
      />
      <Text>{hours}</Text>
      <Text>{phone}</Text>
      <Text>{price}</Text>
    </View>
  );
};

export default Location;

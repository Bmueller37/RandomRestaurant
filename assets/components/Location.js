import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";

const Location = ({ navigation, route }) => {
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
            "&key=AIzaSyANDKldTbBUCDnjcYJY5VP6h-WvmSNyniM",
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
    </View>
  );
};

export default Location;

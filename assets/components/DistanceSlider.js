import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";

const DistanceSlider = ({ setMiles, miles }) => {
  return (
    <View>
      <Text style={styles.text}>Maximum Distance: {miles} mile(s)</Text>

      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={30}
        step={1}
        value={10}
        onValueChange={(value) => setMiles(value)}
        minimumTrackTintColor="#6246ea"
        maximumTrackTintColor="#b6b6b6"
      />
    </View>
  );
};

export default DistanceSlider;

const styles = StyleSheet.create({
  text: {
    color: "#2b2c34",
    fontSize: 20,
    fontFamily: "Hiragino Sans",
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 10,
  },
  slider: {
    width: 310,
    height: 40,
  },
});

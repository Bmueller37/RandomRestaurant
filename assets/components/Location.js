import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Location = ({ navigation, route }) => {
  return (
    <View>
      <Text>{route.params.name}</Text>
    </View>
  );
};

export default Location;

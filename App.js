import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Home from "./assets/components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Location from "./assets/components/Location.js";
import { TransitionPresets } from "@react-navigation/stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        })}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Welcome",
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
        <Stack.Screen
          name="Bruh"
          component={Location}
          options={{
            title: "Hi",
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, { useCallback } from "react";
import {
  Alert,
  Button,
  Linking,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import openMap from "react-native-open-maps";
import { buttonStyle } from "../style/buttonStyle";

const MapLink = ({ name, LatLng }) => {
  const goToLocation = () => {
    openMap({ latitude: LatLng.lat, longitude: LatLng.lng, query: name });
  };
  return (
    <TouchableOpacity style={buttonStyle.button} onPress={goToLocation}>
      <Text style={buttonStyle.buttonText}>Map</Text>
    </TouchableOpacity>
  );
};

export default MapLink;

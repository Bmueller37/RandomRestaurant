import React, { useCallback } from "react";
import { Alert, Button, Linking, StyleSheet, View, Text } from "react-native";
import openMap from "react-native-open-maps";

const MapLink = ({ name, LatLng }) => {
  const goToLocation = () => {
    openMap({ latitude: LatLng.lat, longitude: LatLng.lng, query: name });
  };
  return (
    <View>
      <Button title="Map Link" onPress={goToLocation} />
    </View>
  );
};

export default MapLink;

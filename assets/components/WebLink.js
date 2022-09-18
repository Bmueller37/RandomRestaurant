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
import { buttonStyle } from "../style/buttonStyle";

const WebLink = ({ url }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Error opening URL: ${url}`);
    }
  }, [url]);
  return (
    <TouchableOpacity style={buttonStyle.button} onPress={handlePress}>
      <Text style={buttonStyle.buttonText}>Website</Text>
    </TouchableOpacity>
  );
};

export default WebLink;

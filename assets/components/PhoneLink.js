import React, { useCallback } from "react";
import { Linking, View, Button, TouchableOpacity, Text } from "react-native";
import { buttonStyle } from "../style/buttonStyle";

const PhoneLink = ({ phoneNumber }) => {
  const openPhone = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <TouchableOpacity style={buttonStyle.button} onPress={openPhone}>
      <Text style={buttonStyle.buttonText}>Call</Text>
    </TouchableOpacity>
  );
};

export default PhoneLink;

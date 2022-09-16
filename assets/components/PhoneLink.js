import React, { useCallback } from "react";
import { Linking, View, Button } from "react-native";

const PhoneLink = ({ phoneNumber }) => {
  const openPhone = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <View>
      <Button title="Phone Link" onPress={openPhone} />
    </View>
  );
};

export default PhoneLink;

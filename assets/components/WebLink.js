import React, { useCallback } from "react";
import { Alert, Button, Linking, StyleSheet, View, Text } from "react-native";

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
    <View>
      <Button title="Website" onPress={handlePress} />
    </View>
  );
};

export default WebLink;

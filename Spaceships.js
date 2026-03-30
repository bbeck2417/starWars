import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Spaceships() {
  return (
    <View style={styles.container}>
      <Text>Spaceships: Millennium Falcon, X-wing, Death Star...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

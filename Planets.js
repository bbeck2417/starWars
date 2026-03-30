import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Planets() {
  return (
    <View style={styles.container}>
      <Text>Planets: Tatooine, Hoth, Endor...</Text>
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

import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Films() {
  return (
    <View style={styles.container}>
      <Text>Films: A New Hope, The Empire Strikes Back, Return of the Jedi...</Text>
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

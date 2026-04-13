import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";

export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("https://www.swapi.tech/api/planets")
      .then((response) => response.json())
      .then((json) => {
        setPlanets(json.results);
        setLoading(false); // Chapter 20: Stop showing progress once data arrives
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredData = planets.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  // CHAPTER 20: Providing feedback during the network call
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Planets...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Planets..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* CHAPTER 19: Proper FlatList Implementation */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.uid} // Requirement: every item needs a unique key
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // REQUIREMENT: Gives the list height so it can scroll
    backgroundColor: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  // Style items so they look like a distinct "List" (Figure 19.1)
  item: {
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 10,
    backgroundColor: "ghostwhite", // Matches the book's style example
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 18,
    color: "slategrey", // Matches the book's style example
  },
});

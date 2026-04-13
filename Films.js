import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";

export default function Films() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("https://www.swapi.tech/api/films")
      .then((response) => response.json())
      .then((json) => {
        // Films API uses "result" (singular)
        setFilms(json.result);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredData = films.filter((item) =>
    item.properties.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loaderText}>Loading Films...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Films..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {/* Title is located in properties.title */}
            <Text style={styles.itemText}>{item.properties.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Required for scrolling
    backgroundColor: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    color: "slategrey",
  },
  searchInput: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  item: {
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 10,
    backgroundColor: "ghostwhite",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 18,
    color: "slategrey",
  },
});

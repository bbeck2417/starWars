import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Modal,
  Button,
} from "react-native";

export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedText, setSubmittedText] = useState("");

  useEffect(() => {
    fetch("https://www.swapi.tech/api/planets")
      .then((response) => response.json())
      .then((json) => {
        setPlanets(json.results);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchSubmit = () => {
    setSubmittedText(searchText);
    setModalVisible(true);
  };

  const filteredData = planets.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      {/* Search Input (Chapter 22) */}
      <TextInput
        style={styles.searchInput}
        placeholder="Enter search term..."
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearchSubmit}
        returnKeyType="search"
      />

      {/* Search Result Modal (Chapter 23) */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Text style={styles.modalTitle}>You searched for:</Text>
            <Text style={styles.modalText}>{submittedText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.uid}
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
  container: { flex: 1, backgroundColor: "#fff" },
  loader: { flex: 1, justifyContent: "center" },
  searchInput: {
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  item: {
    padding: 20,
    backgroundColor: "ghostwhite",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: { fontSize: 18, color: "slategrey" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalInner: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 16, fontWeight: "bold" },
  modalText: { fontSize: 20, marginVertical: 15, color: "blue" },
});

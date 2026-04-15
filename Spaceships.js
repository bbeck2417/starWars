import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Modal,
  Button,
} from "react-native";

export default function Spaceships() {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedText, setSubmittedText] = useState("");

  useEffect(() => {
    fetch("https://www.swapi.tech/api/starships")
      .then((response) => response.json())
      .then((json) => {
        setStarships(json.results);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchSubmit = () => {
    setSubmittedText(searchText);
    setModalVisible(true);
  };

  const filteredData = starships.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Spaceships..."
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearchSubmit}
        returnKeyType="search"
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Text style={styles.modalTitle}>You searched for:</Text>
            <Text style={styles.modalText}>{submittedText}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <ScrollView>
        {filteredData.map((item) => (
          <View key={item.uid} style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
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

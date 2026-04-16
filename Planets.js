import React, { useState, useEffect } from "react";
import { Swipeable } from "react-native-gesture-handler";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";

export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedText, setSubmittedText] = useState("");
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/planets")
      .then((response) => response.json())
      .then((json) => {
        setPlanets(json.results); //
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchSubmit = () => {
    setSelectedPlanet(null);
    setSubmittedText(searchText);
    setModalVisible(true);
  };

  const handlePlanetSelect = (planet) => {
    setSelectedPlanet(planet);
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
      <TextInput
        style={styles.searchInput}
        placeholder="Enter search term..."
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearchSubmit}
        returnKeyType="search"
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            {selectedPlanet ? (
              <>
                <Text style={styles.modalTitle}>Planet Details</Text>
                <Text style={styles.modalText}>{selectedPlanet.name}</Text>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>You searched for:</Text>
                <Text style={styles.modalText}>{submittedText}</Text>
              </>
            )}
            <Button
              title="Close"
              onPress={() => {
                setModalVisible(false);
                setSelectedPlanet(null);
              }}
            />
          </View>
        </View>
      </Modal>

      <ScrollView>
        {filteredData.map((item) => (
          <Swipeable
            key={item.uid}
            onSwipeableWillOpen={() => handlePlanetSelect(item)}
            renderRightActions={() => <View style={styles.swipePlaceholder} />}
          >
            <View style={styles.item}>
              <TouchableOpacity onPress={() => handlePlanetSelect(item)}>
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          </Swipeable>
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
    minWidth: 250,
  },
  modalTitle: { fontSize: 16, fontWeight: "bold" },
  modalText: { fontSize: 20, marginVertical: 15, color: "blue" },
  swipePlaceholder: { width: 1, backgroundColor: "transparent" },
});

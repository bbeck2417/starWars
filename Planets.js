import React, { useState, useEffect, useCallback, memo } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import Animated, {
  SlideInRight,
  LinearTransition,
} from "react-native-reanimated";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import LazyImage from "./LazyImage";
import OfflineDetection from "./OfflineDetection";

// Memoized Planet Item
const PlanetItem = memo(({ item, onSelect }) => {
  return (
    <Animated.View
      entering={SlideInRight.duration(300)}
      layout={LinearTransition.springify()}
      key={item.uid}
    >
      <Swipeable
        renderRightActions={() => <View style={styles.swipePlaceholder} />}
        onSwipeableWillOpen={() => onSelect(item)}
      >
        <View style={styles.item}>
          <TouchableOpacity onPress={() => onSelect(item)}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      </Swipeable>
    </Animated.View>
  );
});

export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedText, setSubmittedText] = useState("");
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const legoStarWars = require("./assets/lego_Star_Wars.jpg");
  const isFocused = useIsFocused();

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
    setSelectedPlanet(null);
    setSubmittedText(searchText);
    // Modal display on search submit is now disabled
  };

  const handlePlanetSelect = useCallback((planet) => {
    setSelectedPlanet(planet);
    setModalVisible(true);
  }, []);

  const filteredData = planets.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderItem = ({ item }) => (
    <PlanetItem item={item} onSelect={handlePlanetSelect} />
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
        clearButtonMode="while-editing"
      />

      <LazyImage source={legoStarWars} style={styles.headerImage} />
      <OfflineDetection />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Text style={styles.modalTitle}>
              {selectedPlanet ? "Planet Details" : "You searched for:"}
            </Text>
            <Text style={styles.modalText}>
              {selectedPlanet ? selectedPlanet.name : submittedText}
            </Text>
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

      {isFocused && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.uid}
          renderItem={renderItem}
          removeClippedSubviews={false}
          initialNumToRender={10}
        />
      )}
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
  headerImage: {
    borderRadius: 20,
    overflow: "hidden",
    width: "80%",
    alignSelf: "center",
    height: 200,
    marginBottom: 10,
  },
});

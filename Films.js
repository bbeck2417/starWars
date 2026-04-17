import React, { useState, useEffect } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import Animated, { SlideInRight } from "react-native-reanimated";
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
  Easing,
} from "react-native";
import LazyImage from "./LazyImage"; // component import

export default function Films() {
  const starWarsImage = require("./assets/lego_Star_Wars.jpg");
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedText, setSubmittedText] = useState("");
  const [selectedFilm, setSelectedFilm] = useState(null);

  // image import
  const legoStarWars = require("./assets/lego_Star_Wars.jpg");

  const isFocused = useIsFocused();

  useEffect(() => {
    fetch("https://www.swapi.tech/api/films")
      .then((response) => response.json())
      .then((json) => {
        setFilms(json.result);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchSubmit = () => {
    setSelectedFilm(null);
    setSubmittedText(searchText);
    setModalVisible(true);
  };

  const handleFilmSelect = (film) => {
    setSelectedFilm(film);
    setModalVisible(true);
  };

  const filteredData = films.filter((item) =>
    item.properties.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Films..."
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearchSubmit}
        returnKeyType="search"
      />
      {/* Image Component import with Lazy Loading */}
      <LazyImage source={legoStarWars} style={styles.headerImage} />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            {selectedFilm ? (
              <>
                <Text style={styles.modalTitle}>Film Details</Text>
                <Text style={styles.modalText}>
                  {selectedFilm.properties.title}
                </Text>
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
                setSelectedFilm(null);
              }}
            />
          </View>
        </View>
      </Modal>
      {/* ScrollView implemented */}
      <ScrollView>
        {isFocused &&
          filteredData.map((item, index) => (
            <Animated.View
              key={item.uid}
              entering={SlideInRight.delay(index * 100)}
            >
              {/* // Swipeable component implemented */}
              <Swipeable
                key={item.uid}
                // Prop for displaying modal
                onSwipeableWillOpen={() => handleFilmSelect(item)}
                // Prop for UI to show transparent background for swipe gesture
                renderRightActions={() => (
                  <View style={styles.swipePlaceholder} />
                )}
              >
                <View style={styles.item}>
                  {/* TouchableOpacity implemented with onPress function to display item text */}
                  <TouchableOpacity onPress={() => handleFilmSelect(item)}>
                    <Text style={styles.itemText}>{item.properties.title}</Text>
                  </TouchableOpacity>
                </View>
              </Swipeable>
            </Animated.View>
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
  // Placeholder style to enable the swipe gesture
  swipePlaceholder: { width: 1, backgroundColor: "transparent" },
  // Style to center image and round border
  headerImage: {
    borderRadius: 20,
    overflow: "hidden",
    width: "80%",
    alignSelf: "center",
    height: 200,
    marginBottom: 10,
  },
});

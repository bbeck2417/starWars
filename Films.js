import React, { useState, useEffect, useCallback, memo } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import Animated, {
  LinearTransition,
  SlideInRight,
} from "react-native-reanimated";
import {
  View,
  Text,
  FlatList, // Switched from ScrollView
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import LazyImage from "./LazyImage";
import OfflineDetection from "./OfflineDetection";

const FilmItem = memo(({ item, onSelect }) => {
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
            <Text style={styles.itemText}>{item.properties.title}</Text>
          </TouchableOpacity>
        </View>
      </Swipeable>
    </Animated.View>
  );
});

export default function Films() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedText, setSubmittedText] = useState("");
  const [selectedFilm, setSelectedFilm] = useState(null);

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
    // Modal is no longer triggered here per assignment instructions
  };

  const handleFilmSelect = (film) => {
    setSelectedFilm(film);
    setModalVisible(true);
  };

  // Real-time filtering logic
  const filteredData = films.filter((item) =>
    item.properties.title.toLowerCase().includes(searchText.toLowerCase()),
  );
  const renderItem = ({ item }) => (
    <FilmItem item={item} onSelect={handleFilmSelect} />
  );

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  // Define the render function for the FlatList items
  const renderFilmItem = ({ item }) => (
    <Animated.View entering={SlideInRight.duration(400)} key={item.uid}>
      <Swipeable
        onSwipeableWillOpen={() => handleFilmSelect(item)}
        renderRightActions={() => <View style={styles.swipePlaceholder} />}
      >
        <View style={styles.item}>
          <TouchableOpacity onPress={() => handleFilmSelect(item)}>
            <Text style={styles.itemText}>{item.properties.title}</Text>
          </TouchableOpacity>
        </View>
      </Swipeable>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Films..."
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

      {/* CHAPTER 19: Implementing FlatList for stable list rendering */}
      {isFocused && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.uid}
          renderItem={renderItem}
          // Important for smooth animations during updates
          removeClippedSubviews={false}
          // Improves performance on long lists
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
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

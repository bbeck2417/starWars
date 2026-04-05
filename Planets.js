import React, {useState, useEffect} from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";

export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/planets")
    .then((response) => response.json())
    .then((json) => {
      setPlanets(json.results);
      setLoading(false);
    })
    .catch((error) => console.error(error));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
      data={planets}
      keyExtractor={(item) => item.uid}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item.name}</Text>
        
        </View>
      )}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  loader: {
    flex: 1, 
    justifyContent: "center"
  },
  text: {
    fontSize: 18
  }
});

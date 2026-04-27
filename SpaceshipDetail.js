import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

export default function SpaceshipDetail({ route }) {
  const { url, name } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())

      .then((json) => {
        setDetails(json.result.properties);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [url]);

  if (loading || !details) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFE81F" />
        <Text style={styles.loadingText}>Accessing Imperial Records...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{details.model}</Text>
      </View>

      <View style={styles.infoBox}>
        <DetailRow label="Manufacturer" value={details.manufacturer} />
        <DetailRow label="Class" value={details.starship_class} />
        <DetailRow label="Cost" value={`${details.cost_in_credits} credits`} />
        <DetailRow
          label="Speed"
          value={`${details.max_atmosphering_speed} km/h`}
        />
        <DetailRow
          label="Hyperdrive Rating"
          value={details.hyperdrive_rating}
        />
        <DetailRow label="Crew" value={details.crew} />
        <DetailRow label="Passengers" value={details.passengers} />
        <DetailRow label="Cargo Capacity" value={details.cargo_capacity} />
      </View>
    </ScrollView>
  );
}

// Helper component for UI consistency
const DetailRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value === "unknown" ? "N/A" : value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1c1c1c" }, // Dark theme for Star Wars feel
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
  },
  header: {
    padding: 30,
    backgroundColor: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "#FFE81F",
  },
  title: {
    fontSize: 28,
    color: "#FFE81F",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: { fontSize: 16, color: "#aaa", textAlign: "center", marginTop: 5 },
  infoBox: { padding: 20 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  label: { color: "#FFE81F", fontWeight: "600", fontSize: 16 },
  value: {
    color: "#fff",
    fontSize: 16,
    flexShrink: 1,
    textAlign: "right",
    marginLeft: 10,
  },
  loadingText: { color: "#FFE81F", marginTop: 10 },
});

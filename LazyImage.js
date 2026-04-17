import React, { useState } from "react";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";

const LazyImage = ({ source, style }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={style}>
      {/* Show indicator while image is fetching */}
      {isLoading && (
        <ActivityIndicator
          style={StyleSheet.absoluteFill}
          size="large"
          color="#0000ff"
        />
      )}
      <Image
        source={source}
        style={style}
        // resizeMode="cover" allows image to have rounded border
        resizeMode="cover"
        onLoad={() => setIsLoading(false)}
      />
    </View>
  );
};

export default LazyImage;

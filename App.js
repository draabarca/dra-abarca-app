// App.js - prueba mínima
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App mínima JS ✅</Text>
      <Text style={styles.subtitle}>
        Si ves esto en Expo Go, todo el motor está funcionando.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 16
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center"
  }
});
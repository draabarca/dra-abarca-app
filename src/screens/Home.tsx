// src/screens/Home.tsx
import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { COLORS } from "../theme";

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h1}>Inicio</Text>
      <Text style={styles.p}>
        Bienvenida a tu app profesional de rehabilitación. Desde aquí podrás
        organizar educación, productos recomendados y tus canales de contacto.
      </Text>

      <View style={styles.card}>
        <Text style={styles.h2}>¿Qué verás en esta app?</Text>
        <Text style={styles.p}>• Micro-lecciones para pacientes y familia.</Text>
        <Text style={styles.p}>• Productos y equipos sugeridos.</Text>
        <Text style={styles.p}>• Vínculos a agenda y redes oficiales.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 24 },
  h1: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 8,
  },
  h2: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
  },
  p: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
    lineHeight: 20,
  },
  card: {
    marginTop: 14,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eed3e6",
  },
});
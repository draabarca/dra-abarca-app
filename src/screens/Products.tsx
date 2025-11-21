// src/screens/Products.tsx
import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Linking from "expo-linking";
import { COLORS, RADIUS } from "../theme";
import { PRODUCTS } from "../data/products";

export default function Products() {
  const open = async (url: string) => {
    try {
      const ok = await Linking.canOpenURL(url);
      if (ok) {
        await Linking.openURL(url);
      } else {
        Alert.alert("No se pudo abrir el enlace");
      }
    } catch {
      Alert.alert("No se pudo abrir el enlace");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.section}>Productos (borrador de catálogo)</Text>
      <Text style={styles.intro}>
        Aquí podrás listar productos que recomiendas, con enlaces a Amazon,
        Mercado Libre u otras tiendas. Por ahora usamos tus productos
        referidos en Mercado Libre.
      </Text>

      {PRODUCTS.map((p) => (
        <View key={p.id} style={styles.card}>
          <Text style={styles.itemTitle}>{p.name}</Text>
          <Text style={styles.itemShort}>{p.short}</Text>
          <Text style={styles.itemClinical}>{p.clinicalUse}</Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => open(p.affiliateUrl)}
            accessibilityRole="button"
            accessibilityLabel={`Abrir ${p.name} en la tienda`}
          >
            <Text style={styles.btnTxt}>Ver en tienda</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.note}>
        *Los enlaces son de referencia informativa. No sustituyen una valoración
        médica ni equivalen a una prescripción.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 8,
  },
  intro: {
    color: "#444",
    marginBottom: 14,
    lineHeight: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS,
    padding: 16,
    marginBottom: 14,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  itemShort: {
    color: "#444",
    marginBottom: 4,
  },
  itemClinical: {
    color: "#555",
    fontStyle: "italic",
    marginBottom: 10,
  },
  btn: {
    marginTop: 4,
    alignSelf: "flex-start",
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  btnTxt: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 13,
  },
  note: {
    color: COLORS.note,
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
});
// src/screens/Contact.tsx
import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Linking from "expo-linking";
import { COLORS } from "../theme";

const DOCTORALIA =
  "https://www.doctoralia.com.mx/erika-abarca-ortega/especialista-en-rehabilitacion-y-medicina-fisica/guerrero";
const WHATSAPP =
  "https://wa.me/527474794425?text=Hola%20Dra.%20Abarca,%20me%20gustar%C3%ADa%20agendar%20una%20consulta.";
const EMAIL = "mailto:dra.eri.abarca@gmail.com";

const INSTAGRAM = "https://www.instagram.com/draerikaabarca/";
const LINKEDIN = "https://www.linkedin.com/in/erika-a-06923710b/";
const FACEBOOK =
  "https://www.facebook.com/profile.php?id=61566170162960";

export default function Contact() {
  const open = async (url: string) => {
    try {
      const can = await Linking.canOpenURL(url);
      if (!can) {
        Alert.alert("No se pudo abrir el enlace");
        return;
      }
      await Linking.openURL(url);
    } catch {
      Alert.alert("No se pudo abrir el enlace");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h1}>Contacto</Text>

      {/* Consulta presencial o en línea */}
      <View style={styles.card}>
        <Text style={styles.h2}>Consulta presencial o en línea</Text>
        <Text style={styles.p}>
          Hospital Farallón, Piso 7, Consultorio 702, Acapulco, Gro.
        </Text>
        <Text style={styles.p}>Teléfono: 747 479 4425</Text>
      </View>


      {/* Agenda */}
      <View style={styles.card}>
        <Text style={styles.h2}>Agenda de citas</Text>

        <PrimaryButton
          label="Agendar por Doctoralia"
          onPress={() => open(DOCTORALIA)}
        />

        <View style={{ height: 10 }} />

        <PrimaryButton
          label="Enviar mensaje por WhatsApp"
          onPress={() => open(WHATSAPP)}
        />

        <View style={{ height: 10 }} />

        <SecondaryButton
          label="Enviar correo"
          onPress={() => open(EMAIL)}
        />
      </View>


      {/* Redes */}
      <View style={styles.card}>
        <Text style={styles.h2}>Redes oficiales</Text>
        <SecondaryButton
          label="Instagram"
          onPress={() => open(INSTAGRAM)}
        />
        <View style={{ height: 8 }} />
        <SecondaryButton
          label="LinkedIn"
          onPress={() => open(LINKEDIN)}
        />
        <View style={{ height: 8 }} />
        <SecondaryButton
          label="Facebook"
          onPress={() => open(FACEBOOK)}
        />
      </View>

      <Text style={styles.note}>
        *Contenido informativo. No sustituye una valoración médica presencial.
      </Text>
    </ScrollView>
  );
}

/* --- Botones reutilizables --- */

function PrimaryButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnPrimary}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={styles.btnPrimaryTxt}>{label}</Text>
    </TouchableOpacity>
  );
}

function SecondaryButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnGhost}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={styles.btnGhostTxt}>{label}</Text>
    </TouchableOpacity>
  );
}

/* --- Estilos --- */

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
  btnPrimary: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimaryTxt: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  btnGhost: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e0c6d9",
    backgroundColor: "#fdf7fb",
  },
  btnGhostTxt: {
    color: COLORS.text,
    fontWeight: "600",
    fontSize: 14,
  },
  note: {
    fontSize: 12,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
  },
});
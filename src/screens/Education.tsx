// src/screens/Education.tsx
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Linking from "expo-linking";
import { COLORS } from "../theme";

type LessonKey = "lumbalgia" | "osteoporosis" | "gonartrosis";

type Lesson = {
  key: LessonKey;
  title: string;
  description: string;
  youtubeUrl: string;
};

const DOCTORALIA =
  "https://www.doctoralia.com.mx/erika-abarca-ortega/especialista-en-rehabilitacion-y-medicina-fisica/guerrero";

const EDUCATION_TOPICS: Lesson[] = [
  {
    key: "lumbalgia",
    title: "Lumbalgia (dolor lumbar)",
    description:
      "Dolor en zona baja de la espalda por sobrecarga, sedentarismo o hernia discal. Incluye educación postural y fortalecimiento del core.",
    youtubeUrl: "https://youtu.be/H5cq4wcSmW4",
  },
  {
    key: "osteoporosis",
    title: "Osteoporosis",
    description:
      "Qué es, cómo se diagnostica y cómo prevenir fracturas con ejercicio, nutrición y cuidado postural.",
    youtubeUrl: "https://youtu.be/k0YGxbl3lcE",
  },
  {
    key: "gonartrosis",
    title: "Gonartrosis (artrosis de rodilla)",
    description:
      "Dolor y desgaste articular de rodilla: síntomas, factores de riesgo y abordaje con ejercicio terapéutico.",
    youtubeUrl: "https://youtu.be/wGpMFzW-qMc",
  },
];

export default function Education() {
  const [selected, setSelected] = useState<Lesson | null>(
    EDUCATION_TOPICS[0]
  );

  const open = async (url: string) => {
    try {
      const ok = await Linking.canOpenURL(url);
      if (!ok) {
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
      <Text style={styles.section}>Educación para pacientes</Text>

      {/* Lista de temas */}
      <View style={styles.listCard}>
        {EDUCATION_TOPICS.map((item) => {
          const active = selected?.key === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => setSelected(item)}
              style={[
                styles.itemRow,
                active && styles.itemRowActive,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Ver tema ${item.title}`}
            >
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text
                style={styles.itemDesc}
                numberOfLines={2}
              >
                {item.description}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Detalle del tema seleccionado */}
      {selected && (
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>{selected.title}</Text>
          <Text style={styles.detailDesc}>{selected.description}</Text>

          <PrimaryButton
            label="Ver video en YouTube"
            onPress={() => open(selected.youtubeUrl)}
          />

          <View style={{ height: 10 }} />

          <SecondaryButton
            label="Agendar consulta en Doctoralia"
            onPress={() => open(DOCTORALIA)}
          />
        </View>
      )}

      <Text style={styles.note}>
        • Contenido educativo. No sustituye una valoración médica presencial.
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
  container: {
    paddingBottom: 24,
  },
  section: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 12,
  },

  // Lista
  listCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eed3e6",
    overflow: "hidden",
  },
  itemRow: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f2e6ef",
  },
  itemRowActive: {
    backgroundColor: "#fdf3fa",
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  itemDesc: {
    color: "#555",
    fontSize: 13,
  },

  // Detalle
  detailCard: {
    marginTop: 14,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#eed3e6",
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 6,
  },
  detailDesc: {
    color: "#444",
    lineHeight: 20,
    marginBottom: 12,
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
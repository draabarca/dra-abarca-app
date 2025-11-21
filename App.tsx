// App.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  Alert,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";

type Tab = "home" | "education" | "products" | "contact";

type Product = {
  id: string;
  name: string;
  short: string;
  clinicalUse: string;
  affiliateUrl: string;
  image?: any;
};

const PRIMARY = "#ec4899"; // Rosa principal

export default function App() {
  const [tab, setTab] = useState<Tab>("home");

  const renderContent = () => {
    switch (tab) {
      case "home":
        return <HomeScreen onNavigate={setTab} />;
      case "education":
        return <EducationScreen />;
      case "products":
        return <ProductsScreen />;
      case "contact":
        return <ContactScreen />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="dark" />

      {/* Encabezado con logo + nombre */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Image
            source={require("./assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.headerTextBlock}>
            <Text style={styles.brand}>Dra. Erika Abarca</Text>
            <Text style={styles.subtitle}>Rehabilitación y Telerehabilitación</Text>
          </View>
        </View>
      </View>

      {/* Tabs superiores */}
      <View style={styles.tabRow}>
        <TabButton label="Inicio" active={tab === "home"} onPress={() => setTab("home")} />
        <TabButton
          label="Educación"
          active={tab === "education"}
          onPress={() => setTab("education")}
        />
        <TabButton
          label="Productos"
          active={tab === "products"}
          onPress={() => setTab("products")}
        />
        <TabButton
          label="Contacto"
          active={tab === "contact"}
          onPress={() => setTab("contact")}
        />
      </View>

      <View style={styles.separator} />

      {/* Contenido de cada pestaña */}
      <ScrollView contentContainerStyle={styles.content}>{renderContent()}</ScrollView>
    </SafeAreaView>
  );
}

/* ========= Navegación ========= */

function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
      {active && <View style={styles.tabUnderline} />}
    </TouchableOpacity>
  );
}

/* ========= INICIO ========= */

function HomeScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Comienza aquí</Text>
      <Text style={styles.paragraph}>
        Esta app reúne en un solo lugar educación en salud, recomendaciones de
        productos, nuevas tecnologías, conocer comunidad, orientación sobre redes de apoyo y
        formas seguras de agendar valoraciones especializadas en Medicina de Rehabilitación
        con planes personalizados de tratamiento.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Educación</Text>
        <Text style={styles.cardText}>
          Videos cortos sobre las principales causas de discapacidad en población infantil y
          adulta, explicados con lenguaje claro y con enfoque práctico.
        </Text>
        <PrimaryButton
          label="Ver lecciones"
          onPress={() => onNavigate("education")}
          icon="book"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Productos</Text>
        <Text style={styles.cardText}>
          Selección de equipos y accesorios que pueden facilitar tu tratamiento en casa,
          siempre como complemento a la guía médica.
        </Text>
        <PrimaryButton
          label="Ver productos"
          onPress={() => onNavigate("products")}
          icon="shopping-bag"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contacto</Text>
        <Text style={styles.cardText}>
          Opciones de consulta presencial y telerehabilitación, además de canales oficiales
          para resolver dudas y dar seguimiento.
        </Text>
        <PrimaryButton
          label="Ir a contacto"
          onPress={() => onNavigate("contact")}
          icon="calendar-check-o"
        />
      </View>
    </View>
  );
}

/* ========= EDUCACIÓN ========= */

function EducationScreen() {
  const topics: { key: string; title: string; description: string; url: string }[] = [
    {
      key: "lumbalgia",
      title: "Lumbalgia (dolor lumbar)",
      description:
        "Dolor en la parte baja de la espalda. Explico causas frecuentes, señales de alarma, recomendaciones en rehabilitación y prevención de cirugía",
      url: "https://youtu.be/H5cq4wcSmW4",
    },
    {
      key: "osteoporosis",
      title: "Osteoporosis",
      description:
        "Qué es y cómo se diagnostica, el papel del ejercicio y la nutrición, y estrategias para prevenir fracturas.",
      url: "https://youtu.be/k0YGxbl3lcE",
    },
    {
      key: "gonartrosis",
      title: "Gonartrosis (artrosis de rodilla)",
      description:
        "Dolor y desgaste de rodilla, factores de riesgo y ejercicio terapéutico para mantener la función.",
      url: "https://youtu.be/wGpMFzW-qMc",
    },
  ];

  const openUrl = async (url: string) => {
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
    <View>
      <Text style={styles.sectionTitle}>Educación</Text>

      {topics.map((t) => (
        <View key={t.key} style={styles.card}>
          <Text style={styles.cardTitle}>{t.title}</Text>
          <Text style={styles.cardText}>{t.description}</Text>
          <PrimaryButton
            label="Ver video en YouTube"
            onPress={() => openUrl(t.url)}
            icon="youtube-play"
          />
        </View>
      ))}

      <Text style={styles.disclaimer}>
        El contenido es informativo y no sustituye una valoración médica presencial o una
        consulta de telemedicina personalizada.
      </Text>
    </View>
  );
}

/* ========= PRODUCTOS ========= */

function ProductsScreen() {
  const PRODUCTS: Product[] = [
    {
      id: "p1",
      name: "Bandas de resistencia (set)",
      short: "Set de bandas para trabajo progresivo de fuerza en casa.",
      clinicalUse:
        "Apoyo en programas de fortalecimiento de core, rodilla, cadera y hombro, siempre con un programa o supervisión profesional.",
      affiliateUrl: "https://mercadolibre.com/sec/348WQLe",
      image: require("./assets/Bandaskit.png"),
    },
    {
      id: "p2",
      name: "TENS portátil con electrodos",
      short:
        "Dispositivo de estimulación eléctrica para analgesia complementaria, no invasivo.",
      clinicalUse:
        "Puede utilizarse como complemento analgésico en dolor lumbar mecánico, cervicalgia y dolor de rodilla, según indicación médica.",
      affiliateUrl: "https://mercadolibre.com/sec/1sxuce5",
      image: require("./assets/Tens.png"),
    },
    {
      id: "p3",
      name: "Compresa caliente reutilizable",
      short: "Aplicación de calor para espasmo muscular y rigidez.",
      clinicalUse: "Sobrecarga muscular, dolor articular.",
      affiliateUrl: "https://mercadolibre.com/sec/1qnZbrd",
      image: require("./assets/Compresa.png"),
    },
    {
      id: "p4",
      name: "Mat yoga tapete antideslizante",
      short: "Superficie segura para ejercicio terapéutico en casa.",
      clinicalUse: "Ejercicios de core, equilibrio y estiramientos.",
      affiliateUrl: "https://mercadolibre.com/sec/23z1CbH",
      image: require("./assets/Mat.png"),
    },
    {
      id: "p5",
      name: "Pelota de pilates (55–65 cm)",
      short: "Trabajo de estabilidad, postura y control de tronco.",
      clinicalUse: "Dolor lumbar, control de tronco, piso pélvico.",
      affiliateUrl: "https://mercadolibre.com/sec/1eahLUT",
      image: require("./assets/Pelotapilates.png"),
    },
    {
      id: "p6",
      name: "Juego de mancuernas recubiertas",
      short: "Entrenamiento de fuerza en miembros superiores.",
      clinicalUse: "Rehabilitación de hombro, codo y prevención de fragilidad.",
      affiliateUrl: "https://mercadolibre.com/sec/1E1mSnR",
      image: require("./assets/Mancuernas.png"),
    },
  ];

  const openAffiliate = async (url: string) => {
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
    <View>
      <Text style={styles.sectionTitle}>Productos recomendados</Text>
      <Text style={styles.paragraph}>
        Los siguientes productos son ejemplos de apoyo para la rehabilitación en casa. Su uso
        debe individualizarse y, de preferencia, comentarse durante la consulta médica o de
        tele-rehabilitación. Revisa siempre la descripción, opiniones y políticas de la tienda
        en línea antes de comprar.
      </Text>

      {PRODUCTS.map((p) => (
        <View key={p.id} style={styles.card}>
          <View style={styles.productRow}>
            {p.image && (
              <Image source={p.image} style={styles.productImage} resizeMode="cover" />
            )}
            <View style={styles.productTexts}>
              <Text style={styles.cardTitle}>{p.name}</Text>
              <Text style={styles.cardText}>{p.short}</Text>
              <Text style={styles.cardNote}>{p.clinicalUse}</Text>
            </View>
          </View>

          <PrimaryButton
            label="Ver en Mercado Libre"
            onPress={() => openAffiliate(p.affiliateUrl)}
            icon="external-link"
          />
        </View>
      ))}

      <Text style={styles.disclaimer}>
        No existe relación comercial formal con las plataformas listadas. Los enlaces se
        muestran como referencia y no implican recomendación exclusiva ni sustituyen la
        valoración profesional individual.
      </Text>
    </View>
  );
}

/* ========= CONTACTO ========= */

function ContactScreen() {
  const DOCTORALIA =
    "https://www.doctoralia.com.mx/erika-abarca-ortega/especialista-en-rehabilitacion-y-medicina-fisica/guerrero";
  const WHATSAPP =
    "https://wa.me/527474794425?text=Hola%20Dra.%20Abarca,%20me%20gustar%C3%ADa%20agendar%20una%20consulta.";
  const INSTAGRAM = "https://www.instagram.com/draerikaabarca/";
  const LINKEDIN = "https://www.linkedin.com/in/erika-a-06923710b/";
  const FACEBOOK = "https://www.facebook.com/profile.php?id=61566170162960";
  const EMAIL = "mailto:dra.eri.abarca@gmail.com";

  const open = async (url: string) => {
    try {
      const ok = await Linking.canOpenURL(url);
      if (ok) await Linking.openURL(url);
      else Alert.alert("No se pudo abrir el enlace");
    } catch {
      Alert.alert("No se pudo abrir el enlace");
    }
  };

  return (
    <View>
      <Text style={styles.sectionTitle}>Contacto</Text>

      <Text style={styles.cardTitle}>Consulta presencial o en línea</Text>

      <Text style={styles.cardText}>
        Hospital Farallón, Piso 7, Consultorio 702, Acapulco, Gro.
      </Text>
      <Text style={styles.cardText}>Teléfono de contacto: 747 479 4425</Text>

      {/* Frase clave con más espacio antes de la agenda */}
      <Text style={[styles.cardNote, { marginBottom: 18 }]}>
        Atención en Medicina de Rehabilitación con enfoque funcional y de calidad de vida.
      </Text>

      {/* Agenda tu consulta con botones azul / verde */}
      <View style={[styles.card, styles.agendaCard]}>
        <Text style={styles.cardTitle}>Agenda tu consulta</Text>
        <AgendaButton
          label="Agendar en Doctoralia"
          onPress={() => open(DOCTORALIA)}
          icon="calendar-check-o"
          color="#2563eb" // azul
        />
        <View style={{ height: 8 }} />
        <AgendaButton
          label="Citas por WhatsApp"
          onPress={() => open(WHATSAPP)}
          icon="whatsapp"
          color="#22c55e" // verde
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Redes oficiales</Text>
        <View style={styles.socialRow}>
          <SocialIcon
            name="instagram"
            label="Instagram"
            color="#E4405F"
            onPress={() => open(INSTAGRAM)}
          />
          <SocialIcon
            name="linkedin"
            label="LinkedIn"
            color="#0A66C2"
            onPress={() => open(LINKEDIN)}
          />
          <SocialIcon
            name="facebook"
            label="Facebook"
            color="#1877F2"
            onPress={() => open(FACEBOOK)}
          />
          <SocialIcon
            name="envelope"
            label="Correo"
            color="#111827"
            onPress={() => open(EMAIL)}
          />
        </View>
      </View>

      <Text style={styles.disclaimer}>
        Esta app es un complemento informativo. No sustituye la consulta médica presencial ni
        la valoración individual por telemedicina.
      </Text>
    </View>
  );
}

/* ========= Botones / componentes reutilizables ========= */

function PrimaryButton({
  label,
  onPress,
  icon,
}: {
  label: string;
  onPress: () => void;
  icon?: React.ComponentProps<typeof FontAwesome>["name"];
}) {
  return (
    <TouchableOpacity
      style={[styles.btnPrimary, { borderColor: PRIMARY }]}
      onPress={onPress}
    >
      {icon && (
        <FontAwesome
          name={icon}
          size={14}
          color={PRIMARY}
          style={{ marginRight: 6 }}
        />
      )}
      <Text style={[styles.btnPrimaryText, { color: PRIMARY }]}>{label}</Text>
    </TouchableOpacity>
  );
}

function AgendaButton({
  label,
  onPress,
  icon,
  color,
}: {
  label: string;
  onPress: () => void;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return (
    <TouchableOpacity
      style={[styles.agendaBtn, { borderColor: color }]}
      onPress={onPress}
    >
      <View style={[styles.agendaIconWrapper, { backgroundColor: color }]}>
        <FontAwesome name={icon} size={16} color="#ffffff" />
      </View>
      <Text style={[styles.agendaBtnText, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

function SocialIcon({
  name,
  label,
  color,
  onPress,
}: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  label: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.socialIconCircle, { borderColor: color }]}
      onPress={onPress}
      accessibilityLabel={label}
      accessibilityRole="button"
    >
      <FontAwesome name={name} size={18} color={color} />
    </TouchableOpacity>
  );
}

/* ========= Estilos ========= */

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f5f5f7" },

  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#ffffff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#d0d0d5",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f3f4f6",
  },
  headerTextBlock: {
    marginLeft: 10,
  },
  brand: { fontSize: 18, fontWeight: "800", color: "#111827" },
  subtitle: { fontSize: 13, color: "#4b5563", marginTop: 2 },

  tabRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingHorizontal: 8,
    paddingBottom: 4,
  },
  tabButton: { flex: 1, alignItems: "center", paddingVertical: 8 },
  tabLabel: { fontSize: 13, color: "#6b7280" },
  tabLabelActive: { color: "#111827", fontWeight: "700" },
  tabUnderline: {
    marginTop: 4,
    height: 3,
    borderRadius: 999,
    width: 32,
    backgroundColor: PRIMARY,
  },

  separator: { height: 8, backgroundColor: "#f5f5f7" },

  content: { padding: 16, paddingBottom: 32 },

  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#111827", marginBottom: 12 },
  paragraph: { fontSize: 14, color: "#374151", marginBottom: 12, lineHeight: 20 },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e5e7eb",
  },
  cardTitle: { fontSize: 15, fontWeight: "700", color: "#111827", marginBottom: 4 },
  cardText: { fontSize: 14, color: "#374151" },
  cardNote: { fontSize: 12, color: "#6b7280", marginTop: 4 },

  // Productos
  productRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  productImage: {
    width: 72,
    height: 72,
    borderRadius: 14,
    backgroundColor: "#f9fafb",
    marginRight: 12,
  },
  productTexts: { flex: 1 },

  // Botón principal (rosa)
  btnPrimary: {
    marginTop: 8,
    backgroundColor: "#ffffff",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  btnPrimaryText: { fontWeight: "700", fontSize: 14 },

  // Botones de agenda (Doctoralia / WhatsApp)
  agendaCard: {
    // se apoya en el marginBottom del texto anterior
  },
  agendaBtn: {
    marginTop: 8,
    backgroundColor: "#ffffff",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    borderWidth: 1.5,
    flexDirection: "row",
  },
  agendaIconWrapper: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  agendaBtnText: {
    fontWeight: "700",
    fontSize: 14,
  },

  // Redes sociales
  socialRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  socialIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
  },

  disclaimer: { fontSize: 11, color: "#6b7280", marginTop: 8 },
});
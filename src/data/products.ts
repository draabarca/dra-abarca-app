// src/data/products.ts

export type Product = {
    id: string;
    name: string;
    short: string;
    clinicalUse: string;
    affiliateUrl: string;
  };
  
  export const PRODUCTS: Product[] = [
    {
      id: "p1",
      name: "Bandas de resistencia (set)",
      short: "Set de bandas para trabajo progresivo de fuerza en casa.",
      clinicalUse: "Fortalecimiento de core, rodilla, cadera y hombro.",
      affiliateUrl: "https://mercadolibre.com/sec/348WQLe",
    },
    {
      id: "p2",
      name: "TENS portátil con electrodos",
      short:
        "Dispositivo de estimulación eléctrica para analgesia complementaria, no invasivo.",
      clinicalUse:
        "Dolor lumbar mecánico, cervicalgia, dolor de rodilla.",
      affiliateUrl: "https://mercadolibre.com/sec/1sxuce5",
    },
    {
      id: "p3",
      name: "Compresa caliente reutilizable",
      short: "Manejo de espasmo muscular.",
      clinicalUse: "Sobrecarga muscular, dolor articular.",
      affiliateUrl: "https://mercadolibre.com/sec/1qnZbrd",
    },
    {
      id: "p4",
      name: "Mat Yoga tapete antideslizante para ejercicio y yoga",
      short: "Superficie segura para ejercicio terapéutico.",
      clinicalUse: "Ejercicios de core, equilibrio, estiramientos.",
      affiliateUrl: "https://mercadolibre.com/sec/23z1CbH",
    },
    {
      id: "p5",
      name: "Pelota de pilates (55–65 cm)",
      short: "Trabajo de estabilidad y postura.",
      clinicalUse:
        "Dolor lumbar, control de tronco, ejercicios de piso pélvico.",
      affiliateUrl: "https://mercadolibre.com/sec/1eahLUT",
    },
    {
      id: "p6",
      name: "Juego de mancuernas recubiertas",
      short: "Trabajo de fuerza de miembros superiores.",
      clinicalUse:
        "Rehabilitación de hombro, codo, prevención de fragilidad.",
      affiliateUrl: "https://mercadolibre.com/sec/1E1mSnR",
    },
  ];
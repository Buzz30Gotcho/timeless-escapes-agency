import destinationParis from "@/assets/destination-paris-1889.jpg";
import destinationCretaceous from "@/assets/destination-cretaceous.jpg";
import destinationFlorence from "@/assets/destination-florence.jpg";

export interface Destination {
  id: string;
  title: string;
  era: string;
  year: string;
  description: string;
  longDescription: string;
  image: string;
  price: string;
  highlights: string[];
  duration: string;
  difficulty: string;
}

export const destinations: Destination[] = [
  {
    id: "paris-1889",
    title: "Paris 1889",
    era: "Belle Époque",
    year: "1889 AD",
    description:
      "Vivez l'inauguration de la Tour Eiffel lors de l'Exposition Universelle. Flânez sur les Champs-Élysées dans l'effervescence de la Belle Époque.",
    longDescription:
      "Plongez au cœur de l'Exposition Universelle de 1889, événement qui a marqué le centenaire de la Révolution française. Assistez à l'inauguration de la Tour Eiffel, promenez-vous parmi les pavillons du monde entier, et découvrez les innovations qui allaient transformer le XXe siècle. Dégustez la haute gastronomie parisienne, assistez à un spectacle au Moulin Rouge naissant, et croisez peut-être Gustave Eiffel en personne.",
    image: destinationParis,
    price: "À partir de §38 000",
    highlights: [
      "Inauguration de la Tour Eiffel",
      "Visite privée de l'Exposition Universelle",
      "Dîner dans un restaurant Belle Époque",
      "Rencontre avec les artistes impressionnistes",
    ],
    duration: "3 à 7 jours temporels",
    difficulty: "Accessible",
  },
  {
    id: "cretaceous",
    title: "Crétacé",
    era: "Ère Mésozoïque",
    year: "68 000 000 av. J.-C.",
    description:
      "Explorez un monde primitif peuplé de dinosaures. Observez des créatures colossales dans leur habitat naturel depuis notre station sécurisée.",
    longDescription:
      "Remontez 68 millions d'années dans le passé pour une expédition scientifique au cœur du Crétacé supérieur. Depuis notre station d'observation blindée et invisible, contemplez des T-Rex, Tricératops et Ptéranodons dans leur environnement naturel. Traversez des forêts de fougères géantes, observez des volcans actifs à distance sécurisée, et collectez des données paléontologiques inédites. Une aventure pour les explorateurs les plus audacieux.",
    image: destinationCretaceous,
    price: "À partir de §72 000",
    highlights: [
      "Observation de T-Rex et Tricératops",
      "Station d'observation haute sécurité",
      "Exploration de la flore préhistorique",
      "Collecte de données paléontologiques",
    ],
    duration: "2 à 5 jours temporels",
    difficulty: "Aventurier",
  },
  {
    id: "florence-1504",
    title: "Florence 1504",
    era: "Renaissance Italienne",
    year: "1504 AD",
    description:
      "Assistez à l'apogée de la Renaissance. Visitez l'atelier de Léonard de Vinci et contemplez le David de Michel-Ange fraîchement dévoilé.",
    longDescription:
      "Voyagez dans la Florence des Médicis, berceau de la Renaissance. Assistez au dévoilement du David de Michel-Ange sur la Piazza della Signoria, visitez l'atelier de Léonard de Vinci où il peint la Joconde, et flânez dans les botteghe des plus grands artisans de l'époque. Savourez un banquet toscan dans un palazzo, et découvrez les intrigues politiques qui ont façonné l'art occidental.",
    image: destinationFlorence,
    price: "À partir de §45 000",
    highlights: [
      "Dévoilement du David de Michel-Ange",
      "Visite de l'atelier de Léonard de Vinci",
      "Banquet dans un palazzo Médicis",
      "Cours de fresque avec un maître artisan",
    ],
    duration: "3 à 7 jours temporels",
    difficulty: "Confortable",
  },
];

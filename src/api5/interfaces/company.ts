export type Card = {
  id: string;
  slug: string; // inutilisé actuellement, les ids sont utilisés dans l'URL -> à retirer ?
  cardTitle: string; // current card.name
  cardSubtitle: string; // actuellement card.data_source?.greentech_innovation?.Thématique
  cardType: 'company'; // Se mettre d'accord sur une enum pour avoir le type dans les cartes
  shortDescription: string | null;
  logoUrl: string | null;
  description: string | null; // Pour les startup, c'est dans dans greentech_innovation['L\'entreprise'],
};

export type CompanyCard = Card & {
  phone: 'string' | null;
  email: 'string' | null;
  linkedIn: 'string' | null;
  websiteUrl: string | null;
  creationDate: string | null;
  headquarterAddress: string | null;
  headquarterRegion: string | null;
  pitch: string | null; // Actuellement dans greentech_innovation.Pitch
  publicClients: string[] | null; // Actuellement dans greentech_innovation['Références publiques']
  privateClients: string[] | null; // Actuellement dans card.private_clients
  helpersAndSupports: string[] | null; // Actuellement dans greentech_innovation['Soutiens']
  zones: string[] | null; // Actuellement dans greentech_innovation['Région']
  markets: string[] | null; // Actuellement dans greentech_innovation['Marché']
  oddStakes: string[] | null; // Actuellement dans greentech_innovation['Enjeux ODD']
  sourceUrl: string | null; // Actuellement dans card.source_url
  labels: { description: string; name: string; label: string }[] | null; // Actuellement fusionné de greentech_innovation, green20 et solar_impulse, voir fichier StartupInformations.tsx ligne 132
  siren: string | null; // Actuellement dans greentech_innovation['SIREN']
  financialData: {}; // Demande de David pour la carte startup, à réfléchir en fonction de la donnée dispo
  images: []; // Demande de David pour la carte startup, à réfléchir en fonction de la donnée dispo
};

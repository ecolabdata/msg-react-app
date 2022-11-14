import { AnyFilters } from './filters';

export const zones: Record<string, string> = {
  'Auvergne-Rhône-Alpes': 'Auvergne-Rhône-Alpes',
  'Bourgogne-Franche-Comté': 'Bourgogne-Franche-Comté',
  Bretagne: 'Bretagne',
  Corse: 'Corse',
  'Centre-Val de Loire': 'Centre-Val de Loire',
  'Grand Est': 'Grand Est',
  'Hauts-de-France': 'Hauts-de-France',
  'Ile-de-France': 'Ile-de-France',
  'Nouvelle-Aquitaine': 'Nouvelle-Aquitaine',
  Normandie: 'Normandie',
  Occitanie: 'Occitanie',
  "Provence-Alpes-Côte d'Azur": "Provence-Alpes-Côte d'Azur",
  'Pays de la Loire': 'Pays de la Loire',
  Guadeloupe: 'Guadeloupe',
  Guyane: 'Guyane',
  'La Réunion': 'La Réunion',
  Martinique: 'Martinique',
  Mayotte: 'Mayotte'
};

export type PublicationDates = 'publié' | 'Moins de 6 mois' | '6 mois et plus';

export const publicationDates: Record<PublicationDates, number> = {
  publié: 0,
  'Moins de 6 mois': 6,
  '6 mois et plus': 7
};

export const markets: Record<string, number> = {
  'B to C': 0,
  'B to B': 1,
  'B to A': 2
};

export const entities: Record<string, string> = {
  etat: 'etat',
  'collectivités territoriales': 'collectivités territoriales',
  'fonction hospitaliere': 'fonction hospitaliere',
  'autres entités': 'autres entités'
};

export const certifications: Record<string, string> = {
  'Ville durable et innovante': 'Ville durable et innovante',
  'Climat air énergie': 'Climat air énergie'
};

export type FilterDefinition = {
  label: string;
  defaultOption: string;
  options?: string[];
  id: keyof AnyFilters;
  type: 'select' | 'toggle';
  initialValue: string | boolean;
};

export const publicationDateFilter: FilterDefinition = {
  label: 'Date de publication',
  defaultOption: 'Toutes',
  options: Object.keys(publicationDates),
  id: 'publicationDate' as keyof AnyFilters,
  type: 'select',
  initialValue: ''
};
export const zoneFilter: FilterDefinition = {
  label: 'Zone',
  defaultOption: 'Toutes',
  options: Object.keys(zones),
  id: 'zone' as keyof AnyFilters,
  type: 'select',
  initialValue: ''
};
export const environnementalFilter: FilterDefinition = {
  label: 'Considération environnementale',
  defaultOption: 'Toutes',
  id: 'hasEcologicalConcern' as keyof AnyFilters,
  type: 'toggle',
  initialValue: true
};

export const marketFilter: FilterDefinition = {
  label: 'Marchés',
  defaultOption: 'Tous',
  options: Object.keys(markets),
  id: 'market' as keyof AnyFilters,
  type: 'select',
  initialValue: ''
};

export const certificationFilter: FilterDefinition = {
  label: 'Labels obtenus',
  defaultOption: 'Tous',
  options: Object.keys(certifications),
  id: 'certification' as keyof AnyFilters,
  type: 'select',
  initialValue: ''
};

export const entityFilter: FilterDefinition = {
  label: 'Entité',
  defaultOption: 'Toutes',
  options: Object.keys(entities),
  id: 'entity' as keyof AnyFilters,
  type: 'select',
  initialValue: ''
};

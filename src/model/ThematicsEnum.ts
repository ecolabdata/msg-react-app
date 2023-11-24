export enum ThematicsEnum {
  NUMERIC = 'Numérique éco-responsable',
  ALIMENTATION = 'Alimentation et agriculture durables',
  WATER = 'Eau, biodiversité et biomimétisme',
  ECONOMY = 'Économie circulaire',
  HEALTH = 'Santé environnement',
  ENERGY = 'Energies renouvelables et décarbonées',
  INOVAITONS = 'Innovations maritimes et écosystèmes marins',
  PREVENTION = 'Prévention des risques',
  BUILDINGS = 'Bâtiments et villes durables',
  DECARBONATION = "Décarbonation de l'industrie",
  MOBILITY = 'Mobilité durable',
  FINANCE = 'Finance durable & RSE'
}

export const extendedThematicsDictionnary = {
  [ThematicsEnum.NUMERIC]: [
    'numérique responsable',
    'numérique durable',
    'green IT',
    'numérique soutenable',
    'inclusion numérique',
    'pilotage',
    'modeliser',
    'efficacité numérique'
  ],
  [ThematicsEnum.ALIMENTATION]: [
    'alimentation',
    'nourriture',
    'agriculture',
    'alimentation végétale',
    'ferme urbaine'
  ],
  [ThematicsEnum.WATER]: ['eau', 'eaux', 'biodiversité', 'pluie', 'faune', 'flore'],
  [ThematicsEnum.ECONOMY]: [
    'déchet',
    'déchets',
    'circulaire',
    'composte',
    'méthanisation',
    'collecte',
    'écoconception',
    'recyclé',
    'recyclées',
    'recyclés',
    'recyclage',
    'zéro-déchet'
  ],
  [ThematicsEnum.HEALTH]: [
    'capteur',
    'capteurs',
    'data',
    'données',
    'pollution',
    'perturbateur',
    'perturbateurs',
    'nuissance',
    'modeliser'
  ],
  [ThematicsEnum.ENERGY]: [
    'photovoltaïque',
    'panneaux solaires',
    'éolien',
    'géothermie',
    'réseaux de chaleur'
  ],
  [ThematicsEnum.INOVAITONS]: [
    'océans',
    'océans',
    'mers',
    'écosystèmes maritimes',
    'écosystèmes marins'
  ],
  [ThematicsEnum.PREVENTION]: [
    'resilient',
    'resilience',
    'crises',
    'inondations',
    'reglementaires',
    'adaptation'
  ],
  [ThematicsEnum.BUILDINGS]: [
    'resilience',
    'ilots de chaleur',
    'efficacité energétique',
    'construction bas-carbone',
    'rénovation energétique',
    'rénovation',
    'batiments',
    'construction durable',
    'végétaliser',
    'végétalisation'
  ],
  [ThematicsEnum.DECARBONATION]: [
    'industrie',
    'industriels',
    'ligne de production',
    'acteurs économiques'
  ],
  [ThematicsEnum.MOBILITY]: [
    'vélo',
    'batteries',
    'batterie',
    'covoiturage',
    'mobilité partagée',
    'mobilité urbaine',
    'autopartage',
    'recharge éléctrique',
    'bateaux',
    'voiture',
    'voitures',
    'moto',
    'motos',
    'deux-roues',
    'vélos éléctriques',
    'logistique urbaine'
  ],
  [ThematicsEnum.FINANCE]: ["propriétaire d'actifs", 'banques', 'banque']
};

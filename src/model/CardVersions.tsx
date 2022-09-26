export const versions = ['live', 'beta', 'alpha'] as const;

export const versionConf = {
  alpha: {
    description: `
            Des données mais pas de la source final
        `,
    homeDisplay: 'À venir',
    exploreDisplay: null
  },
  beta: {
    description: `
            Des données de la source final, des ajustements encore a faire
            (filtres manquants, pas bon field affiché etc...)
        `,
    homeDisplay: 'Accès anticipé',
    exploreDisplay: 'Accès anticipé'
  },
  live: {
    description: `
            All good
         `,
    homeDisplay: true,
    exploreDisplay: true
  }
};

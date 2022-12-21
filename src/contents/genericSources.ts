const getSources = (type: string, url: string | undefined) => {
  switch (type) {
    case 'acheteurs-publics':
      return [
        {
          label: 'DECP',
          url:
            url ||
            'https://www.data.gouv.fr/fr/datasets/donnees-essentielles-de-la-commande-publique-fichiers-consolides/'
        },
        {
          label: 'OECP',
          url:
            url || 'https://www.economie.gouv.fr/daj/oecp-recensement-economique-commande-publique'
        },
        {
          label: 'catalogue Greentech Innovation',
          url: url || 'https://greentechinnovation.fr/les-greentech-laureates/'
        }
      ];
    case 'startups':
      return [
        { label: 'Annuaire Greentech Innovation', url: url || 'https://greentechinnovation.fr/' },
        {
          label: 'Lauréats Solar Impulse',
          url: url || 'https://solarimpulse.com/solutions-explorer-fr'
        },
        {
          label: 'French Tech Green20',
          url: url || 'https://lafrenchtech.com/fr/la-france-aide-les-startup/french-tech-green-20/'
        }
      ];
    case 'achats-previsionnels':
      return [{ label: 'APProch', url: url || 'https://projets-achats.marches-publics.gouv.fr/' }];
    default:
      return url ? [{ label: url, url: url }] : [];
  }
};

export default getSources;

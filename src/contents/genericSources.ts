const getSources = (type?: string) => {
  console.log('type', type);

  switch (type) {
    case 'acheteurs-publics':
      return [
        {
          label: 'DECP',
          url: 'https://www.data.gouv.fr/fr/datasets/donnees-essentielles-de-la-commande-publique-fichiers-consolides/'
        },
        { label: 'APProch', url: 'https://projets-achats.marches-publics.gouv.fr/#' },
        {
          label: 'catalogue Greentech Innovation',
          url: 'https://airtable.com/shrdUCC87l85zyUsE/tbl49Pd1At3ZmGD6E'
        }
      ];
    case 'startups':
    case 'sourcing-startup':
      return [
        {
          label: 'Annuaire Greentech Innovation',
          url: 'https://airtable.com/shrdUCC87l85zyUsE/tbl49Pd1At3ZmGD6E'
        },
        {
          label: 'Lauréats Solar Impulse',
          url: 'https://solarimpulse.com/solutions-explorer-fr'
        },
        {
          label: 'French Tech Green20',
          url: 'https://lafrenchtech.com/fr/la-france-aide-les-startup/french-tech-green-20/?cn-reloaded=1'
        }
      ];
    case 'achats-previsionnels':
      return [{ label: 'APProch', url: 'https://projets-achats.marches-publics.gouv.fr/' }];
    case 'achats-programmés':
      return [{ label: 'APProch', url: 'https://projets-achats.marches-publics.gouv.fr/#' }];
    case 'aides-clients':
    case 'aides-innovations':
      return [{ label: 'Aides territoires', url: 'https://aides-territoires.beta.gouv.fr/' }];
    case 'investisseurs':
      return [
        {
          label: 'PEXE',
          url: 'https://annuaire.investisseurs.ecoentreprises-france.fr/annuaire/1101206'
        }
      ];

    default:
      return [];
  }
};

export default getSources;

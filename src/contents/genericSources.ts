import { CardTypeNameFromModel } from 'model/CardType';
// V5 remove this
const getSources = (type: CardTypeNameFromModel) => {
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
    case 'achats-publics-a-venir':
      return [{ label: 'APProch', url: 'https://projets-achats.marches-publics.gouv.fr/' }];
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
      return null;
  }
};

export default getSources;

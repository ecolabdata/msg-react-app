import { useContext, useState } from 'react';
import { AnyCard, applyCard, isAide } from '../../api/Api';
import { ApplicationContext } from '../../App';
import { aideClient, aideInno, byName, dropdownValues } from '../../model/CardType';
import ResultCard from '../customComponents/ResultCard';
import DropDown from '../dsfrComponents/DropDown';
import { ActeurPublicResultCard } from './search/ActeurPublicSearchPage';
import { AideClientSearchPage, AideResultCard } from './search/AidesSearchPage';
import { InvestisseurResultCard } from './search/InvestisseurSearchPage';
import { ProjetAchatResultCard } from './search/ProjetAchatSearchPage';
import { StartupResultCard } from './search/StartupSearchPage';

const MySelection = () => {
  const { usedFavoris } = useContext(ApplicationContext);
  const [, , favoris] = usedFavoris;
  const [selectedCardTypeName, setSelectedCardTypeName] = useState('all');
  const handleOnSubmit = () => {
    console.log('Formulaire de recherche envoyé ');
  };

  const download = (cards: AnyCard[]) => {
    const propNames = Array.from(new Set(cards.flatMap((x) => Object.keys(x))));
    const processRow = function (row: string[]) {
      let finalVal = '';

      for (let j = 0; j < row.length; j++) {
        const innerValue = row[j] === null ? '' : row[j].toString();
        let result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
        if (j > 0) finalVal += ', ';
        finalVal += result;
      }
      return finalVal + '\n';
    };

    function cardsToRow(card: AnyCard) {
      return propNames.map((key) => (card as any)[key]?.toString() || '');
    }

    const rows = [propNames, ...cards.map(cardsToRow)];
    let csvFile = '';
    for (let i = 0; i < rows.length; i++) {
      csvFile += processRow(rows[i]);
    }

    const blob = new Blob(['\uFEFF', csvFile], { type: 'text/plain;charset=UTF-16LE' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'favoris.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <div className="headContainer mx-auto w-3/4 ">
        <div className="cardTitle  my-10 ml-4 text-base flex justify-between items-center">
          <h2
            className="w-fit font-bold text-xl
                    lg:text-4xl"
          >
            <div className="flex items-center">
              Ma sélection{' '}
              <span
                className="mt-1 mx-2 text-sm
                            font-extralight
                            lg:text-xl"
              >{`(${Object.keys(favoris).length})`}</span>
            </div>
          </h2>

          <div className="actionButtonsContainer w-1/2 ml-15 flex justify-end items-center">
            <button
              className="fr-btn fr-btn--sm fr-btn--primary fr-fi-download-line fr-btn--icon-left mr-2 h-[40px]
                        md:h-[40%]
                        "
              onClick={() => download(Object.values(favoris))}
            >
              Télécharger (WIP)
            </button>

            {/* <button className="fr-btn fr-btn--sm fr-btn--primary fr-fi-mail-fill fr-btn--icon-left
                        sm:h-[45%] sm:text-xs
                        lg:ml-2">
                            Envoyer par email
                        </button> */}
          </div>
        </div>

        <div className="researchContainer my-10 ml-4 p-6 flex flex-col  bg-research-precision-container">
          <p className=" bold text-xl text-center text-blue-france-main-525">Filtrer </p>

          <form onSubmit={() => handleOnSubmit()} className="inputsContainer flex">
            <DropDown
              borderColor="blue-france-main-525"
              title="Type de piste"
              usedState={[selectedCardTypeName, setSelectedCardTypeName]}
              values={{ all: 'Toutes', ...dropdownValues }}
            />
          </form>
        </div>
      </div>

      <div className="cardsContainer mx-auto w-3/4 justify-center flex flex-wrap">
        <div className="fr-container" id="cardsContainer">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.values(favoris)
              .filter(
                (x) => selectedCardTypeName === 'all' || selectedCardTypeName === x.cardTypeName
              )
              .map((card) => applyCard(card,
                (ap) => <ActeurPublicResultCard ap={ap} />,
                (pa) => <ProjetAchatResultCard pa={pa}/>,
                (i) => <InvestisseurResultCard invest={i}/>,
                (a) => a.cardTypeName == aideInno.name
                  ? <AideResultCard aide={a} cardType={aideInno} />
                  : <AideResultCard aide={a} cardType={aideClient} />,
                (su) => <StartupResultCard su={su}/>,
                () => <></>
              ))
            }
          </ul>
        </div>
      </div>

      {/* <Pagination currentPageNo={pageNo} baseUrl={cardType.searchLink + "/" + searchId} nbPage={nbPage}/> */}
    </>
  );
};

export default MySelection;

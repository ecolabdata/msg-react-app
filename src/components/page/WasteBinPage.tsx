import { applyCard } from 'api/Api';
import { useContext, useState } from 'react';
import { ApplicationContext } from '../../App';
import { aideClient, aideInno, byName, dropdownValues } from '../../model/CardType';
import ResultCard from '../customComponents/ResultCard';
import DropDown from '../dsfrComponents/DropDown';
import { ActeurPublicResultCard } from './search/ActeurPublicSearchPage';
import { AideResultCard } from './search/AidesSearchPage';
import { InvestisseurResultCard } from './search/InvestisseurSearchPage';
import { ProjetAchatResultCard } from './search/ProjetAchatSearchPage';
import { StartupResultCard } from './search/StartupSearchPage';

const WasteBin = () => {
  const { usedCorbeille } = useContext(ApplicationContext);
  const [, , corbeille, setCorbeille] = usedCorbeille;
  const [selectedCardTypeName, setSelectedCardTypeName] = useState('all');
  const [areYouSure, setAreYouSure] = useState(false);
  const handleOnSubmit = () => {
    console.log('Formulaire de recherche envoyé ');
  };

  const top = areYouSure ? 'top-[0em]' : 'top-[4em]';

  return (
    <>
      <div className="headContainer mx-auto w-3/4 ">
        <div className="cardTitle  my-10 ml-4 text-base flex justify-between items-center">
          <h2
            className="w-fit font-bold text-xl
                    lg:text-4xl"
          >
            <div className="flex items-center">
              Ma Corbeille{' '}
              <span
                className="mt-1 mx-2 text-sm
                            font-extralight
                            lg:text-xl"
              >{`(${Object.keys(corbeille).length})`}</span>
            </div>
          </h2>

          <div className="actionButtonsContainer w-1/2 ml-15 flex justify-end items-center">
            <div className="relative overflow-hidden">
              <div>
                <p>&nbsp;</p>
                <button
                  onClick={() => setAreYouSure(true)}
                  className="fr-btn fr-btn--sm fr-btn--primary mr-2 h-[40px]
                                    md:h-[40%]
                                    "
                >
                  Tout restaurer
                </button>
              </div>
              <div className={`absolute ${top} left-0`}>
                Etes vous sur ?
                <button
                  onClick={() => {
                    setAreYouSure(false);
                    setCorbeille({});
                  }}
                  className="fr-btn fr-btn--sm fr-btn--primary mr-2 h-[40px]
                                md:h-[40%]
                                px-14"
                >
                  Oui
                </button>
              </div>
            </div>
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

      <div className="fr-container" id="cardsContainer">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.values(corbeille)
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
            ))}
        </ul>
      </div>

      <div className="cardsContainer mx-auto w-3/4 justify-center flex flex-wrap"></div>

      {/* <Pagination currentPageNo={pageNo} baseUrl={cardType.searchLink + "/" + searchId} nbPage={nbPage}/> */}
    </>
  );
};

export default WasteBin;
